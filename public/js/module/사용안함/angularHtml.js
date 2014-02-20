define(['app', 'jquery', 'module/Err', 'module/Check'], function (app, $, Err, Check) {

    $.fn.angularHtml = function (compile, htmlString) {
        Check.map(['Function', compile]);
        var scope = $(this).scope();
        $(this).html(compile(htmlString)(scope));
        scope.$apply();
    }
});