
//공통 컨트롤러 설정 - 모든 컨트롤러에서 공통적으로 사용하는 부분들 선언
define(['LazyRegister', 'Path'], function (LazyRegister, Path) {
    //컨트롤러 선언
    LazyRegister.controller('routeCtrl', ['$scope', function ($scope) {
        $scope.categoryRoute = function (info) {
            info.path = Path.applyRoot('view', info.path);
        }
    }]);
});