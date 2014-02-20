define(['util/Check', 'util/Loop'], function (Check, Loop) {

    var CASH_TYPE = {
        REMOVE: 'remove'
    }

    function getParameterNames(fn) {
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var fnText = fn.toString().replace(STRIP_COMMENTS, '');
        var argDecl = fnText.match(FN_ARGS);

        return argDecl[1];
    }
    var getCashBox = function (checkArg, targetFunction) {
        var cashBox = [];

        var parameterNames = getParameterNames(targetFunction);
        Loop.each(checkArg, function (val, key) {
            var checkArgInfo = val.split(':');
            checkArg[key] = {
                argName: checkArgInfo[0],
                cashType: checkArgInfo[1] || 'remove',
                depth: checkArgInfo[2] || false
            }
        })
        Loop.nested(checkArg, parameterNames, function (values, keys) {
            if (values[0].argName == values[1]) {
                cashBox[values[0]] = {
                    cash: null,
                    index: keys[1],
                    cashType: values[0].cashType,
                    depth: values[0].depth
                };
            }
        })

        return cashBox;
    }

    function overlapRemove(cashObj, enterObj) {
        if (!(check.isArray(enterObj) && check.isObject(enterObj))) {
            console.log("오류발생");
            return;
        }
        Loop.each(enterObj, function (val, key) {
            if (cashObj.indexOf(val) != -1) {
                enterObj.splice(key, 1);
            }
        });
    }

    function Cash(checkArg, targetFunction) {
        if (!Check.isArray(checkArg) || !Check.isFunction(targetFunction)) {
            return;
        }

        var cashBox = getCashBox(checkArg, targetFunction);

        return function () {
            Loop.each(cashBox, function (val) {
                var enterValue = arguments[val.index];
                switch (val.cashType) {
                    case 'remove':
                        if (val.depth == 'depth') {
                            overlapRemove(val, enterValue);
                        }
                        break;
                }
            })
        }
    }


    return Cash;
});