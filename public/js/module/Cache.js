define(['Check', 'Loop', 'Misc', 'Err'], function (Check, Loop, Misc, Err) {
    //Cache모듈에 모든 캐쉬값은 이 cacheBox 객체에 담긴다.
    var cacheBox = {};


    /**
    * 입력된 데이터중 캐쉬에 중복된 데이터가 있을시 삭제하고 처리된 데이터를 반환한다.
    */
    var removeOverlap = (function () {
        var removeOverlapType = {
            'value': valueRemoveOverlap,
            'array': arrayRemoveOverlap,
            'object': objectRemoveOverlap
        };

        //캐쉬값과 같으면 undefined반환. 다르면 data반환
        function valueRemoveOverlap(cacheUtil, data) {
            if (data == cacheUtil.cacheData) {
                return undefined;
            }
            return data
        }

        //각각의 배열값을 비교하여 중복된 배열값이 존재하면 그 값만 삭제한다.
        function arrayRemoveOverlap(cacheUtil, data) {
            var dataLength = data.length
              , i = 0
              , checkIndex;

            while (i < dataLength) {
                checkIndex = cacheUtil.cacheData.indexOf(data[i]);

                //중복값이 존재시.
                if (checkIndex != -1) {
                    data.splice(i, 1);
                    dataLength = data.length;
                    //중복값이 없을시.
                } else {
                    cacheUtil.cacheData.push(data[i]);
                    i++;
                }
            }
            return data
        }

        //각각 같은 key의 property를 다시 removeOverlap함수에 넣는다.
        function objectRemoveOverlap(cacheUtil, data) {
            var pass = false
              , type = "";

            Loop.each(data, function (val, key) {
                if (val === cacheUtil.cacheData[key]) {
                    delete data[key];
                } else {
                    cacheUtil.cacheData[key] = val;
                }
            })
            return data
        }

        /**
        * cacheUtil을 얻는 함수.
        * 또한 입력된 데이터값이 undeined인경우 캐쉬설정이 필요없으로 false를 반환한다.
        * @return cacheUtil객체를 리턴한다 다음과 같은 property가 있다.
        * cacheUtil.setCache(data) : 캐쉬값을 설정할수 있다.
        * cacheUtil.cacheData : 저장중인 캐쉬값.
        */
        function getCacheUtil(NamespaceString) {
            Check.map(['String', NamespaceString]);

            var cacheBoxNS = NamespaceString.split(".")
          , cache = Misc.namespace(cacheBox, cacheBoxNS);

            function setCache(data) {
                cache.value = data;
            }
            function setCacheing(cacheing) {
                cache.cacheing = cacheing;
            }
            return {
                setCache: setCache,
                cacheData: cache.value,
                setCacheing: setCacheing,
                cacheing: cache.cacheing
            };
        }
        return function (cacheBoxNS, data, type) {
            Check.map(['String', cacheBoxNS]);

            //입력데이터값이 undefined라 더이상 캐쉬설정이 필요없다면 data를 반환한다.
            if (Check.isUndefined(data)) {
                return data;
            }

            //cacheUtil을 얻는다.
            var cacheUtil = getCacheUtil(cacheBoxNS);

            if (Check.isUndefined(cacheUtil.cacheing)) {
                if (Check.isUndefined(type)) {
                    type = 'value';
                }

                if (!removeOverlapType.hasOwnProperty(type)) {
                    throw new Err.ParameterError();
                }
                cacheUtil.setCacheing(removeOverlapType[type]);
            }

            //캐쉬값이 설정 안되있거나 입력데이터와 타입이 서로 다르면 캐쉬값을 설정후 data를 반환한다.
            if (Check.isUndefined(cacheUtil.cacheData) || typeof data !== typeof cacheUtil.cacheData) {
                cacheUtil.setCache(data);
                return data;
            }

            return cacheUtil.cacheing(cacheUtil, data);
        }
    })();

    function getData(cacheBoxNS, key) {
        Check.map(['String', cacheBoxNS]);

        var cache = Misc.namespace(cacheBox, cacheBoxNS);
        cache.keys = cache.keys || [];

        if (cache.keys.indexOf(key) == -1) {
            throw new Err.NoCacheDataError();
        }

        return cache.values[key];
    }

    function setData(cacheBoxNS, key, data) {
        Check.map(['String', cacheBoxNS]);

        var cache = Misc.namespace(cacheBox, cacheBoxNS);
        cache.values = cache.values || {};
        cache.values[key] = data;

        if (cache.values[key] !== deta) {
            cache.values[key] = deta;
            throw new Err.MismatchCacheDataError();
        }

        return data;
    }

    return {
        removeOverlap: removeOverlap,
        getData:getData,
        setData:setData
    }
});