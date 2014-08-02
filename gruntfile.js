module.exports = function (grunt) {
  var path = require('path')

  var app = path.resolve(__dirname, 'app')
    , temp = path.resolve(__dirname, 'temp')
    , server = path.resolve(__dirname, 'server')
    , bower_components = path.resolve(__dirname, 'bower_components')
    , port = 9000
    , host = 'localhost'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      server: {
        options: {
          port: port,
          hostname: host,
          server: server
        }
      }
    },
    less: {
      options: {
        //paths: ["assets/css"],
        //rootpath: temp,
        //customFunctions:{},
        //modifyVars:{},
        //banner:'',
        cleancss: true
      },
      main: {
        options: {

        },
        files: [{
          expand: true,
          cwd: app,
          src: ["**/*.less"],
          dest: temp,
          ext: ".css"
        }]
      },
      components:{
        options: {
          //paths: ["assets/css"],
          //rootpath: temp,
          //customFunctions:{},
          //modifyVars:{},
          //banner:'',
          cleancss: true
        },
        files: {
          'temp/bootstrapStyle.css': path.resolve(bower_components, 'bootstrap/less/bootstrap.less')
        }
      }
    },
    copy: {
      html: {
        expand: true,
        cwd: path.resolve(app, 'view'),
        src: '**/*.html',
        dest: path.resolve(temp, 'view'),
        filter: 'isFile'
      },
      components: {
        expand: true,
        cwd: path.resolve(bower_components),
        src: '**',
        dest: path.resolve(temp, 'components'),
        filter: 'isFile'
      },
      js: {
        expand: true,
        cwd: app,
        src: '**/*.js',
        dest: temp,
        filter: 'isFile'
      }
    },
    uglify: {
      js: {
        files: [{
          expand: true,
          cwd: temp,
          src: '**/*.js',
          dest: temp,
          filter: 'isFile'
        }]
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [path.resolve(app, '**/*.js'), '!' + path.resolve(app, 'components/**')],
        tasks: ['newer:copy:js']
      },
      css: {
        files: [path.resolve(app, '**/*.less'), '!' + path.resolve(app, 'components/**')],
        tasks: ['newer:less:main']
      },
      html: {
        files: [path.resolve(app, 'view/**/*.html')],
        tasks: ['newer:copy:html']
      },
      components: {
        files: [path.resolve(app, 'components/**')],
        tasks: ['newer:less:components', 'newer:copy:components']
      }
    },
    clean: {
      js          : [path.resolve(temp, '**/*.js'), '!' + path.resolve(temp, 'components/**/*.js')],
      css         : [path.resolve(temp, '**/*.css'), '!' + path.resolve(temp, 'components/**/*.css')],
      html        : [path.resolve(temp, 'view/**/*.html')],
      components  : [path.resolve(temp, 'components/**/*.js'), path.resolve(temp, 'components/**/*.css')],
      all         : [temp]
    },
    open: {
      dev: {
        path: 'http://'+host+':'+port
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['clean', 'copy', 'less']);
  
  grunt.registerTask('dev', ['build', 'express', 'watch']);
  grunt.registerTask('server', ['build', 'uglify', 'express']);
};
