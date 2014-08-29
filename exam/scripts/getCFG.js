define(['jquery'], function($) {
  function getCFG() {
    this.cfg = {
      id: 'body',
      handler4CB: null, // 回调函数，可有可无
    }
  }

  getCFG.prototype = {
    constructor: getCFG,

    listen: function(cfg) {
      var CFG = $.extend(this.cfg, cfg);
      var obj = {};
      obj.query = 'filter';
      $(CFG.id).delegate('span, input', 'click', function() {
        var dataType = $(this).data('event');
        if(dataType == 'filterList') {
          var type = $(this).data('ftype');
          var key = "";

          obj.minp = '';
          obj.maxp = '';

          //选择中午下午是的数据
          if(type == 'dstep') {
            var arr = [];
            $('#check_time input:checked').each(function() {
              arr.push($(this).data('key'));
            });
            //坑爹，原来 %2C 逗号
            key = arr.join(',');
          } else {
            key = $(this).data('key');
            this.className = 'nl';
            $(this).siblings().attr('class','ns')
          }
          obj[type] = key;
          obj.page = 1;
          //有回调则执行
          CFG.handler4CB && CFG.handler4CB(obj);
        } else if( dataType == 'sortList') {
          var sortType = $(this).data('stype');
          var curLi = $(this).parents('li');
          //判断一些列 up down（价格折扣等），主要是价格是默认up所以多了判断
          if(curLi.hasClass('cur') && $(this).hasClass('i_up')) {
            $(this).removeClass('i_up').addClass('i_down');
            obj['asc'] = false;
          } else if(curLi.hasClass('cur') && !$(this).hasClass('i_up')) {
            $(this).removeClass('i_down').addClass('i_up');
            obj['asc'] = true;
          } else {
            curLi.addClass('cur').siblings().removeClass('cur');
            obj['asc'] = true;
          }
          obj.page = 1;
          obj['sort'] = sortType;
          CFG.handler4CB && CFG.handler4CB(obj);

        } else {
          return false;
        }
      });
    }

  }

  return {
    getCFG: getCFG
  }
});
