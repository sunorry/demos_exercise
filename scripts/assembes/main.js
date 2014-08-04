require.config({
  paths: {
    jquery: 'jquery.1.8.3.min'
  }
});
require(['jquery','window'], function($,w) {
  $('#a').click(function() {
    new w.Window().alert({
      title: 'xxx',
      content: 'welcome!',
      handler: function() {
        alert('oooo');
      },
      width: 300,
      height: 150,
      y: 50,
      text4AlertBtn: 'OK',
      hasCloseBtn: true
    });
  });
})