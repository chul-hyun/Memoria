define(['LazyRegister', 'model/musicRoomModel', 'jquery'], function (LazyRegister, musicRoomModel) {
    //컨트롤러 선언
    LazyRegister.controller('imgSliderCtrl', ['$scope', '$element',
    function ($scope, $element) {

          var moveHeight = 0
            , $imgSliderController = $element.find('#img-slider-controller')
            , scrollIndex = 0
            , ScrollLastIndex = 0
            , slidingSpeed = 300
            , expand = false;

          var $slideUpButton = $imgSliderController.find('#up-button')
            , $slideDownButton = $imgSliderController.find('#down-button')
            , $slideExpandButton = $imgSliderController.find('#expand-button');

          //css
          require(['css!/style/img-slider'], function () {
              applyMoveHeight();
              applyScrollLastIndex();
              applyButton();
          });

          $imgSliderController.on('click', 'button', function (e) {
              if (this === $slideUpButton[0]) {
                  scrollIndex--;
              } else if (this === $slideDownButton[0]) {
                  scrollIndex++;
              } else if (this === $slideExpandButton[0]) {
                  expand = !expand;
                  applyExpand();
              }
              applyScrollIndex();
              applyButton();
          })

          $(window).on('resize', function () {
              applyScrollLastIndex();
              applyScrollIndex();
              applyButton();
          });

          applyButton();
          
          function applyButton() {
              //$slideUpButton 체크
              (expand || scrollIndex <= 0) ?
                $slideUpButton.attr('disabled', true) : $slideUpButton.removeAttr('disabled');

              //$slideDownButton 체크
              (expand || scrollIndex >= ScrollLastIndex) ?
                $slideDownButton.attr('disabled', true) : $slideDownButton.removeAttr('disabled');

              //$slideExpandButton 체크
              (!expand && ScrollLastIndex === 0) ?
                $slideExpandButton.attr('disabled', true) : $slideExpandButton.removeAttr('disabled');

          }
          function applyScrollIndex() {
              scrollIndex =
                  (scrollIndex < 0) ? 0 :
                  (scrollIndex > ScrollLastIndex) ? ScrollLastIndex :
                  scrollIndex;
              slide();

              function slide() {
                  $element.stop(true, true).animate({ scrollTop: moveHeight * scrollIndex }, slidingSpeed);
              }
          }
          function applyMoveHeight() {
              moveHeight = $element.height();
          }
          function applyScrollLastIndex() {
              if (moveHeight === 0) {
                  ScrollLastIndex = 0;
              }
              ScrollLastIndex = ($element.prop("scrollHeight") / moveHeight) - 1;
          }
          function applyExpand() {
              (expand) ? $element.addClass('expand-slider') : $element.removeClass('expand-slider');
          }
          

          $scope.posts = musicRoomModel.getPosts(0, 12);
      }]);
});
