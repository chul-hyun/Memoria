
//공통 컨트롤러 설정 - 모든 컨트롤러에서 공통적으로 사용하는 부분들 선언
define(['LazyRegister', 'Path', 'css!style/layout'], function (LazyRegister, Path) {

  console.log("공통 컨트롤러 등록");
  //컨트롤러 선언
  LazyRegister.controller('CommonCtrl', ['$scope', function ($scope) {

    //lazyinclude 의 root값 적용시킨 값으로 path값 재설정.
    $scope.$on('lazyIncludeStart',function(e, next){
        next.path = Path.applyRoot('particle', next.path);
    })
  }]);
});