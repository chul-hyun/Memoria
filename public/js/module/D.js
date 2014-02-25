define([], function () {
    function isFunction(value) { return typeof value === 'function'; }
    function isObject(value) { return value != null && typeof value === 'object'; }
    var isArray = Array.isArray;
    var getParameter = (function () {
        var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        return function (func) {
            return func.toString().replace(STRIP_COMMENTS, '').match(FN_ARGS)[1].replace(/\s/g, "").split(',');
        }
    })();
    function oncePush(arr, name) {
        if (arr.indexOf(name) === -1) {
            arr.push(name);
        }
    }

    return function () {
        var values = {}
          , dependInfo = []
          , changeList = [];

        function set(name, value) {
            if (isObject(name)) {
                for (key in name) {
                    set(key, name[key]);
                }
                return;
            }

            if (values.hasOwnProperty(name)) {
                values[name] = value;
            }else if (isArray(value)) {
                var dependFunction = value.pop();
                setDependValues(name, dependFunction, value);
                values[name] = undefined;
            } else if (isFunction(value)) {
                var parameter = getParameter(value);
                setDependValues(name, value, parameter);
                values[name] = undefined;
            } else {
                values[name] = value;
            }
            oncePush(changeList, name);
        }

        function get(name, apply) {
            if (apply) {
                dependInfo[name].apply = false;
            } else {
                //initApply(name);
                initApply();
            }
            resetLimtLoop();
            initDependInfo(dependInfo[name]);
            return values[name];
        }

        function apply(scope) {
            scope = scope || {};
            initApply();
            for (key in dependInfo) {
                var info = dependInfo[key];
                resetLimtLoop();
                initDependInfo(info, scope);
            }
        }

        function initApply(name) {
            var info;
            for (var i = 0, len = changeList.length, changeValueName ; i < len ; i++) {
                changeValueName = changeList[i];
                if (name) {
                    if (!dependInfo.hasOwnProperty(name)) {
                        return;
                    }
                    info = dependInfo[name];
                    if (info.apply && info.parameter.indexOf(changeValueName) !== -1) {
                        info.apply = false;
                        return;
                    }
                } else {
                    for (key in dependInfo) {
                        info = dependInfo[key];
                        if (info.apply && info.parameter.indexOf(changeValueName) !== -1) {
                            info.apply = false;
                        }
                    }
                }
            }

            if (name) {
                return;
            }
            changeList = [];
        }

        var limtLoop;
        function resetLimtLoop() {
            limtLoop = 100;
        }
        function initDependInfo(info, scope) {
            limtLoop--;
            if (limtLoop <= 0) {
                throw Error('D모듈 오류: 종속의 형태가 루프형태입니다,(무한루프 발생)')
            }
            if (info && !info.apply) {
                var parameter = info.parameter;
                for (var i = 0, len = parameter.length, dependValue ; i < len ; i++) {
                    if (parameter[i] == info.name) {
                        continue;
                    }
                    dependValue = dependInfo[parameter[i]] || false;
                    if (dependValue && !dependValue.apply) {
                        initDependInfo(dependValue);
                    }
                }
                var args = [];
                for (var i = 0, len = parameter.length ; i < len ; i++) {
                    args[i] = values[parameter[i]];
                }
                values[info.name] = info.dependFunction.apply(scope, args);
                info.apply = true;
            }
        }


        function setDependValues(name, dependFunction, parameter) {
            dependInfo[name] = {
                dependFunction: dependFunction,
                parameter: parameter,
                apply: false,
                name: name
            };
        }

        return {
            set: set,
            get: get,
            apply: apply
        };
    }
});