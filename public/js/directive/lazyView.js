'use strict';
/**
  * 라디오 버튼 구현 
  *
  * @author: memoria
  * @see: LazyRegister
  */
define(['LazyRegister', 'LazyAngular', 'DeferRequire', 'Loop', 'Check']
  , function (LazyRegister, LazyAngular, DeferRequire, Loop, Check) {
      LazyRegister.directive('lazyView', ['$compile', '$route', function ($compile, $route) {
          return {
              restrict: 'A',
              scope: {
                  pathInit: "=lazyView"
              },
              link: function (scope, element, attrs) {
                  scope.info = {};

                  //$routeChangeStart 발생시 reload함수 실행
                  scope.$on("$routeChangeStart",
                    function (event, next) {
                        reload(next);
                    });

                  //link때 reload함수 실행. (현제 route값을 적용)
                  $route.current && reload($route.current);

                  function reload(next) {
                      if (!Check.isFunction(scope.pathInit)) {
                          return;
                      }
                      var info = scope.info;

                      info.html = ''; //불러온 html값
                      info.dom = undefined; // 컴파일이 끝난 입력될 Dom
                      info.path = (next.$$route && !!next.$$route.path)? next.$$route.path : '';
                      info.params = next.params;

                      //로드전 실행되는 함수. path값등을 변경해줄수 있다.
                      scope.pathInit(info);

                      //이전 path와 동일할시 함수 종료
                      if (info.currentPath === info.path) {
                          return;
                      }
                      info.currentPath = info.path;

                      //load
                      LazyAngular.loader(element, info.path);
                  }
              }
          }
      }])
  });
