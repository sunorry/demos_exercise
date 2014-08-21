require.config({
  paths: {
    jquery: './libs/jquery.1.8.3.min',
    handlebars: 'libs/handlebars-v1.3.0',
    lplist: 'lplist',
    getCFG: 'getCFG'

  }
});

require(['jquery', 'handlebars', 'lplist', 'getCFG'], function($, hb, SL, GC) {

  var SD = new SL.showList();
  SD.showData();

  new GC.getCFG().listen({
    id: '#filter_sort',
    handler4CB: SD.showData.bind(SD)
  });
});