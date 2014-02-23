define(['LazyRegister', 'model/routeModel', 'jquery'], function (LazyRegister, routeModel) {
    //컨트롤러 선언
    LazyRegister.controller('logoCtrl', ['$scope', '$element', '$location',
      function ($scope, $element, $location) {
          //values init
          var pageList = routeModel.pageList;
          var $categorySelect = $element.find('#category-select');

          $scope.pageList = pageList;
          $scope.logoTitle = routeModel.title;
          //css 설정
          require(['css!style/default-custom-select', 'css!style/logo']);

          $scope.selectIndex = $location.path().split("/")[1];

          $scope.changePage = function (value) {
              //$scope.selectIndex = value;
              if ($location.path() !== value) {
                  $location.path(value);
                  if (!!!$scope.$$phase && !!!$scope.$root.$$phase) {
                      $scope.$apply()
                  }
              }
              
          }
          $scope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
              
              var value = $location.path().split("/")[1];
              $scope.selectIndex = value;
              if (!!!$scope.$$phase && !!!$scope.$root.$$phase) {
                  $scope.$apply()
              }
          });
      }]);
});