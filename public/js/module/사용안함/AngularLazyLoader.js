//requireJS 모듈 선언
define([
//디펜던시가 걸려있으므로, 아래의 디펜던시가 먼저 로드된 뒤에 아래 콜백이 수행된다.
        'app',
        'getLoader',
        'module/Loop',
        'module/Check',
        'module/Misc',
        'module/Defer',
        'module/Err'
	],

//디펜던시 로드뒤 콜백함수
	function (app, getLoader, Loop, Check, Misc, Defer, Err) {

	    var lazyControllers = getLoader()
          , lazyDirectives = getLoader()
          , lazyServices = getLoader()
          , lazyFilters = getLoader();

	    var rootElement
          , injector
          , compile
          , rootScope
          , linkFn;


	    app.config(function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
	        lazyControllers.setRegister($controllerProvider.register);
	        lazyDirectives.setRegister($compileProvider.directive);
	        lazyServices.setRegister($provide.value);
	        lazyFilters.setRegister($filterProvider.register);
	    });

	    app.run(function ($rootElement) {
	        rootElement = $rootElement;
	    });

	    //기본경로 설정 함수들.
	    function setControllerRoot(src) {
	        lazyControllers.setRoot(src);
	    }
	    function setDirectiveRoot(src) {
	        lazyDirectives.setRoot(src);
	    }
	    function setServiceRoot(src) {
	        lazyServices.setRoot(src);
	    }
	    function setFilterRoot(src) {
	        lazyFilters.setRoot(src);
	    }

	    lazyControllers.setRegister(function (Provider) {
	        return function (val) {
	            Provider.register(val[0], val[1]);
	        }
	    });
	    lazyDirectives.setRegister(function (Provider) {
	        return function (val) {
	            Provider.directive(val[0], val[1]);
	        }
	    });
	    lazyServices.setRegister(function (Provider) {
	        return function (val) {
	            Provider.value(val[0], val[1]);
	        }
	    });
	    lazyFilters.setRegister(function (Provider) {
	        return function (val) {
	            Provider.register(val[0], val[1]);
	        }
	    });
	    function angularjsRefresh() {
	        console.log('angularjsRefresh');
	        if (Check.isUndefined(rootElement)) {
	            throw new Err.NotReadyError();
	        }
	        var injector = rootElement.injector();
	        var $compile = injector.get('$compile');
	        var rootScope = rootElement.scope();

	        //var linkFn = $compile(rootElement);
	        //linkFn(rootScope);
	        rootScope.$apply();
	    }
	    function lazyLoading(resources) {
	        _lazyLoading(resources).done(angularjsRefresh);
	    }
	    function _lazyLoading(resources) {
	        console.log("_lazyLoading");
	        Check.map(['Object', resources]);

	        var def = new Defer();

	        Misc.defaultObjectInit(resources,
                {
                    controllers: [],
                    directives: [],
                    services: [],
                    filters: []
                });
	        if (Check.isDefined(resources.controller)) {
	            resources.controllers.push(resources.controller);
	        }

	        //불러올게 없으면 함수종료.
	        if (resources.controllers.length == 0 && resources.directives.length == 0 && resources.services.length == 0 && resources.filters.length == 0) {
	            def.reject();
	            return def.promise;
	        }
	        var controllerLoad = lazyControllers.load(resources.controllers);
	        var directiveLoad = lazyDirectives.load(resources.directives);
	        var serviceLoad = lazyServices.load(resources.services);
	        var filterLoad = lazyFilters.load(resources.filters);

	        Defer.when(controllerLoad, directiveLoad, serviceLoad, filterLoad).then(function () {
	            console.log("lazyLoading 모든 제공자 로드 완료");
	            def.resolve();
	        }, function () {
	            def.reject();
	        });

	        return def.promise;
	    }
	    /*
	    현재 시점에서 services는 오직 value 값을 정할때만 사용할 수 있다.
	    Services는 반드시 factory를 사용해야 한다.
		
	    $provide.value('a', 123);
	    $provide.factory('a', function() { return 123; });
	    $compileProvider.directive('directiveName', ...);
	    $filterProvider.register('filterName', ...);
	    */
	    function routeConfig(routeDefinition) {

	        //변수 선언
	        var defer;

	        Misc.defaultObjectInit(routeDefinition,
                {
                    resolve: {}
                });

	        var loaded = false;


	        //경로 
	        routeDefinition.resolve.delay = function ($rootScope) {

	            //defer 가져오기
	            def = new Defer();

	            if (!loaded) {
	                _lazyLoading(routeDefinition).done(function () {
	                    loaded = true;
	                    def.resolve();
	                    $rootScope.$apply();
	                });
	            }
	            else {
	                def.resolve();
	            }

	            return def.promise;
	        }

	        return routeDefinition;
	    }

	    return {
	        setControllerRoot: setControllerRoot,
	        setDirectiveRoot: setDirectiveRoot,
	        setServiceRoot: setServiceRoot,
	        setFilterRoot: setFilterRoot,
	        lazyLoading: lazyLoading,
	        routeConfig: routeConfig
	    };
	}
);

