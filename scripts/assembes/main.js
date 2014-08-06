require.config({
  paths: {
    jquery: 'jquery.1.8.3.min',
    jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'
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
      dragHandle: '.window_header',
      hasCloseBtn: true
    });
  });
})