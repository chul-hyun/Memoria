define(['Loop', 'Misc', 'Check', 'Path'], function (Loop, Misc, Check, Path) {
  /**
  * list객체 형식
  * controllers, directives, filters: 
  * [{
  *   name: ... ,
  *   path: ...
  * },{
  *   ...
  *   },...]
  */
  var list = {
    controllers: [],
    directives: [],
    filters: []
  }

  /**
  * list에 값을 추가하는 함수.
  * String(문자열)일시 path값으로 보고 처리하고
  * 객체일시 그대로 넣는다.
  *
  * @params pathInfo: 추가될 정보가 있는 객체
  * = {
  *    controllers: [],
  *    directives: [],
  *    filters: []
  *  } = list
  */
  function pushPathInfo(pathInfo) {
    Misc.defaultObjectInit(pathInfo, {
      controllers: [],
      directives: [],
      filters: []
    });
    Loop.muti(pathInfo.controllers, pathInfo.directives, pathInfo.filters, function (val, key) {
      var name = val.name | Path.fileName(val)
        , path = val.path | val;

      list[key].push({
        name: (key !== 'controllers') ? Misc.noCamelCase(name) : name,
        path: path
      })

    })
  }

  /**
  * list에서 값을 삭제하는 함수
  *
  * @params path: 삭제될 path값.
  */
  function removePathInfo(path) {
    Loop.each(pathInfo.controllers, pathInfo.directives, pathInfo.filters, function (val, index) {
      if (val.path == path) {
        this.splice(index, 1);
        return false;
      }
    })
  }

  /**
  * 입력된 문자열(.html문서)을 이용하여
  * 필요한 controller, directive, filter를 찾는다. 그리고 그 path값들이 있는 배열을 반환한다.
  *
  * @params domString : 분석할 html문서 (문자열)
  * @retrun           : 로드가 필요한 path값들이 있는 배열
  */
  function getNeedPaths(domString) {
    Check.map(['String', domString]);
    var needPaths = [];

    Loop.muti(list.controllers, list.directives, list.filters, function (val, key) {
      if (domString.indexOf(val.name) !== -1) {
        needPaths.push(val.path);
      }
    });

    return needPaths;
  }

  return {
    pushPathInfo: pushPathInfo,
    getNeedPaths: getNeedPaths,
    removePathInfo: removePathInfo
  }
});