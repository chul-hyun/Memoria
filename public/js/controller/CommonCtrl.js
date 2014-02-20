
//공통 컨트롤러 설정 - 모든 컨트롤러에서 공통적으로 사용하는 부분들 선언
define(['LazyRegister', 'StaticData/Roots'], function (LazyRegister, Roots) {

  console.log("공통 컨트롤러 등록");
  //컨트롤러 선언
  LazyRegister.controller('CommonCtrl', ['$scope', function ($scope) {
    console.log('CommonCtrl updateCSS emit');
    
    //기본 스타일시트
    var baseStylesheets = Roots.getFullPath('style', ['bootstrap', 'layout', 'toggle-button']);
    var newStylesheets = [];
    //스타일시트 basePath 설정
    $scope.stylesheetPathBase = Roots.getRoot('style');

    //스타일시트 업데이트
    $scope.$on('updateCSS', function (event, args) {
      //파라메터로 받아온 스타일 시트 반영
      newStylesheets = Roots.getFullPath('style', args);
    });

    //스타일시트 추가
    $scope.$on('addCSS', function (event, args) {
      //파라메터로 받아온 스타일 시트 반영
      newStylesheets = newStylesheets.concat(Roots.getFullPath('style', args));
    });

    //스타일시트 반영
    $scope.$watch(function () { return newStylesheets; }, function (newValues) {
      $scope.stylesheets = baseStylesheets.concat(newStylesheets);
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    });

    //lazyinclude 의 root값 적용시킨 값으로 path값 재설정.
    $scope.$on('lazyIncludeStart',function(e, next){
      next.path = Roots.getFullPath('lazyInclude', next.path);
    })
  }]);
});