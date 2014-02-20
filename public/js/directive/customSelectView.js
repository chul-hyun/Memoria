'use strict';
/*global Memoria */
/**
  * @author: memoria
  * @see: LazyRegister, customSelect, customSelectView
  */
define(['LazyRegister'], function (LazyRegister) {
  LazyRegister.directive('customSelectView', function () {
    return {
      restrict: 'E',
      scope: {},
      require: '^customSelect',
      link: function (scope, element, attrs, customSelectCtrl) {
        //customSelectView 초기화
        customSelectCtrl.initSelectViews(element);

        //selected의 text값 감시
        scope.$watch(function () {
          var selected = customSelectCtrl.selected();
          if (!(selected && selected.attr && selected.text)) {
            selected = customSelectCtrl.getFirstOption();
          }
          if (!(selected && selected.attr && selected.text)) {
            return '';
          }
          return selected.attr('label') || selected.text();
        }, function (newViewText) {
          element.text(newViewText);
        })
      }
    }
  })
});
