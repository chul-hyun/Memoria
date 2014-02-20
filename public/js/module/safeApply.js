define([], function () {
    function safeApply(scope, fn) {
        var phase = scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            scope.$apply(fn);
        }
    };
    return safeApply;
});