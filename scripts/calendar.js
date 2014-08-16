define(['jquery'], function($) {
  function Calendar() {
    this.oDate = new Date();
    this.cfg = {
      obj: {},
      year: this.oDate.getFullYear(),
      month: this.oDate.getMonth(),
      day: this.oDate.getDate(),
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
    // insertDay: function(weeks, dayNum) {
    //   var tmp = (weeks+6)%7
    //   for (var i = 0; i < dayNum; i++) {
    //     td[i + tmp].innerHTML = i + 1;
    //     if(i-3 == CFG.day) {
    //       td[i].className = 'red';
    //     }
    //   }
    // },
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
      // var nowDay = new Date().getDate();
      this.oDate.setFullYear(CFG.year);
      this.oDate.setMonth(CFG.month - 1);
      this.oDate.setDate(1);

      var tmp = (this.oDate.getDay()+6)%7
      for (var i = 0; i < dayNum; i++) {
        td[i + tmp].innerHTML = i + 1;
        td[i].className = '';
        var date = new Date();
        if(CFG.bBtn && $('.c span').get(0).innerHTML == date.getFullYear() && $('.c span').get(1).innerHTML == date.getMonth()+1) {
          if(i-tmp+1 == CFG.day) {
            td[i].className = 'red';
          }
        }
      }
      if(CFG.month == 1 && CFG.bBtn) {
        $('.l span').get(0).innerHTML = 12;
      } else if(CFG.month==12 && !CFG.bBtn) {
        $('.r span').get(0).innerHTML = 1;
      }
      this.showBtn();
    },
    showBtn: function() {
      var leftMonth = parseInt($('#nowTime span').get(0).innerHTML, 10),
          leftYear = parseInt($('#nowTime span').get(1).innerHTML, 10);
          //rightMonth = parseInt($('#nextTime span').get(0).innerHTML, 10),
          //rightYear = parseInt($('#nextTime span').get(1).innerHTML, 10);
      // this.showDate.bind(this);
      //   console.log(this)
      if(leftMonth==12) {
        leftYear -= 1;
      }
      $('.l').click(
          (function(elem) {
            return function(){
              elem.showDate({
                year: leftYear,
                month: elem.cfg.month -1
              });
            }
          })(this)

      )
      // $('.r').click(function() {
      //   (function(elem) {
      //     elem.showDate({

      //     })
      //   })(this)
      // })
    }
  }

  return {
    Calendar: Calendar
  }
})