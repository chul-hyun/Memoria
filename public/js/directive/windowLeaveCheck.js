/*global Memoria */
'use strict';

define(['LazyRegister', 'jquery'], function (LazyRegister) {
    LazyRegister.directive('windowLeaveCheck', function () {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {

                $(window).on('scroll resize',function () {

                    element.removeAttr('window-leaved');
                    element.removeAttr('window-leaving');
                    var preTop = element.offset().top - parseFloat(element.css('marginTop'))
                      , preBottom = element.outerHeight() + preTop;
                    if ($(window).scrollTop() >= preBottom) {
                        element.attr('window-leaved', true);
                    }else if ($(window).scrollTop() >= preTop) {
                        element.attr('window-leaving', true);
                    }
                })
            }
        };
    });
});