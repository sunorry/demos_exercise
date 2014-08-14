define(['jquery'], function($) {
  function Calendar() {
    this.oDate = new Date();
    this.cfg = {
      obj: {},
      year: this.oDate.getFullYear(),
      month: this.oDate.getMonth(),
      bBtn: true,
      weeks: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    };
  }

  Calendar.prototype = {
    getMonthDays: function(year, month) {
      var date = new Date(year, month, 0);
      return date.getDate();
    },
    // alert: function() {
    //   console.log(this.cfg.year, this.getMonthDays(2014, 7))
    // }
    showDate: function(cfg) {
      var CFG = $.extend(this.cfg, cfg);
      var dayNum = this.getMonthDays(CFG.year, CFG.month);
      if(!CFG.obj.bBtn) {
        CFG.obj.title = $('<div class="title"></div>');
        CFG.obj.append(CFG.obj.title);
        var table = $('<table></table>');
        var thead = $('<thead></thead>');
        var tr = $('<tr></tr>')
        for(var i=0; i<7; i++) {
          var th = $('<th></th>');
          th.html(CFG.weeks[i]);
          if(i==5 || i==6) {
            th.addClass('red');
          }
          tr.append(th);
        }
        thead.append(tr);
        table.append(thead);

        CFG.obj.append(table);

        var tbody = $('<tbody></tbody>');
        for(var i=0; i<6; i++) {
          var tr = $('<tr></tr>');
          for(var j=0;j<7;j++) {
            var td = $('<td></td>');
            tr.append(td);
          }
          tbody.append(tr);
        }
        table.append(tbody);
        CFG.obj.bBtn = true;
      }
      CFG.obj.title.html((CFG.bBtn ? '<div class="l"><span>' + (CFG.month - 1) + '</span>月</div>' : '<div class="r"><span>' + (CFG.month + 1) + '</span>月</div>') + '<div class="c"><span>' + CFG.year + '</span>年<span>' + CFG.month + '</span>月</div>');
      var td = CFG.obj.find('td');
      for(var i=0; i<td.length; i++) {
        td[i].innerHTML = '';
      }
      this.oDate.setFullYear(CFG.year);
      this.oDate.setMonth(CFG.month - 1);
      this.oDate.setDate(1);
      switch (this.oDate.getDay()) {
        case 0:
          for (var i = 0; i < dayNum; i++) {
            td[i + 6].innerHTML = i + 1;
          }
          break;
        case 1:
          for (var i = 0; i < dayNum; i++) {
            td[i].innerHTML = i + 1;
          }
          break;
        case 2:
          for (var i = 0; i < dayNum; i++) {
            td[i + 1].innerHTML = i + 1;
          }
          break;
        case 3:
          for (var i = 0; i < dayNum; i++) {
            td[i + 2].innerHTML = i + 1;
          }
          break;
        case 4:
          for (var i = 0; i < dayNum; i++) {
            td[i + 3].innerHTML = i + 1;
          }
          break;
        case 5:
          for (var i = 0; i < dayNum; i++) {
            td[i + 4].innerHTML = i + 1;
          }
          break;
        case 6:
          for (var i = 0; i < dayNum; i++) {
            td[i + 5].innerHTML = i + 1;
          }
          break;
      }
       this.showBtn()
    },
    showBtn: function() {
      var leftMonth = parseInt($('.title span').get(0).innerHTML, 10),
          leftYear = parseInt($('.title span').get(1).innerHTML, 10);
      $('.l').click(

        (function(elem) {
          return function(){
            elem.showDate({
              year: elem.cfg.year,
              month: elem.cfg.month -1
            });
          }
        })(this)
        // this.showDate.bind(this);
      )
    }
  }

  return {
    Calendar: Calendar
  }
})