/*global Memoria */
/**
  * 라디오 버튼 구현 
  *
  * @author: memoria
  * @see: LazyRegister
  */
'use strict';
define(['LazyRegister'],
function (LazyRegister) {

  LazyRegister.directive('customRadio', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        changeRadio: '=changeRadio'
      },
      link: link
    };

    var on = false;

    function link(scope, element, attrs) {
      //checked 속성이 있을시 on함수 실행.
      attrs.$observe('checked', function (val) {
        if (on === val) {
          return;
        }

        if (val) {
          apply();
        }
      })
      //클릭시 on함수 실행.
      element.on("click", function () {
        apply();
      });

      function apply() {
        on = true;
        //이전에 체크된 element 체크 해제.
        $('custom-radio[change-radio="' + attrs.changeRadio + '"]').not(element)
          .removeAttr('checked')
          .prop('checked', false);
        //대상 element 체크.
        $(element)
          .attr('checked', true)
          .prop('checked', true);

        var value = attrs.value;
        //값 재설정 및 scope apply
        if (scope.changeRadio) {
          scope.changeRadio(value);
        }
        
      }
    }
  }]);
});