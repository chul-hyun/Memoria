'use strict';

define(['LazyRegister', 'Check'], function (LazyRegister, Check) {
    LazyRegister.directive('toggleButton', [function () {
        var skins = {
            menu: '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>'
        };
        return {
            restrict: 'E',
            scope: {},
            link: function (scope, element, attrs) {
                attrs.$observe('skin', function (newSkin, oldSkin) {
                    if (Check.isDefined(skins[newSkin])) {
                        element.append(skins[newSkin]);
                    }
                });

                element.on('click', function () {
                    if (Check.isDefined(element.attr('Activated'))) {
                        element.removeAttr('Activated');
                    } else {
                        element.attr('Activated', '');
                    }
                });
            }
        }
    } ])
});
