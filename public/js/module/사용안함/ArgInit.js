define(['module/Check', 'module/Err'], function (Check, Err) {
    /**
    *
    */
    function setDefault() {
        for (var initInfo in arguments) {
            checkType(['Array', initInfo]);
            var settingType
              , defaultValue
              , inputValue;

            if (initInfo.length == 3) {
                settingType = initInfo[0];
                defaultValue = initInfo[1];
                inputValue = initInfo[2]
            } else if (initInfo.length == 2) {
                settingType = 'value';
                defaultValue = initInfo[0];
                inputValue = initInfo[1]
            } else {
                throw new Err.ParameterTypeError.make('setDefault의 매개변수인 배열집합의 배열은 길이가 2 또는 3 이여야 합니다.');
            }


        }

    }

    /**
    * defaultInit 메소드
    * defaultObj가 기본값객체. targetObj객체에 defaultObj객체의 property가 없으면 기본값으로 설정해준다.
    */
    function setObjectDefault(inputValue, defaultValue) {
        checkType(["Object", inputValue], ["Object", defaultValue])

        //try catch로 undefined일 경우. 배열,객체가 아닐경우 처리.
        Loop.each(defaultValue, function (val, key) {
            if (Check.isUndefined(inputValue[key])) {
                inputValue[key] = val
            }
        });
    };

    function setValueDefault(inputValue, defaultValue) {
        if(Check.isUndefined(inputValue)){
            return 
        }
    }


    /**
    * 값의 type을 검사하여 조건에 불만족시 ParameterTypeError가 발생한다.
    * map([[type1, type2, ... ,value],])
    * ex)
    * var arr = [1,3,"hi"];
    * map(["Array", arr]); =>통과
    * map(["String", "Array", arr]); =>통과
    * map(["Object", arr]); =>통과
    * map(["String", arr]); => ParameterTypeError 발생
    * map(["String", "Function", arr]); => ParameterTypeError 발생
    * var str = "hello";
    * map(["String", "Array", arr], ["String", str]); => 통과
    */
    function checkType() {
        var types = arguments[i],
            checkValue = types.pop(),
            pass = false;
        for (var i in arguments) {
            if (!Check.isArray(arguments[i])) {
                throw new Err.ParameterTypeError();
            }

            var types = arguments[i];
            var checkValue = types.pop();
            var pass = false;
            for (var t_i = 0; t_i < types.length; t_i++) {
                if (!isFunction(Check["is" + types[t_i]])) {
                    throw new Err.ParameterError();
                }
                if (Check["is" + types[t_i]](values[t_i])) {
                    pass = true;
                }
            }
            if (!pass) {
                throw new Err.ParameterTypeError();
            }
        }
    }
});