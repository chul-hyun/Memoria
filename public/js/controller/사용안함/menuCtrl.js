define(['LazyRegister', 'StaticData/menuModel'], function (LazyRegister) {
    console.log("test");
    //컨트롤러 선언
    LazyRegister.controller('menuCtrl', ['$scope', 'menuModel', function ($scope, menuModel) {
        console.log('menuCtrl updateCSS emit');
        $scope.$emit('addCSS', ['menu']);
        $scope.menus = menuModel.menus;
        //$scope.$watch('menuButton', function (newValue, oldValue) {
        //    menuModel.setChoseIndex(newValue);
        //});
    } ]);
    console.log("메뉴컨트롤 등록완료");
});