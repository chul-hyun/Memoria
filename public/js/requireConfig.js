'use strict';
//requireJS 기본 설정 부분
requirejs.config({
    baseUrl: 'js/module',

    paths: {
        'lib': '../../libary',
        'res': '../../resource',
        'style': '../../style',
        'view': '../../view',
        'js': '../',
        //no shim lib
        'angular': '../../libary/angular/angular',
        'angular-route': '../../libary/angular/angular-route',
        'bootstrap': '../../libary/bootstrap/js/bootstrap',
        //Angular
        'ctrl': '../controller',
        'directive': '../directive',
        'filter': '../filter',
        'model': '../model',
        //view
        'particle': '../../view/particle',
        'board':'../../view/particle/board'
    },

    map: {
        '*': {
            'css': '../../libary/require/css/css', // or whatever the path to require-css is
            'text': '../../libary/require/text/text', //HTML 데이터를 가져올때 text! 프리픽스를 붙여준다.
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
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery', 'css!style/bootstrap']
        }
    }
});

requirejs(['D'], function (D) {
    var DATA = D();
    DATA.set('test', 1);
    console.log(DATA.get('test'));
    DATA.set({
        'firstName': '박',
        'name': function (firstName, name) {
            if (name === undefined) {
                return undefined;
            }
            return firstName + name;
        }
    })
    console.log(DATA.get('name'));
    DATA.set('name', '철현');
    //DATA.apply();
    console.log('get 이전')
    console.log(DATA.get('name'));
    DATA.set('firstName', '홍');
    
    console.log(DATA.get('name'));
    DATA.set('name', '훙힝');
    DATA.set('firstName', '홍');
    DATA.apply();
    DATA.set('firstName', '홍');
    DATA.apply();
    DATA.set('firstName', '홍');
    console.log(DATA.get('name'));
    console.log(DATA.get('name'));
    console.log(DATA.get('name'));
    console.log(DATA.get('name'));
})

/*
//requireJS를 활용하여 모듈 로드
requirejs(['LazyAngular', 'require', 'js/routes', 'bootstrap', 'css!style/fonts'],
  function (LazyAngular, require) {
      LazyAngular.pushPathInfo({
          controllers: [
              'CommonCtrl', 'logoCtrl',
              'blogCtrl', 'musicRoomCtrl','discPlayerCtrl', 'imgSlideCtrl'],
          directives: [
              'lazyInclude', 'lazyView',
              'customSelect', 'customSelectView', 'customOption', 'customOptionWrapper',
              'customRadio', 'windowLeaveCheck','slideBox'],
          filters: []
      });
      LazyAngular.setRootInfo({
          controllers: 'ctrl',
          directives: 'directive',
          filters: 'filter'
      })

      LazyAngular.bootstrap(document, ['Memoria']);
  });*/