'use strict';
/**
  * 라디오 버튼 구현 
  *
  * @author: memoria
  * @see: LazyRegister
  */
define(['LazyRegister', 'LazyAngular', 'DeferRequire', 'Loop']
  , function (LazyRegister, LazyAngular, DeferRequire, Loop) {
    LazyRegister.directive('lazyInclude', ['$compile', function ($compile) {
      return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
          attrs.$observe('lazyInclude', function (newPath) {
            //value init
            var next = {}
              , needPaths = [];

            //next객체 초기화.
            next.path = newPath; //불러들일 path
            next.html = ''; //불러온 html값
            next.dom = undefined; // 컴파일이 끝난 입력될 Dom

            //lazyIncludeStart 발생.
            scope.$emit('lazyIncludeStart', next)

            //load
            LazyAngular.loader(element, next.path, function () {
              //lazyIncludeSuccess 발생.
              scope.$emit('lazyIncludeSuccess', next);
            });
          });
        }
      }
    }])
  });
