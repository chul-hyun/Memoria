/*global Memoria */
'use strict';

/**
 *window-leave, enter, leaveing, entering, reveal
 */

define([
		'app' //생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
	],

	function (app) {
	    var $window = $(window);
	    var getPosition = function (ele) {
	        if ($window === ele) {
	            return {
	                top: ele.scrollTop(),
	                bottom: ele.scrollTop() + ele.height(),
	                left: ele.scrollLeft(),
	                right: ele.scrollLeft() + ele.width()
	            };
	        }
	        return {
	            top: ele.offset().top,
	            bottom: ele.offset().top + ele.height(),
	            left: ele.offset().left,
	            right: ele.offset().left + ele.width()
	        };
	    }

	    var randNum = (function () {
	        var ALPHA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	        var ALPHA_LEN = ALPHA.length;
	        return function () {
	            var rN = '';
	            for (var i = 0; i < 8; i++) {
	                var randTnum = Math.floor(Math.random() * ALPHA_LEN);
	                rN += ALPHA[randTnum];
	            }
	            return rN;
	        }
	    })();

	    var eventFn = function () {
	        var screenPosition = getPosition($window);
	        $window.triggerHandler("screenChange", screenPosition);
	    };
	    $window.on("scroll resize", eventFn);
	    eventFn();

	    var getViewState = function (elePos, screenPos) {
	        if (elePos.top >= screenPos.top && elePos.bottom <= screenPos.bottom && elePos.left >= screenPos.left && elePos.right <= screenPos.right) {
	            return STATE.enter;
	        } else if (elePos.bottom <= screenPos.top || elePos.right <= screenPos.left) {
	            return STATE.leave;
	        } else {
	            return STATE.reveal;
	        }
	    }

	    var STATE = {
	        enter: 0,
	        reveal: 1,
	        leave: 2
	    }

	    var eventSort = ['Leave', 'Enter', 'Leaveing', 'Entering', 'Reveal'];
	    for (var name in eventSort)
        {
            app.directive('window' + name, ["$parse", function ($parse) {
	                return {
	                    restrict: 'A',
                        scope:{
                            eventFn:"=",
                            viewState:"=",
                            eventNameSpace:"="
                        },
	                    link: function (scope, element, attr) {
                                if(scope.viewState == null){
                                    scope.viewState = STATE.leave;
                                }
                                if(scope.eventNameSpace == null){
                                    scope.eventNameSpace = "windowState" + randNum();
                                }
                                scope.eventFn[name] = $parse(attr['window' + name]);

	                            $window.on("screenChange." + scope.eventNameSpace, function (event, screenPosition) {
	                                var elementPosition = getPosition(element);

	                                var oldState = scope.viewState;
	                                var newState = scope.viewState = getViewState(elementPosition, screenPosition);
	                                if (oldState != newState) {
	                                    switch (newState) {
	                                        case STATE.enter:
	                                            scope.$apply(function () {
	                                                scope.eventFn.Enter(scope, { $event: event });
	                                            });
	                                            break;
	                                        case STATE.leave:
	                                            scope.$apply(function () {
	                                                scope.eventFn.Leave(scope, { $event: event });
	                                            });
	                                            break;
	                                        default:
	                                            (oldState == STATE.enter) ? scope.$apply(function () {
	                                                scope.eventFn.Leaveing(scope, { $event: event });
	                                            }) : scope.$apply(function () {
	                                                scope.eventFn.Entering(scope, { $event: event });
	                                            });
	                                            scope.$apply(function () {
	                                                eventFn.Reveal(scope, { $event: event });
	                                            });
	                                            break;
	                                    }
	                                }
	                            })
	                            scope.$on('$destroy', function () {
	                                $window.off("." + scope.eventNameSpace);
	                            });
	                        };
	                    }
	                };
	            } ]);
	        };
	    })());
	});