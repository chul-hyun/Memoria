/*global Memoria */
'use strict';

/**
 *
 */
directives.directive('mInclude', function mInclude() {
    return {
        restrict: 'A',
        replace: true,
        template: "",
        link: function (scope, element, attrs) {
            var htmlSrc = attrs.mInclude;
            var getDOM = $("<div>");
            getDOM.load(htmlSrc, function () {
                var getScripts = new Array();
                getDOM.find('pre-load-script').each(function () {
                    getScripts.concat(($(this).attr("m-src")).split(" "));
                });
                console.log(getDOM);
                var deferredes = $.getScript(getScripts[0]);
                for (var i = 1, len = getScripts.length; i < len; i++) {
                    deferredes = deferredes.then($.getScript(getScripts[i]));
                }
                var includeDOM = getDOM.clone().remove('pre-load-script').unwrap();
                console.log(includeDOM);
                deferredes.then(function () {
                    element.html(includeDOM);
                }, function () {
                    console.log("실패");
                });
            }, 'html')
        }
    };
});