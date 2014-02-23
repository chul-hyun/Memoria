define(['LazyRegister', 'model/musicRoomModel'], function (LazyRegister, musicRoomModel) {
    //컨트롤러 선언
    LazyRegister.controller('musicRoomCtrl', ['$scope', '$element',
      function ($scope, $element) {
          
          var $postListBox = $element.find('#post-list-box')
            , postListBoxMoveHeight
            , $postListController = $postListBox.find('#post-list-controller')
            , $postListScrollIndex = 1
            , slidingSpeed = 300;

          var $postListUpButton = $postListBox.find('#up-button')
            , $postListDownButton = $postListBox.find('#down-button')
            , $postListExpandButton = $postListBox.find('#expand-button');

          //css
          require(['css!/style/music-room'], function () {
              postListBoxMoveHeight = $postListBox.height();
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
              $postListBox.stop(true, true).animate({ scrollTop: $postListBox.scrollTop() - postListBoxMoveHeight }, slidingSpeed, initButton);
          }
          function postListDown() {
              $postListBox.stop(true, true).animate({ scrollTop: $postListBox.scrollTop() + postListBoxMoveHeight }, slidingSpeed, initButton);
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
              var orginTop = $postListBox.scrollTop();

              //$postListUpButton 체크
              $postListBox.scrollTop(orginTop - postListBoxMoveHeight);
              (orginTop === $postListBox.scrollTop()) ?
                $postListUpButton.attr('disabled', true) : $postListUpButton.removeAttr('disabled');

              //$postListDownButton 체크
              $postListBox.scrollTop(orginTop + postListBoxMoveHeight);
              (orginTop === $postListBox.scrollTop()) ?
                $postListDownButton.attr('disabled', true) : $postListDownButton.removeAttr('disabled');

              //$postListExpandButton 체크
              ($postListUpButton.attr('disabled') && $postListDownButton.attr('disabled')) ?
                $postListExpandButton.attr('disabled', true) : $postListExpandButton.removeAttr('disabled');

              //본래 위치로 되돌린다.
              $postListBox.scrollTop(orginTop);
          }

          $scope.posts = musicRoomModel.getPosts(0, 12);
      }]);
});
