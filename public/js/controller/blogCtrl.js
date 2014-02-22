define(['LazyRegister', 'model/blogModel', 'Check', 'Path'],
    function (LazyRegister, blogModel, Check, Path) {
        //컨트롤러 선언
        LazyRegister.controller('blogCtrl', ['$scope', '$element', '$location', '$routeParams',
          function ($scope, $element, $location, $routeParams) {
              //scope init
              $scope.categoryIndex = $routeParams.categoryIndex || 0; //현제 카테고리 index
              $scope.categorys = blogModel.categorys(); //category정보

              //values init
              var pageIndex = $location.path().split('/')[1] //현제 pageIndex.
                , category = $scope.categorys[$scope.categoryIndex] //현제 카테고리

              //css 설정
              require(['css!style/blog']);

              $scope.blogRoute = function (info) {
                  initCategory(info.params.categoryIndex);
                  info.path = Path.applyRoot('board', category.board + '.html');
              }

              $scope.indexChange = function (value) {
                  var newPath = '/' + pageIndex + '/' + value;
                  if ($location.path() === newPath) {
                      return;
                  }
                  $location.path(newPath);
                  if (!!!$scope.$$phase && !!!$scope.$root.$$phase) {
                      $scope.$apply()
                  }
              };

              function initCategory(index) {
                  var index = index || 0;
                  if (index === $scope.categoryIndex) {
                      return;
                  }
                  $scope.categoryIndex = index;
                  category = $scope.categorys[index];
                  if (!!!$scope.$$phase && !!!$scope.$root.$$phase) {
                      $scope.$apply()
                  }
              }
          }]);
    });