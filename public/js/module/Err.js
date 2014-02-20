define(['Classer'], function (Classer) {
    var baseError = Classer(Error, {
        Init: function (name) {
            this.Instancer({ propName: name });
            this.Inheriter({
                make: baseError.make
            });
        },
        Statices: {
            /**
            * 현 에러함수(또는 객체)를 상속받는 사용자 정의 에러함수를 만든다.
            * @param err: (=함수): 반환될 에러 클래스. 상속처리후 반환된다.
            * @param err: (=문자열): 반환될 에러 클래스의 description. 클래스 생성후 만들어진 함수(클래스)가 반환된다.
            */
            make: function (err) {
                // classInfo 설정.
                var classInfo;
                //err이 함수일시 생성자 함수로 설정.
                if (typeof err === 'function') {
                    classInfo = {
                        Init: err
                    }
                } else {
                    //문자열일시 err클래스(함수) 클래스(함수) 생성.
                    if (typeof err === 'string') {
                        classInfo = {
                            Instances: { message: err }
                        }
                    } else if (typeof err === 'undefined') {
                        classInfo = {
                            Init: function (data) {
                                Instancer({ data: err });
                            }
                        }
                    } else {
                        classInfo = {
                            Instances: { data: err }
                        }
                    }
                }
                return Classer(this.prototype.constructor, classInfo);
            }
        }
    });

    var ParameterError = baseError.make('매개변수 입력 오류')
      , ParameterNumberError = ParameterError.make('매개변수 개수 오류')
      , ParameterTypeError = ParameterError.make('매개변수 형식 오류')
      , NotReadyError = baseError.make('함수 실행 준비가 안되었습니다.')
      , CashError = baseError.make('캐쉬 오류')
      , NoCashDataError = CashError.make('저장된 캐쉬가 없습니다. catch로 받고 이후 문장을 실행시켜 주세요.')
      , MismatchCashDataError = CashError.make('이전에 저장된 캐쉬와 값이 다릅니다.')
      , DeferError = baseError.make()

    return {
        baseError: baseError,
        ParameterError: ParameterError,
        ParameterNumberError: ParameterNumberError,
        ParameterTypeError: ParameterTypeError,
        NotReadyError: NotReadyError,
        CashError:CashError,
        NoCashDataError:NoCashDataError,
        MismatchCashDataError:MismatchCashDataError,
        DeferError:DeferError
    }
});