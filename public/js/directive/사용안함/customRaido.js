/*global Memoria */
'use strict';

define([], function () {
    console.log("customRadio attr 등록")
    var checkFn = function (element, attrs) {
        $("custom-radio[name='" + attrs.name + "']").not(element).removeClass("customRadioOn").addClass("customRadioOff").attr("checked", false);
        $(element).removeClass("customRadioOff").addClass("customRadioOn").attr("checked", true);
        var scope = $("form").has(element).scope();
        scope[attrs.name] = attrs.value;
    }
    return ['customRadio', function customRadio() {
        return {
            restrict: 'E',
            scope: {},
            require: '^form',
            link: function (scope, element, attrs) {
                console.log("customRadio attr 링크 실행")
                if (attrs.ngModel == undefined) {
                    attrs.$set("ng-model", attrs.name);
                } else if (attrs.name == undefined) {
                    attrs.$set("name", attrs.ngModel);
                }

                if (attrs.checked != undefined) {
                    checkFn(element, attrs);
                }
                element.on("click", function () {
                    checkFn(element, attrs);
                    scope.$apply();
                });

            }
        };
    } ];
});