'use strict';

define([
		'app', //생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
    'model/defaultModel',
    'module/Loop',
    'angular-route'
],

	function (app, defaultModel, Loop) {
	  var pageList = defaultModel.pageList;
	  //app은 생성한 myApp 앵귤러 모듈
	  app.config(function ($routeProvider, $locationProvider) {

	    // pageList기반으로 route리스트 설정
	    Loop.each(pageList, function (pageInfo, index) {
	      $routeProvider.when('/' + index + (pageInfo.paramPath || ''), {
	        path: pageInfo.path
	      });
	    });

	    //기본 경로 설정
	    $routeProvider.otherwise({ redirectTo: '/0' });
	  });
	});
