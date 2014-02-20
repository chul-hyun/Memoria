define(['module/Defer'], function (Defer) {
    return function (paths) {
        console.log(paths);
        console.log('등록');
        var def = new Defer();
        require(paths, function () {
            console.log('deferRequire로드완료');
            console.log(arguments);
            def.resolve(arguments);
        });
        return def.promise;
    }
});