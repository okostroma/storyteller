const gulp          = require('gulp');
const {task}        = require('gulp');
const webpackStream = require('webpack-stream');
const Unzip         = require('gulp-unzip');
const Zip           = require('gulp-zip');
const Copy          = require('gulp-copy');
const XmlEdit       = require('gulp-edit-xml');
const modifyFile    = require('gulp-modify-file')
const del           = require('del');
const fs            = require('fs');
const find          = require('find');
const path          = require('path');
const webpackConfig = require('./webpack.config');
const exec          = require('child_process').exec;

const srcPath     = '../';
const irpzSrcPath = '../src';
const delimiter   = /win/i.test(process.platform) ? '\\\\' : '\/';
const AvFiles     = {
  modNames     : [],
  find         : function (file) {
    let content = fs.readFileSync(file),
        re      = /APP\.require\(\s*?(?:'|")(.*?)(?:'|")\s*?\)/gm,
        match,
        matches = [];

    while ((match = re.exec(content)) !== null) {
      match && !~this.modNames.indexOf(match[1]) && matches.push(match[1]);
    }

    matches.length
    && this.addModNames(matches)
    && matches.forEach(file => this.find(this.getPath(file)), this);

    return this.modNames;
  },
  searchModules: function (files) {
    this.clear();
    Array.isArray(files)
      ? files.forEach(function (file) {
        this.find(file)
      }, this)
      : this.find(files);

    return this.modNames.map(this.getPath);
  },
  getPath      : function (fileName) {

    try {
      let res = find.fileSync((new RegExp('(?:Module_|' + delimiter + '|^)' + fileName + '\.js', 'i')), path.resolve('./modules'),);
      return res.length ? res[0] : (console.log("Module \"" + fileName + "\" has not found in " + path.resolve('./modules')), '')
    } catch (e) {
      throw new Error('>' + fileName + ' : ' + e.message)
    }
  },
  addModNames  : function (fileNames) {
    !Array.isArray(fileNames) && (fileNames = [fileNames]);
    return this.modNames = this.modNames
      .concat(
        fileNames
          .filter(function (fileName) {
            return !~this.modNames.indexOf(fileName);
          }, this)
      )
      .flatMap(x => x);
  },
  clear        : function () {
    this.modNames.splice(0, this.modNames.length);
  },
  init         : function () {
    this.clear();
    return this;
  }
};
// fetch command line arguments  https://www.sitepoint.com/pass-parameters-gulp-tasks/
const arg         = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt     = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    } else {

      // argument name
      curOpt      = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})(process.argv);

const irpConfigProp = {};
const PROJECTNAME   = 'iridi';
const irclientPath  = process.env.USERPROFILE + '\\Documents\\iRidium pro documents\\Client\\';

const emulate = [copyIrpzToIridium, getconfig, editIrconfig, run];
const deploy  = function (mode) {
  let arr = [clean, unzip, mode === 'dev' ? dev : build, webpack, copyToUnzipped, irpScriptEdit, zip];
  arg.e && (arr = arr.concat(emulate));
  return arr;
};

//deploy
function clean() {
  return del(['./unzipped/**'])
}

function unzip() {
  //del(['./unzipped/**']);
  return gulp.src(irpzSrcPath + "/*.irpz")
    .pipe(Unzip())
    .pipe(gulp.dest('./unzipped'));
}

function dev(cb) {
  webpackConfig.mode = 'development';
  cb()
}

function build(cb) {
  webpackConfig.mode = 'production';
  cb()
}

function webpack() {

  let sourcesFiles = fs.readdirSync(srcPath)
    .filter(function (file) {
      return /.*\.js$/.test(file);
    })
    .map(file => {
      return path.resolve(__dirname, srcPath, file)
    })
    .flatMap(x => x);

  let modules = AvFiles.searchModules(sourcesFiles);

  modules = modules.concat(sourcesFiles);

  webpackConfig.entry = [
    './extantions/polyfills.js',
    '@babel/polyfill',]
    .concat(modules);

  console.dir(modules);

  return gulp.src(modules)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('dist/'));
}

function copyToUnzipped() {
  del(['./unzipped/scripts/**']);
  return gulp.src(['./extantions/__irconnector.js', 'dist/*.js'])
    .pipe(Copy('unzipped/scripts', {prefix: 1}));

}

function irpScriptEdit() {
  return gulp.src('./unzipped/Project.irp')
    .pipe(XmlEdit(function (xml) {
      let scripts;

      !xml.Panel.Scripts[0].length && (xml.Panel.Scripts[0] = {  Script : []  });

      scripts = xml.Panel.Scripts[0].Script;

      scripts && scripts.splice(0, scripts.length);

      fs.readdirSync('./unzipped/scripts/')
        .sort() //__irconnector to up
        .forEach((file, i) => {
          scripts[i] = {
            $: {
              "Name"      : file.split('.')[0],
              "File"      : file,
              "Hide"      : "0",
              "Type"      : "wScript",
              "Parent"    : "0",
              "ScriptType": "0"
            }
          }
        });

      let pageOrientation  = xml.Panel.Pages[0].Page.find(page=>page.$.hasOwnProperty('Orientation'));


      pageOrientation.$.Orientation = Number(!Number(pageOrientation.$.Orientation))

      console.log(' >'+typeof pageOrientation.$.Orientation +' / '+pageOrientation.$.Orientation);

      pageOrientation.$.Orientation
        ? (xml.Panel.$.Width =  xml.Panel.$.LandscapeWidth, xml.Panel.$.Height =  xml.Panel.$.LandscapeHeight)
        : (xml.Panel.$.Width =  xml.Panel.$.PortraitWidth, xml.Panel.$.Height =  xml.Panel.$.PortraitHeight)

      console.dir(xml.Panel.$)
      console.dir(pageOrientation.$);

      return xml;

    }, {
      builderOptions: {
        xmldec    : {
          'version': '1.0', 'encoding': 'utf-8', 'standalone': 'yes'
        },
        renderOpts: {
          pretty: false
        }
      }
    }))
    .pipe(modifyFile((content, path, file) => {
      return content + '\n';
    }))
    .pipe(gulp.dest("./unzipped"));
}

function zip() {
  del(['./zipped/**']);
  return gulp.src('unzipped/**/*')
    .pipe(Zip('iridi.irpz', {compress: false}))
    .pipe(gulp.dest('../irpz'))
}

//emulate
function copyIrpzToIridium() {
  return gulp.src(path.resolve('../irpz/', PROJECTNAME + '.irpz'))
  //.pipe(Copy(irclientPath))
    .pipe(Copy(process.env.USERPROFILE + '\\Documents\\iRidium pro documents\\Client', {prefix: 2}))
}

function getconfig() {
  return gulp.src('./unzipped/Config.xml')
    .pipe(XmlEdit(function (xml) {
      for (let i in xml.Config.$) {
        irpConfigProp[i] = xml.Config.$[i];
      }
      return xml;
    }));
}

function editIrconfig() {

  const template = {
    $: {
      Name            : PROJECTNAME,
      File            : PROJECTNAME + '.irpz',
      CloudID         : '0',
      Fullscreen      : '0',
      Scale           : '1',
      Sound           : '1',
      StatusBar       : '0',
      NoFrame         : '0',
      AlwaysOnTop     : '0',
      ShowCursor      : '1',
      RotateLock      : '0',
      CustomPostition : '0',
      CustomPostitionX: '0',
      CustomPostitionY: '0',
      BackGroundMode  : '0',
      ServerHost      : '',
      ServerPort      : '30464',
      ServerLogin     : '',
      ServerPassword  : '',
      GateConnection  : '0',
      ClearTokensLoad : '0',
      MultiScreen     : '0',
      NoTaskBar       : '0',
      NavigationBar   : '0',
      FirstUnpack     : '0',
      ProjectVersion  : '0',
      ProjectType     : '0',
      System          : '0',
      BackgroundColor : '#00000000',
      CRC             : '0',
      Size            : '0',
      Hi              : '0',
      Lo              : '0'
    }
  };
  //console.dir(r)

  return gulp.src(irclientPath + 'irconfig.xml', {base: './'})
    .pipe(XmlEdit(function (xml) {

      let designs = xml.Config.Designs[0].Design;

      let designConfig = designs.find(el => el.$.Name === PROJECTNAME) || designs[designs.push(template) - 1];

      for (let i in irpConfigProp) {
        designConfig.$[i] = irpConfigProp[i];
      }
      xml.Config.Designs[0].$.Current = PROJECTNAME;

      return xml;
    }))
    .pipe(gulp.dest('./'))

}

function run(cb) {
  exec("start /D \"C:\\Program Files (x86)\\iRidium Ltd\\iRidium Pro\\iRidium\" iRidium.exe", function (err, stdout, stderr) {
    err && console.log(err);
  });
  cb()
}

exports.webpack = gulp.series(webpack);
exports.emulate = gulp.series.apply(null, emulate);
exports.dev     = gulp.series.apply(null, deploy('dev'));
exports.default = exports.build = gulp.series.apply(null, deploy('build'));