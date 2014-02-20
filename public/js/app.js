'use strict';

define([
		'angular', //앵귤러 모듈을 사용하기 위해 임포트
        'angular-route' //registers에 각 프로바이더를 제공하기 위해 임포트
	],
	function (angular) {
        console.log("app모듈 설정 시작.")
	    var Memoria = angular.module('Memoria', ['ngRoute']);
        console.log("app모듈 준비 완료.")

	    return Memoria;
	}
);
