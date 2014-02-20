define(['LazyRegister', 'jquery', 'model/defaultModel'], function (LazyRegister, $, defaultModel) {
  //컨트롤러 선언
  LazyRegister.controller('logoCtrl', ['$scope', '$element', '$location',
    function ($scope, $element, $location) {
      //values init
      var pageList = defaultModel.pageList;
      
      $scope.pageList = pageList;
      $scope.logoTitle = defaultModel.title;
      console.log(defaultModel);
      //css 설정
      $scope.$emit('addCSS', ['logo', 'default-custom-select']);

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

      /*
      $scope.$on("$routeChangeSuccess",
       function (event, current, previous) {
         console.log($element.find('[value="#/' + $location.path().split("/")[1] + '"]'));
         $element.find('[href="#/' + $location.path().split("/")[1]+'"]').parent().click();
       });
       */
    }]);
});