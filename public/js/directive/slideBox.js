'use strict';
/**
* slideBox directive.
*/
define(['LazyRegister', 'UID', 'Loop', 'D', 'jquery']
  , function (LazyRegister, UID, Loop, D) {
      LazyRegister.directive('slideBox', function () {
          return {
              restrict: 'E',
              scope: {
                  'slideBox': '=register',
                  'upButton': '=up',
                  'downButton': '=down',
                  'expandButton': '=expand',
                  'slideIndex':'='
              },
              link: function ($scope, $element, $attrs) {
                  var DATA = D();
                  
                  DATA.set({
                      'moveHeight': function () { return $element.height() },
                      'boxHeight': function () { return $element.prop('scrollHeight') },
                      'index': function(index, lastIndex){
                          if(index === undefined || index<0){
                              return 0;
                          }
                          if(index >= lastIndex){
                              return lastIndex;
                          }
                          return index;
                      },
                      'lastIndex': 0,
                      'speed': 300,
                      'expand':false
                  });

                  DATA.set({
                      'moveHeight':
                  });

                  var buttons = {}
                    , uid = UID.get();

                  Loop.each(['up', 'down', 'expand'], function (key) {
                      $scope.$watch(key, function (newButtonSeletor) {
                          buttons[key] && buttons[key].off('.' + uid);

                          if (!newButtonSeletor === undefined) {
                              buttons[key] = undefined;
                              return;
                          }

                          buttons[key] = $(newButtonSeletor);
                          buttons[key].on('click.' + uid, function () {
                              switch (key) {
                                  case 'up': DATA.set('index', DATA.get('index') + 1);
                              }
                          });
                      })
                  })

                  //처음엔 postList이동 버튼들을 모두 disabled.
                  postListBoxMoveHeight || $postListUpButton.add($postListDownButton).add($postListExpandButton).attr('disabled', true);

                  function postListUp() {
                      $element.stop(true, true).animate({ scrollTop: $element.scrollTop() - postListBoxMoveHeight }, slidingSpeed, initButton);
                  }
                  function postListDown() {
                      $element.stop(true, true).animate({ scrollTop: $element.scrollTop() + postListBoxMoveHeight }, slidingSpeed, initButton);
                  }
                  function postListToggle() {
                      alert('postListExpand');
                  }
                  function postListExpand() {
                      alert('postListExpand');
                  }
                  function postListPress() {
                      alert('postListExpand');
                  }

                  function initButton() {
                      //본래 스크롤위치로 되돌리기 위한 본래 위치 저장 변수
                      var orginTop = $element.scrollTop();

                      //$postListUpButton 체크
                      $element.scrollTop(orginTop - postListBoxMoveHeight);
                      (orginTop === $element.scrollTop()) ?
                        $postListUpButton.attr('disabled', true) : $postListUpButton.removeAttr('disabled');

                      //$postListDownButton 체크
                      $element.scrollTop(orginTop + postListBoxMoveHeight);
                      (orginTop === $element.scrollTop()) ?
                        $postListDownButton.attr('disabled', true) : $postListDownButton.removeAttr('disabled');

                      //$postListExpandButton 체크
                      ($postListUpButton.attr('disabled') && $postListDownButton.attr('disabled')) ?
                        $postListExpandButton.attr('disabled', true) : $postListExpandButton.removeAttr('disabled');

                      //본래 위치로 되돌린다.
                      $element.scrollTop(orginTop);
                  }

              }
          }
      })
  });
