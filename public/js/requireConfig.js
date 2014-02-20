'use strict';

//requireJS 기본 설정 부분
requirejs.config({
  baseUrl:'js/module',

  paths: {
    'lib': '../../libary',
    'res': '../../resource',
    'style': '../../style',
    'view': '../../view',
    'js': '../',
    'ctrl': '../controller',
    'dire': '../directive',
    'filter': '../filter',
    'model': '../model',
    //no shim lib
    'angular': '../../libary/angular/angular',
    'angular-route': '../../libary/angular/angular-route',
    'bootstrap': '../../libary/bootstrap/js/bootstrap.js'
  },

  map: {
    '*': {
      'css': '../../libary/require/css/css', // or whatever the path to require-css is
      'text': '../../libary/require/tex/text', //HTML 데이터를 가져올때 text! 프리픽스를 붙여준다.
      'outerHTML': '../../libary/jquery/outerHTML', //outerHTML기능 추가 플러그인
      'angular': '../../libary/angular/angular',
      'jquery': '../../libary/jquery/jquery-2.0.3'
    }
  },
  
  /*
    shim:
    AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 SHIM을 사용해서 모듈로 불러올 수 있다.
    참고 : http://gregfranko.com/blog/require-dot-js-2-dot-0-shim-configuration/
  */
  shim: {
    'angular': {
      deps: ['jquery']
    },
    'angular-route': {
      deps: ['angular']
    },
    'bootstrap': {
      deps: ['jquery', 'css!bootstrap']
    }
  }
});


//requireJS를 활용하여 모듈 로드
requirejs(['LazyAngular', 'require', 'js/routes', 'bootstrap', 'css!style/fonts'],
  function (LazyAngular, require) {
    console.log(require);
    LazyAngular.pushPathInfo({
      controllers: [],
      directives: [],
      filters: []
    })

    LazyAngular.bootstrap(document, ['Memoria']);
  });