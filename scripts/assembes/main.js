require.config({
  paths: {
    jquery: 'jquery.1.8.3.min',
    jqueryUI: 'jquery-ui.min'
  }
});

require(['jquery', 'window'], function($, w) {
  $('#a').click(function() {
    var win = new w.Window();
    win.alert({
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
    }).on('alert', function() {
      alert('lian zhui yu fa');
    });

    win.on('alert', function() {
      alert('2th alert handler');
    });

    win.on('alert', function() {
      alert('3th alert handler');
    });

    win.on('close', function() {
      alert('2th close handler');
    });

    win.on('x', function() {
      alert('2th close handler@@@');
    });
  })

});