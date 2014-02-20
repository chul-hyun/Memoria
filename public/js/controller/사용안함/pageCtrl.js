define([], function () {
    //컨트롤러 선언
    return ['pageCtrl', function ($scope, $element, menuModel) {
        var menus = menuModel.getMenus();
        menuModel.setUpdateChoseIndex(function () {
            var choseIndex = menuModel.getChoseIndex();
            var url = menus[choseIndex].url;
            $element.attr('src', url);
        })
    } ];
});