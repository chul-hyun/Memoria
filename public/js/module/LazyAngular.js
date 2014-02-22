'use strict';

define(['LazyAngularCore', 'Loop', 'jquery.outerHTML', 'angular'],
  function (LazyAngularCore, Loop) {

      //���� �������� HTML�� �����Ͽ� �ʿ��� ������(controller, directive)�� �������� ��Ʈ��Ʈ�� �ϴ� ��Ʈ��Ʈ�� �Լ�
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
          //html���� ��û
          require(['text!' + path], function (data) {
              //������ html������ �����Ͽ� �ʿ��� ���ϵ��� ��ε� get �� ��û
              html = data;
              needPaths = LazyAngularCore.getNeedPaths(html);
              require(needPaths, function (data) {
                  //������ �� DOM ����.
                  ele.injector().invoke(function ($compile) {
                      var scope = ele.scope();
                      dom = $compile(html)(scope);
                      ele.html(dom);
                      //apply
                      scope.$apply();
                  });

                  //�ҷ��� path���� list���� �����Ѵ�.
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
