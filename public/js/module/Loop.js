define(['Check'], function (Check) {
    /**
    * 배열이나 객체를 루프하는 함수.
    * 함수안에서의 this는 루프중인 obj이다.
    * false값 리턴시 반복을 중지한다.
    *
    * @param obj 순환할 객체나 배열
    * @param iterator 값과 키를 매개변수로 전달받는 반복자 함수.
    * @param context 반복자 함수의 context 설정. (생략가능)
    */
    function each(obj, iterator) {
        Check.map(['Object', obj], ['Function', iterator]);

        var key;
        if (Check.isArrayLike(obj)) {
            for (key = 0; key < obj.length; key++) {
                if (iterator.call(obj, obj[key], key) === false) {
                    return false;
                }
            }
        } else {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (iterator.call(obj, obj[key], key) === false) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**
    * 중첩루프문을 좀더 간결히 적을수 있게 도와주는 함수.
    *for(A객체){
    *   for(B객체){
    *       for(C객체){
    *           iterator(); //어떤 일.
    *       }
    *   }
    * }
    * 이런경우 이렇게 바꿔쓸수 있다.
    * nested(A객체, B객체, C객체 , iterator);
    *
    * nested(obj_1, obj_2, ... , obj_n , iterator)
    * @param obj_n 순환할 객체나 배열.
    * @param iterator 값배열과 키배열을 매개변수로 전달받는 반복자 함수. 배열의 순서는 순환객체(배열)의 순서와 같다.
    */
    function nested() {
        var objs = Array.prototype.slice.call(arguments, 0);

        var iterator = objs.pop();
        var stop = false;

        var values = [];
        var keys = [];
        var index = 0;

        nestLooping(objs[index]);

        function nestLooping(loopTargetObj) {
            if (Check.isUndefined(loopTargetObj)) {
                //stop 구현필요
                iterator(values, keys);
            } else {
                each(loopTargetObj, function (val, key) {
                    values[index] = val;
                    keys[index] = key;
                    index++;
                    nestLooping(objs[index]);
                    index--;
                })
            }
        }
    }

    /**
    * 각각의 객체(배열)에 같은 일을 하는경우 더 간결히 쓸수 있게 해주는 함수.
    * for(A객체){
    *   iterator();
    * }
    * for(A객체){
    *   iterator(); //위와 동일한 일
    * }
    * for(C객체){
    *   iterator(); //위와 동일한 일
    * }
    * 이럴때 이렇게 바꿔쓸수 있다.
    * muti(A객체, B객체, C객체 , iterator);
    *
    * muti(obj_1, obj_2, ... , obj_n , iterator)
    * @param obj_n 순환할 객체나 배열.
    * @param iterator 값과 키를 매개변수로 전달받는 반복자 함수.
    */
    function muti() {
        var args = Array.prototype.slice.call(arguments, 0);
        var iterator = args.pop();

        console.log(args);
        console.log(iterator);

        each(args, function (val) {
            console.log(val)
            return each(val, iterator);
        })
    }
    return {
        each: each,
        nested: nested,
        muti: muti
    }
});