define(['LazyRegister'], function (LazyRegister) {
  var title = '메모리아';

  var pageList = [{
    title: 'Home',
    path: 'home.html'
  }, {
    title: 'Blog',
    path: 'blog.html',
    paramPath: '/:categoryIndex?'
  }, {
    title: 'App',
    path: 'app.html'
  }, {
    title: 'OpenSource',
    path: 'openSource.html'
  }];

  return {
    title: title,
    pageList: pageList
  }
});