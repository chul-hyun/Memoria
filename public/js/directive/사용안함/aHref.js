'use strict';
/*global Memoria */
/**
  * @author: memoria
  */
define(['LazyRegister'], function (LazyRegister) {
  LazyRegister.directive('aHref', ['$location', function ($location) {
    return {
      restrict: 'A',
      scope: { href: "@aHref" },
      link: function (scope, element, attrs) {
        element.on('click', function () {
          $location.path(href);
        })
      }
    }
  }])
});
