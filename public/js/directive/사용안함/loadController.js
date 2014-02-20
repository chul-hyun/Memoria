/*global Memoria */
'use strict';

/**
 *
 */

directives.directive('loadController', function loadController($rootElement) {
    return {
        restrict: 'A',
        require: "?loadSrc",
        link: function (scope, element, attrs) {
            var loadFile = (attrs.loadSrc).split(" ");
            var deferredes = $.getScript(loadFile[0]);
            for (var i = 1, len = loadFile.length; i < len; i++) {
                deferredes = deferredes.then($.getScript(loadFile[i]));
            }
            deferredes.then(function () {
                //$rootScope.$apply(function () {
                //console.log(scope);
                scope.$apply();
                //scope.$parent.$apply();
                //});
            })
            attrs.$set('ngController', attrs.loadController);

        }
    };
});
