define(['LazyRegister', 'model/musicRoomModel'], function (LazyRegister, musicRoomModel) {
    //컨트롤러 선언
    LazyRegister.controller('musicRoomCtrl', ['$scope', '$element',
      function ($scope, $element) {
          //css
          require(['css!/style/music-room']);
          $scope.posts = musicRoomModel.getPosts(0, 12);
      }]);
});
