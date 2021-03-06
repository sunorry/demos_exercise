require.config({
  baseUrl : './scripts/calendar',
  paths: {
    jquery: 'libs/jquery.1.8.3.min'
  }
});

require(['jquery','calendar'], function($,c) {
  var oDate = new Date();
  $('#a').click(function() {
    new c.Calendar().showDate({
      obj: $('#nowTime'),
      year: oDate.getFullYear(),
      month: oDate.getMonth()+1
    });
    new c.Calendar().showDate({
      obj: $('#nextTime'),
      year: oDate.getFullYear(),
      month: oDate.getMonth()+2,
      bBtn: false
    });
  });
});

