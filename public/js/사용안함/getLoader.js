define(['module/Defer', 'module/Check', 'module/Loop', 'module/Cash', 'module/Misc'], function (Defer, Check, Loop, Cash, Misc) {

    return function () {
        var root = ''
          , register;

        function setRegister(value) {
            register = value;
        }
        function setRoot(src) {
            root = src;
        }

        function load(paths) {
            if (Check.isUndefined(register)) {
                throw new Error("register is not set!");
            }
            Check.map(['Array','String', paths]);
            if (Check.isString(paths)) {
                paths = [paths];
            }

            var def = new Defer();

            if (paths.length == 0) {
                def.resolve();
                return def.promise;
            }

            if (Check.isDefined(root)) {
                Misc.setRoot(root, paths);
            }

            Cash.removeOverlap('lazyLoading.paths', paths, 'array');
            if (paths.length == 0) {
                def.reject();
            } else {
                require(paths, function () {
                    Loop.each(arguments, function (values) {
                        register.apply(undefined, values);

                        console.log(values[0] + ' 로드 완료');
                        console.log(values);
                    })

                    def.resolve();
                });
            }
            return def.promise;
        }

        return {
            setRegister: setRegister,
            setRoot: setRoot,
            load: load
        }
    }
})
