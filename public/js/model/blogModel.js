define([], function () {
  function categorys() {
    return [{
      title: 'Music',
      board: 'musicRoom'
    }, {
      title: 'ComputerScience',
      board: 'list'
    }, {
      title: 'Life',
      board: 'metro'
    }, {
      title: 'Guest',
      board: 'list'
    }]
  }

  return {
    categorys: categorys
  }
});