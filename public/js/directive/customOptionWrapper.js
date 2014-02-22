'use strict';
/*global Memoria */
/**
  * @author: memoria
  * @see: LazyRegister, customSelect, customSelectView
  */
define(['LazyRegister'], function (LazyRegister) {
    LazyRegister.directive('customOptionWrapper', function () {
        return {
            restrict: 'E',
            scope: {},
            require: '^customSelect',
            link: function (scope, element, attrs, customSelectCtrl) {
                //cusotmOption 초기화
                customSelectCtrl.initCustomOptionWrapper(element);
            }
        }
    })
});
