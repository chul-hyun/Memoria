/*global Memoria */
'use strict';

define(['LazyRegister', 'jquery'], function (LazyRegister, $) {
  LazyRegister.directive('windowLeaveCheck', function () {
    return {
      restrict: 'A',
      scope: {},
      link: function (scope, element, attrs) {
        
        $(window).scroll(function () {
          element.removeClass('window-leave');
          var preTop = element.offset().top - parseFloat(element.css('marginTop'))
            , preOuterHeight = element.outerHeight();
          if ($('body, html').scrollTop() >= preTop) {
            element.addClass('window-leave');
          }
        })
      }
    };
  });
});