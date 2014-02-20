define(['Check', 'Loop'], function (Check, Loop) {
    /**
    * namespace 메소드
    * baseObj를 기준으로 namespaceStr의 문자열에 따라 객체구조가 생성되며 마지막에 data값을 넣는 메소드.
    * ex)
    * var testObj1 = {};
    * var bbb = namespace(testObj1, "ns.aaa.bbb");
    * bbb.name = "pch";
    * testObj1 == {ns:{aaa:{bbb:"pch"}}}
    */
    function namespace(baseObj, ns) {
        Check.map(["Object", baseObj], ["String", "Array", ns]);


        if (Check.isString(ns)) {
            ns = ns.split(".");
        }
        var targetObj = baseObj;

        Loop.each(ns, function (val) {
            targetObj = targetObj[val] = targetObj[val] || {};
        });
        return targetObj;
    }
    /**
    * defaultObjectInit 메소드
    * defaultObj가 기본값객체. targetObj객체에 defaultObj객체의 property가 없으면 기본값으로 설정해준다.
    */
    function defaultObjectInit(targetObj, defaultObj) {
        Check.map(["Object", targetObj], ["Object", defaultObj])

        //try catch로 undefined일 경우. 배열,객체가 아닐경우 처리.
        Loop.each(defaultObj, function (val, key) {
            if (Check.isUndefined(targetObj[key])) {
                targetObj[key] = val
            }
        });
    };

    function applyRoot(root, paths) {
        Check.map(['String', root], ['Array', 'Object', 'String', paths]);

        if (root === '') {
            return paths;
        }

        if (Check.isString(paths)) {
            return [root, paths].join('/');
        }

        var resultPaths = [];
        Loop.each(paths, function (val) {
            resultPaths.push([root, val].join('/'));
        })

        return resultPaths;
    }

    function toObject(arr) {
        Check.map(["Array", arr]);
        var convertObject = {}
        Loop.each(arr, function (val) {
            convertObject[val] = val;
        })
        return convertObject;
    }

    var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
    var MOZ_HACK_REGEXP = /^moz([A-Z])/;

    /**
    * Converts snake_case to camelCase.
    * Also there is special case for Moz prefix starting with upper case letter.
    * @param name Name to normalize
    */
    function camelCase(name) {
        return name.
    replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).
    replace(MOZ_HACK_REGEXP, 'Moz$1');
    }
    function noCamelCase(name) {
        return name.match(/^(?:[^A-Z]+)|[A-Z](?:[^A-Z]*)+/g)
                    .join("-")
                    .toLowerCase();
    }

    return {
        namespace: namespace,
        defaultObjectInit: defaultObjectInit,
        applyRoot: applyRoot,
        toObject: toObject,
        camelCase: camelCase,
        noCamelCase: noCamelCase
    };
});