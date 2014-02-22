define([], function () {
  var posts = [];
  for (var i = 0 ; i < 13 ; i++) {
    posts[i] = {
      cover: 'resource/image/music' + (i+1)+'.jpg'
    };
  }
  
  function getPosts(start, end) {
    return posts.slice(start, end);
  }
  return {
    getPosts: getPosts
  }
});