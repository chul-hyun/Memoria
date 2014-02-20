define(['module/Misc', 'module/Check', 'module/Err', 'require'], function (Misc, Check, Err, req) {
  var Roots = {
    controller: 'controllers',
    directive: 'directives',
    filter: 'services',
    template: '../views',
    lazyInclude: '../views/particles',
    board: '../views/particles/boards',
    style: 'styles',
    baseUrl: req.toUrl('')
  }
  function getFullPath(rootKey, paths) {
    if (!Roots.hasOwnProperty(rootKey)) {
      throw new Err.ParameterError.make(rootKey + '는 Roots의 데이터 목록에 존재하지 않는 key 입니다.');
    }
    Check.map(['Array', 'Object', 'String', paths]);

    var root = Roots[rootKey];

    if (Check.isUndefined(root)) {
      return paths;
    }

    return Misc.applyRoot(root, paths);
  }
  function getRoot(rootKey) {
    return Roots[rootKey];
  }
  return {
    getFullPath: getFullPath,
    getRoot: getRoot
  }
});