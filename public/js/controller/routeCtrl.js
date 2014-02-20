
//공통 컨트롤러 설정 - 모든 컨트롤러에서 공통적으로 사용하는 부분들 선언
define(['LazyRegister', 'StaticData/Roots', 'module/DeferRequire', 'LazyAngular'], function (LazyRegister, Roots, DeferRequire, LazyAngular) {
  //컨트롤러 선언
  LazyRegister.controller('routeCtrl', ['$scope', '$route', '$routeParams', function ($scope, $route, $routeParams) {
    $scope.categoryRoute = function (info) {
      console.log(info);
      info.path = Roots.getFullPath('template', info.path);
    }

    /*
    //기본 template경로 설정후 route 요청.
    $scope.$on("$routeChangeStart",
      function (event, next, current) {
        if (!!next && !!next.$$route && !!next.$$route.templateUrl) {
          $scope.routeParams = next.params;
          $scope.routeParams.templateUrl = Roots.getFullPath('template', next.$$route.templateUrl);
          $scope.$apply();
        }
      });
    
    //가져온 html파일의 컴파일에 필요한 파일들의 경로들 get 및 요청
    $scope.$on("$routeChangeSuccess",
      function (event, current, previous) {
        if (!!current && !!current.locals && !!current.locals.$template) {
          var htmlData = current.locals.$template
            , needPaths = LazyAngular.getNeedPaths(htmlData);
          if (needPaths.length !== 0) {
            current.locals.$template = '<div>loading</div>';
            DeferRequire(needPaths).done(
               function () {
                 $route.reload();
               })
          }
        }
      });*/
  }]);
});