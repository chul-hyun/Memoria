define(['Defer'], function (Defer) {
    return function (paths) {
        var def = new Defer();
        require(paths, function () {
            def.resolve(arguments);
        });
        return def.promise;
    }
});