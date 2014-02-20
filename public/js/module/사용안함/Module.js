define(['module/BaseErrors', 'modulePiece/Check'], function (BaseErrors, Check) {

    var error = {
        PropertyOverlap: BaseErrors.ParameterError.make(function (methodName) {
            this.description = "모듈 결합오류(property 이름중복): '" + methodName + "' 가(이) 중복됩니다.";
        }),
        ModuleNunObject: BaseErrors.ParameterTypeError.make(function (module) {
            this.description = "모듈 결합은 객체형식만 가능합니다. 문제모듈: " + module;
        })
    }

    /**
    * 모듈 객체들의 결합에 사용됩니다.
    * 모듈 객체 안에 combinePrefixName 의 문자열값이 있다면 이 값이 그 모듈의 property이름 앞에 붙여집니다.
    * 객체형식의 모듈만 결합 가능합니다.
    * combine([module,]);
    * @return 각 모듈객체안의 속성들을 모두 복사한 새로운 객체
    */
    function combine() {
        var newModule = {}, //새롭게 만들어질 객체(리턴값)
            combineInfo = {}; // 결합 정보 저장 객체(본래속해있던 모듈의 이름, 본래의 메소드 이름등이 저장)(리턴값)

        //반복문에서 사용되는 임시변수들.    
        var module = {}, //결합중인 모듈.
            moduleIndex = 0, //결합중인 모듈 인덱스.
            newPropertyName = "", // 결합되는 새로운 property명.(접두사 + 본래의 메소드명)
            basePropertyName = "", // 결합되는 본래의 property명.
            methodPrefix = ""; //결합중인 모듈의 property명 접두사.

        for (moduleIndex in arguments) {
            module = arguments[moduleIndex];
            if (Check.isObject(module)) {
                //methodPrefix 설정
                if (module.combinePrefixName) {
                    methodPrefix = module.combinePrefixName;
                } else {
                    methodPrefix = "";
                }

                for (newPropertyName in module) {
                    //property명 관련 변수 설정.
                    basePropertyName = newPropertyName;
                    newPropertyName = methodPrefix + methodName;

                    //property명이 중복시 객체면 다시 combine을 시도하고 객체도 아니면 에러 발생.
                    if (combineInfo.hasOwnProperty(newPropertyName)) {
                        try{
                            newModule[newPropertyName] = combine(newModule[newPropertyName], module[basePropertyName]);
                        }catch(e){
                            throw new error.PropertyOverlap(newPropertyName);
                        }
                    }

                    //newModule, combineInfo 설정.
                    newModule[newPropertyName] = module[basePropertyName];
                    combineInfo[newPropertyName] = {
                        basePropertyName: basePropertyName, //본래의 property명
                        methodPrefix: methodPrefix //적용된 접두사
                    }
                }
            } else { //모듈이 객체가 아닐시 에러 발생.
                throw new error.ModuleNunObject(module);
            }
        }

        newModule.combineInfo = combineInfo;
        return newModule;
    }
    return {
        combine: combine,
        error: error
    }
});