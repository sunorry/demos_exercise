define(['jquery'], function($) {
  function showList() {
    this.url = 'http://lp.flight.qunar.com/api/qdclowprice?callback=?';
    this.cfg = {
      page: 1,
      dWeek: 'W0',
      sort: 'S1',
      asc: true,
      dcity: '',
      acity: '',
      drange: 15,
      per: 40,
      perScrollPage: 10,
      minp: '',
      maxp: '',
      ddate: '',
      searchType: 'domestic',
      query: 'search',
      from: 'tejia_d',
      ex_track: '',
      dstep: ''
    };
    this.scrollUrl = '';
    this.flag = true;
  }

  showList.prototype = {
    constructor: showList,

    showData: function(cfg, drag) {
      var me = this;
      var CFG = $.extend(me.cfg, cfg);
      //所有的点击 page 都是 1，下拉是page +1，以此来做判断标准,防止点击更多城市时，此城市没数据，这时再点击其他城市会不发请求
      if (!me.flag && CFG.page != 1) {
        return false;
      }
      me.flag = true;
      console.log(CFG,'@@@')
      $.getJSON(this.url, CFG, function(datas) {
        // page=1 即是点击，这时是重新渲染数据,同上
        if (CFG.page == 1) {
          $('#ticketList').children().remove();
        }

        // 加载more city, only once，此时 query= search, 其他都是 filter
        if (CFG.query == 'search') {
          var list = datas.options.dcity_more;
          var html = "";
          for (var i = 0; i < list.length; i++) {
            var obj = {};
            obj.dataTitle = list[i].title;
            obj.cityList = list[i].list;
            var source = $('#tpl_morecity').html();
            var template = Handlebars.compile(source);
            html = template(obj);
            $('#allCity').append(html);
          }
          $('#allCity span').bind('click', function() {
            $('.more_city').css('display', 'none');
          });

        }

        // all tickets && minp, maxp
        var info = datas.data.info
        $('#itemNum').html(info.total);
        $('#minp').text(info.minp);
        $('#maxp').text(info.maxp);

        var obj = {};
        obj.ticketInfo = datas.data.list;
        //若无数据，设置成false，供上面请求数据之前的判断
        if (obj.ticketInfo.length == undefined) {
          me.flag = false;
        }
        for (var i = 0, len = obj.ticketInfo.length; i < len; i++) {
          //从日期得到星期
          var dd = obj.ticketInfo[i].dd;
          var date = new Date(dd);
          if (date.getDay() == 6) {
            obj.ticketInfo[i].weeks = "周六";
          }
          if (date.getDay() == 0) {
            obj.ticketInfo[i].weeks = "周日";
          }
          // list 中的 日期
          obj.ticketInfo[i].month = dd.split('-')[1];
          obj.ticketInfo[i].day = dd.split('-')[2];
        }

        var source = $('#tpl_content').html();
        var template = Handlebars.compile(source);
        var html = template(obj);
        $('#ticketList').append(html  );
        //默认都是周末，这里判断下，不是的remove掉，需优化
        $('.ptop').each(function() {
          if ($(this).html().trim() == "") {
            $(this).remove();
          }
        });

        if(!drag){
          $('.inner').css('left','280px');
          $('#priceMin').text(info.minp);
          $('#priceMax').text(info.maxp);
        }
      });
      //此参数是滚动记住请求的 url ，其实有没有无所谓
      this.scrollUrl = CFG;

    },
    scrollHandle: function() {
      if(this.cfg.page%10 == 0) return
      this.cfg.page++;
      this.showData(this.scrollUrl);
    }
  };

  return {
    showList: showList
  }
});
