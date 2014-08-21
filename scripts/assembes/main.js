require.config({
  paths: {
    jquery: 'jquery.1.8.3.min',
    jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'
  }
});

require(['jquery', 'window'], function($, w) {

  $('#a').click(function() {
    new w.Window().alert({
      title: 'ops',
      content: 'welcome!',
      width: 300,
      height: 150,
      y: 50,
      hasCloseBtn: true,
      dragHandle: '.window_header',
      handler4AlertBtn: function() {
        alert('you click OK button');
      },
      handler4CloseBtn: function() {
        alert('you click the close button');
      }
    });
  })

});