define(['LazyRegister', 'services/slideModel'], function (LazyRegister) {
    console.log("test");
    //컨트롤러 선언
    LazyRegister.controller('slideCtrl', ['$scope', 'slideModel',function ($scope, slideModel) {

        $scope.$emit('updateCSS', ['slider']);

        $scope.slides = slideModel.sliders;
    } ]);
});