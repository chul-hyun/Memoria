'use strict';

define(['LazyAngularCore', 'Loop', 'outerHTML', 'angular'],
  function (LazyAngularCore, Loop) {

      //현제 페이지의 HTML을 조사하여 필요한 데이터(controller, directive)를 가져온후 부트스트랩 하는 부트스트랩 함수
      function bootstrap(element, modules) {
          var needPath = LazyAngularCore.getNeedPaths($('html').outerHTML());
          require(needPath, function () {
              $(document).ready(function () {
                  angular.bootstrap(element, modules);
              });
          })
      }

      function loader(dom, path, callback) {
          var ele = angular.element(dom)
            , html = ''
            , needPaths = []
            , dom;
          //html파일 요청
          require(['text!' + path], function (data) {
              console.log(data);
              //가져온 html파일의 컴파일에 필요한 파일들의 경로들 get 및 요청
              html = data;
              needPaths = LazyAngularCore.getNeedPaths(html);
              console.log(needPaths)
              require(needPaths, function (data) {

                  console.log(html);
                  //컴파일 및 DOM 적용.
                  ele.injector().invoke(function ($compile) {
                      var scope = ele.scope();
                      dom = $compile(html)(scope);
                      console.log(dom);
                      ele.html(dom);
                      //apply
                      scope.$apply();
                  });

                  //불러온 path값을 list에서 삭제한다.
                  LazyAngularCore.removePathInfo(needPaths);

                  callback && callback();
              })
          })
      }

      return {
          bootstrap: bootstrap,
          pushPathInfo: LazyAngularCore.pushPathInfo,
          setRootInfo: LazyAngularCore.setRootInfo,
          loader: loader
      };
  });
