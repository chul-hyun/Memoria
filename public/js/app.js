'use strict';

define([
		'angular', //앵귤러 모듈을 사용하기 위해 임포트
        'angular-route' //registers에 각 프로바이더를 제공하기 위해 임포트
	],
	function () {
	    var Memoria = angular.module('Memoria', ['ngRoute']);

	    return Memoria;
	}
);
