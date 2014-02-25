'use strict'
mountFolder = (connect, dir) ->
  connect.static require('path').resolve dir

module.exports = (grunt) ->
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)
  getSrc = (base) ->
    base    : base
    res     : "#{base}/resource"
    style   : "#{base}/style"
    less   : "#{base}/style/less"
    view    : "#{base}/view"
    js      : "#{base}/js"
    lib     : "#{base}/libary"

  publicSrc = getSrc "public"

  grunt.initConfig
    pkg : grunt.file.readJSON 'package.json'

    connect :
      server:
        options     :
          port      : 3000
          hostname  : '*'
          base      : publicSrc.base
          middleware: (connect) ->
            [ 
              require('connect-livereload')(ignore:[])
              mountFolder(connect, '.tmp')
              mountFolder(connect, publicSrc.base)
            ]
    watch:
      options:
        livereload   : false
      less  :
        files   : ["#{publicSrc.less}/**/*.less"]
        tasks   : 'less:development'
      coffee:
        files   : ["#{publicSrc.js}/**/*.coffee"]
        tasks   : 'coffee'
      main  :
        files   : ["#{publicSrc.style}/**/*.css", "#{publicSrc.js}/**/*.js", "#{publicSrc.res}/**/*", "#{publicSrc.view}/**/*.html", "#{publicSrc.base}/index.html", "#{publicSrc.lib}/**/*"]
        options:
          livereload   : true
    ###
    coffee:
      compile:
        files:
          "dist/js/main.js": "assets/scripts/main.coffee"
    ###
    less:
      development:
        options:
          paths: ["#{publicSrc.style}/import"]
          compress: false
          cleancss: true
          ieCompat: false
          debug: true
          syncImport: false
        files:[
            expand: true,
            cwd: publicSrc.less,
            src: ["**/*.less"],
            dest: publicSrc.style,
            ext: '.css'
          ]
    open:
      server:
        path: "http://localhost:<%= connect.server.options.port %>"

  grunt.registerTask 'server', [ 'connect:server', 'less', 'open', 'watch' ]
