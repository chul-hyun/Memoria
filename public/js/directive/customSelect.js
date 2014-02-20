'use strict';
/*global Memoria */
/**
  * 클래스로 selet태그를 사용자마음대로 디자인 가능한 태그.
  *
  * 사용되는 태그 목록
  * select-view태그: 선택된 값이 들어가는 태그.
  * custom-option태그: select태그의 option태그와 기능이 동일하다.
  *
  * 사용가능한 클랙스 목록
  * optionSelecting: 옵션 선택중 설정되는 클래스.
  *
  * selected속성: select태그의 selected속성과 기능이 동일하다.
  *
  * @author: memoria
  * @see: LazyRegister, customSelectView, customOption
  */
define(['LazyRegister', 'module/Loop', 'jquery', 'module/Check'], function (LazyRegister, Loop, $, Check) {
  LazyRegister.directive('customSelect', function () {
    return {
      restrict: 'E',
      scope: {
        changeSelect: "="
      },
      controller: ['$scope', '$element', function ($scope, $element) {
        //values init
        var viewText
          , $selected
          , firstOption
          , options = []
          , selectViews = []
          , selectingState = false;

        //option 초기화함수
        this.initOption = function (option) {
          options.push(option);
          //selected 속성을 가진 option일시, 첫번째 option일시 $selectView 설정
          if (option.attr('selected')) {
            $selected = option;
          }
          if (firstOption === undefined) {
            firstOption = option;
          }
        }

        this.getFirstOption = function () {
          return firstOption;
        }

        //selectView 초기화함수
        this.initSelectViews = function (selectView) {
          selectViews.push(selectView);
          selectView.text(viewText);
        }

        //selected get/set
        this.selected = function (selected) {
          if (selected && selected != $selected) {
            $selected = selected;
            console.log($scope.changeSelect);
            if (Check.isFunction($scope.changeSelect)) {
              $scope.changeSelect(selected.attr('value'));
            }
          }
          return $selected;
        }

        //select태그, customSelectView태그 클릭시 optionSelecting클래스 토글.
        $element.on('click', function (e) {
          setSelecting(!selectingState);

          e.stopPropagation();
        });

        // 다른곳, custom-option등을 클릭시 selectingState를 false로.
        $('html').on('click', function (e) {
          setSelecting(false);
          
          e.stopPropagation();
        });

        function setSelecting(selecting) {
          selectingState = selecting;

          if (selecting) {
            $element
              .attr('selecting', true)
              .prop('selecting', true);

            Loop.muti(options, selectViews, function (option) {
              option
                .attr('selecting', true)
                .prop('selecting', true);
            });
          } else {
            $element
              .removeAttr('selecting')
              .prop('selecting', false);
            Loop.muti(options, selectViews, function (option) {
              option
                .removeAttr('selecting')
                .prop('selecting', false);
            });
          }
        }
      }]
    }
  })
});
