'use strict';

define(['module/AngularLazyLoader'], function (AngularLazyLoader) {
    console.log("lazy컨트롤 attr 등록");
    return ['lazyController', ['$rootScope', function ($compile, $rootScope, $rootElement) {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                console.log("lazy컨트롤 attr 링크작업 실행");
                var controllerPath = attrs.lazyController
                  , controllerName = controllerPath.substring(controllerPath.lastIndexOf("/") + 1);

                console.log(controllerName+" 컨트롤 설정");
                element.removeAttr('lazy-controller').attr('ng-controller', controllerName);

                AngularLazyLoader.lazyLoading({
                    controllers: controllerPath
                });
            }
        };
    } ]]
})
