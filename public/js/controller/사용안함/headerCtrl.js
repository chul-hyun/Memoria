define([], function () {
    //컨트롤러 선언
    return ['headerCtrl', function ($scope, $element) {
        var scrollSpeed = 200;
        $scope.goArticleAinmate = function () {
            scrolling = true;
            $("body, html").stop(true, false).animate({ scrollTop: $element.offset().top + $element.height() }, scrollSpeed);
        }
        $scope.goHeaderAinmate = function () {
            $scope.menuTopFixed = false;
            $("body, html").stop(true, false).animate({ scrollTop: 0 }, scrollSpeed);
        }
    } ];
});