define(['LazyRegister', 'model/routeModel', 'jquery'], function (LazyRegister, routeModel) {
    //컨트롤러 선언
    LazyRegister.controller('logoCtrl', ['$scope', '$element', '$location',
      function ($scope, $element, $location) {
          //values init
          var pageList = routeModel.pageList;

          $scope.pageList = pageList;
          $scope.logoTitle = routeModel.title;
          //css 설정
          require(['css!style/logo', 'css!style/default-custom-select']);

          $scope.selectIndex = $location.path().split("/")[1];

          $scope.changePage = function (value) {
              if ($scope.selectIndex === value) {
                  return;
              }
              $scope.selectIndex = value;
              $location.path(value);
              if (!!!$scope.$$phase && !!!$scope.$root.$$phase) {
                  $scope.$apply()
              }
          }
      }]);
});