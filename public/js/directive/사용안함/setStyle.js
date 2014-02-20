'use strict';

define([], function () {

    return ['setStyle', function setStyle() {
        return {
            restrict: 'A',
            replace: true,
            template: "",
            scope: {},
            require: "?href",
            link: function (scope, element, attrs) {

                var hrefObserve = function (value) {
                    if ($("html").is("link[href='" + value + "']")) {
                        return;
                    }
                    if (scope.linkDOM == undefined) {
                        scope.linkDOM = $("<link>");
                        $("head").append(scope.linkDOM);
                    }
                    scope.linkDOM.attr({
                        href: value,
                        type: "text/css",
                        rel: "stylesheet"
                    });
                };
                attrs.$observe('setStyle', hrefObserve);
            }
        }
    } ]
});
