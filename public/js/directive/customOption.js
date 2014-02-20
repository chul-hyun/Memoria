'use strict';
/*global Memoria */
/**
  * @author: memoria
  * @see: LazyRegister, customSelect, customSelectView
  */
define(['LazyRegister'], function (LazyRegister) {
  LazyRegister.directive('customOption', function () {
    return {
      restrict: 'E',
      scope: {},
      require:'^customSelect',
      link: function (scope, element, attrs, customSelectCtrl) {
        var on = false;

        //cusotmOption 초기화
        customSelectCtrl.initOption(element);
        
        //클릭시 현 element를 selected로 설정
        element.on('click', function () {
          customSelectCtrl.selected(element);
        })
        attrs.$observe('selected', function (val) {
          if (on === val) {
            return;
          }

          if (val) {
            customSelectCtrl.selected(element);
          }
        })

        //selected클래스가 있을시 현제 element를 selected값으로 설정.
        scope.$watch(function () {
          return element.prop('selected')
        }, function (newValue, oldValue) {
          if (newValue) {
            customSelectCtrl.selected(element);
          }
        });
        
        //selected가 변경시 그 변경된 seleted가 자기 element인지 아닌지에 따라 seleted 속성 설정
        scope.$watch(function () { return customSelectCtrl.selected(); }, function (newSeleted) {
          if (newSeleted === undefined) {
            return;
          }
          if (newSeleted === element) {
            on = true;
            element
              .attr('selected', true)
              .prop('selected', true);
          } else {
            element
              .removeAttr('selected')
              .prop('selected', false);
          }
        })
      }
    }
  })
});
