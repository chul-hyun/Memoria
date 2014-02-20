define(['modulePiece/Check','module/ErrorModule'], function (Check, ErrorModule) {
    /**
    * Err.Base까지의 description을 '=>'으로 연결하여 출력하는 에러 출력용 함수.
    */
    function printLog(e) {
        //출력될 로그
        var log = "";

        //e값이 undefined이거나 description값이 존재하지 않거나 Err.error.Base또는 Object에 도달시 루프 종료.
        while (e && e.description && !(e.constructor == Err.error.Base || e.constructor == Object)) {
            log = " => " + e.description;
            e = e.base;
        }

        console.log(log);
    }
});