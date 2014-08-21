define(['jquery'], function($) {
  function showList() {
    this.url = 'http://lp.flight.qunar.com/api/qdclowprice?callback=?'
    this.cfg = {
      page: 1,
      dWeek: 'W0',
      sort: 'S1',
      asc: true,
      dcity: '',
      acity: '',
      drange: 7,
      pre: 40,
      perScrollPage: 10,
      ddate: '2014-08-21',
      searchType: 'domestic',
      query: 'filter',
      from: 'tejia_d',
      ex_track: ''

    }
  }

  showList.prototype = {
    constructor: showList,

    showData: function(cfg) {
      var CFG = $.extend(this.cfg, cfg);
      console.log(CFG , "==" ,this )
      $.getJSON(this.url, CFG, function(datas) {
        $('#ticketList').children().remove();
        $('#itemNum').html(datas.data.info.total);
        var obj = {};
        obj.ticketInfo = datas.data.list;

        for(var i=0, len=obj.ticketInfo.length; i<len; i++) {
          var dd = obj.ticketInfo[i].dd;
          var date = new Date(dd);
          if(date.getDay() == 6) {
            obj.ticketInfo[i].weeks = "周六";
          //   var weekend = $('<p class="ptop">周六</p>');
          //    $('.ticket_wrap').append(weekend);
          }
          if(date.getDay() == 0) {
            obj.ticketInfo[i].weeks = "周日";
          // var weekend = $('<p class="ptop">周日</p>');
          // console.log($('.ticket_wrap').html())
          // $('.ticket_wrap').append(weekend);

          }
          // weekend.appendTo('.ticket_wrap')

          obj.ticketInfo[i].month = dd.split('-')[1];
          obj.ticketInfo[i].day = dd.split('-')[2];
        }

        var source = $('#tpl').html();
        var template = Handlebars.compile(source);
        var html = template(obj);
        $('#ticketList').append(html);
        $('.ptop').each(function() {
          if($(this).html().trim() == "") {
            $(this).remove();
          }
        });
      });
    }

  };

  return {
    showList: showList
  }
});