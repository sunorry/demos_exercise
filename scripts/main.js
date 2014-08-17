require.config({
  paths: {
    jquery: 'jquery.1.8.3.min',
    mockjax:'jquery.mockjax',
    lesson: 'lesson1'
  },
  shim: {
    'mockjax': {
      deps: ['jquery']
    }
  }
});

require(['jquery', 'mockjax', 'lesson', 'calendar'], function($,mo,l,c) {
   alert('日历组建制作失败，还想着能上月下月，花了大力气，结果现在自己被套进去了...');

  var oDate = new Date();

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

