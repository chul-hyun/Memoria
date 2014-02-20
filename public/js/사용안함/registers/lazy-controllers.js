define(['module/Defer', 'module/Check', 'module/Loop', 'module/Cash', 'module/Misc'], function (Defer, Check, Loop, Cash, Misc) {

    var $controllerProvider
      , root;

    function setControllerProvider(value) {
        $controllerProvider = value;
    }
    function setRoot(src) {
        root = src;
    }
    var load = function (paths) {
        if (!$controllerProvider) {
            throw new Error("$controllerProvider is not set!");
        }
        Check.map(['Array', paths]);

        var def = new defer();

        if (paths.length == 0) {
            def.resove();
            return def.promise;
        }

        if (Check.isDefined(root)) {
            Misc.setRoot(root, paths);
        }
        
        require(paths, function () {
            Loop.each(arguments, function (val) {
                register(val);
            })
            def.resolve();
        });
        return def.promise;
    };
    function register(controller) {
        $controllerProvider.register.apply(null, controller);
    }

    return {
        setControllerProvider: setControllerProvider,
        setRoot: setRoot,
        load: load
    }
})
