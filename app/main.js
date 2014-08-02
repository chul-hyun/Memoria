//requireJS 기본 설정 부분
requirejs.config({
  baseUrl: 'module',
  map: {
    // '*' means all modules will get 'jquery-private'
    // for their 'jquery' dependency.
    '*': {
      'css': '../components/require-css/css.min'
    }
  },
  paths:{
    'text'      : '../components/requirejs-text/text',
    'jquery'    : '../components/jquery/dist/jquery.min',
    'bootstrap' : '../components/bootstrap/dist/js/bootstrap.min',
    'binder'    : '../components/binder/build/binder.min'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery', 'css!../bootstrapStyle.css'], //angular가 로드되기 전에 jquery가 로드 되어야 한다.
      exports: 'angular' //로드된 angular 라이브러리는 angular 라는 이름의 객체로 사용할 수 있게 해준다
    }
  }
});

//requireJS를 활용하여 모듈 로드
require(['jquery', 'binder', 'tmpl', 'bootstrap'],
  function ($, binderJS, tmpl) {
    require(['css!../view/main'])

  });
