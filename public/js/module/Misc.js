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

    function toObject(arr) {
        Check.map(["Array", arr]);
        var convertObject = {}
        Loop.each(arr, function (val) {
            convertObject[val] = val;
        })
        return convertObject;
    }

    return {
        namespace: namespace,
        defaultObjectInit: defaultObjectInit,
        toObject: toObject
    };
});