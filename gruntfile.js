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
      }
    },
    uglify: {
      js: {
        files: [{
          expand: true,
          cwd: app,
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
        tasks: ['clean:js', 'uglify']
      },
      css: {
        files: [path.resolve(app, '**/*.less'), '!' + path.resolve(app, 'components/**')],
        tasks: ['clean:css', 'less:main']
      },
      html: {
        files: [path.resolve(app, 'view/**/*.html')],
        tasks: ['clean:html', 'copy:html']
      },
      components: {
        files: [path.resolve(app, 'components/**')],
        tasks: ['clean:components', 'less:components', 'copy:components']
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

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('build', ['clean', 'copy', 'less', 'uglify']);
  grunt.registerTask('server', ['build', 'express', 'watch']);
};
