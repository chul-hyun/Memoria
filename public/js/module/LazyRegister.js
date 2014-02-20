define(['js/app'], function (app) {
    //객체로 안하고 변수로 전달하면 register유지가 안되므로 객체에 담아서 리턴함.
    var register = {};
    register.controller = function (name, constructor) {
        app.controller(name, constructor);
        //LazyRegisterList.removePath('controller', name);
    }
    register.directive = function (name, constructor) {
        app.directive(name, constructor);
        //LazyRegisterList.removePath('directive', name);
    }
    register.service = app.value;
    register.filter = function (name, constructor) {
        app.filter(name, constructor);
        //LazyRegisterList.removePath('filter', name);
    }

    app.config(function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        register.controller = function (name, constructor) {
            $controllerProvider.register(name, constructor);
            //LazyRegisterList.removePath('controller', name);
        }
        register.directive = function (name, constructor) {
            $compileProvider.directive(name, constructor);
            //LazyRegisterList.removePath('directive', name);
        }
        register.service = $provide.value;
        register.filter = function (name, constructor) {
            $filterProvider.register(name, constructor);
            //LazyRegisterList.removePath('filter', name);
        }
    });

    return register;
});