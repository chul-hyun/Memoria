define(['LazyRegister'], function (LazyRegister) {
    //컨트롤러 선언
    LazyRegister.controller('imgSlideCtrl', ['$scope', '$element',
      function ($scope, $element) {
          var postListBoxMoveHeight
            , $postListController = $element.find('.img-slide-controller')
            , $postListScrollIndex = 1
            , slidingSpeed = 300;
          console.log($scope.testt);
          var $postListUpButton = $postListController.find('.up button')
            , $postListDownButton = $postListController.find('.down button')
            , $postListExpandButton = $postListController.find('.expand button');

          //css
          require(['css!/style/music-room'], function () {
              postListBoxMoveHeight = $element.height();
              initButton();
              $(window).resize(initButton);
          });

          $postListController.on('click', 'button', function (e) {
              if (this === $postListUpButton[0]) {
                  postListUp();
              } else if (this === $postListDownButton[0]) {
                  postListDown();
              } else if (this === $postListExpandButton[0]) {
                  postListToggle();
              }
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
      }]);
});
