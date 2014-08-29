require.config({
  paths: {
    jquery: './libs/jquery.1.8.3.min',
    handlebars: 'libs/handlebars-v1.3.0',
    lplist: 'lplist'
  }
});

require(['jquery', 'handlebars', 'lplist', 'getCFG'], function($, hb, SL, GC) {

  //展现数据
  var SD = new SL.showList();
  SD.showData();

  // 点击重新加载数据
  new GC.getCFG().listen({
    id: '#filter_sort',
    handler4CB: SD.showData.bind(SD)
  });
  //滚动加载数据
  var pageNumFlge = true
  function scrollData() {
    var scrollTop = $(window).scrollTop();
    var sHeight = $('#ticketList li').last().offset().top - $(window).height() - scrollTop;
    if (sHeight < 100) {
      SD.scrollHandle();
      if(pageNumFlge) {
        pageNumFlge = false;
        getpage('itemNum');
      }
      // $('#pList').children().remove();
    }
    // getpage('itemNum');
    var goDiv = $('.goTo');
    if(scrollTop > 1000) {
      goDiv.css('display', 'block');
    } else {
      goDiv.css('display', 'none');
    }
  }



  $(window).scroll(throttle(scrollData, 100));

  function throttle(fn, delay) {
    var timer = null;
    return function() {
      var me = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.call(me, args);
      }, delay)
    }
  }

  // 点击 dom 操作
  $('#ticketList li').hover(function() {
    $(this).find('.hl').attr('visibility', '')
  });
  $('#ticketList').delegate('li', 'hover', function() {
    $(this).find('.hl').toggle()
  });

  // click more city
  $('.btn_morecity').click(function() {
    $(this).toggleClass('active');
    $('.more_city').toggle();
    $('#allCity div').css('display', 'none').first().css('display', 'block');
  });

  $('.city_nav span').click(function() {
    $('.c_py').html($(this).text());
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    var cDiv = $('#allCity div');
    cDiv.css('display', 'none');
    $(cDiv.get(index)).css('display', 'block');
  });

  // dom 上的的最高低价是不断在变
  var price = {
    minp: 0,
    maxp: 0
  };

  //拖动层
  $('.inner').mousedown(function(e) {
    var positionDiv = $(this).offset();
    var positionOutDiv = $('.outer').offset();
    var disX = e.pageX - positionDiv.left + positionOutDiv.left;
    var minp = parseInt($('#priceMin').text(), 10),
        maxp = parseInt($('#priceMax').text(), 10);
    if(price.minp != minp && price.maxp != maxp) {
      price.minp = minp;
      price.maxp = maxp;
    }
    var nowPrice = maxp;
    $(document).mousemove(function(e) {
      var x = e.pageX - disX;
      if (x < 0) {
        x = 0;
      } else if (x > $('.outer').width() - $('.inner').outerWidth(true)) {
        x = $('.outer').width() - $('.inner').outerWidth(true)
      }
      $('.inner').css({
        'left': x + 'px'
      });
      nowPrice = parseInt((((price.maxp - price.minp) / 280) * x + price.minp), 10);
      $('#maxp').html(nowPrice);
    });
    // 280 : outWidth - innerWidth

    $(document).mouseup(function() {
      $(document).off('mousemove');
      $(document).off('mouseup');

      SD.showData({
        page: 1,
        query: 'filter',
        maxp: nowPrice
      },true);

    });
  });

  var pFlag = true;
  function getpage(id) {
    var allListNum = parseInt($('#'+id).text(), 10);
    if(allListNum>400) {
      var pageNum = Math.ceil(allListNum/400);
      $('.ps').text('共'+ pageNum +'页').css('display','inline');
      $('#nextPage, #lastPage').css('display', 'inline');

      if(pFlag) {
        htmlpage(pageNum, 0);
        pFlag = false;
      }
      var index = 0
      $('.pagination #pList a').click(function() {
        var num = parseInt($(this).text(), 10);
        index = $(this).index();
        $('#pList').children().remove();
        var page = (num-1)*10 + 1;

        $('#ticketList').children().remove();
        if(index!=0) {
          $('#firstPage, #prevPage').css('display', 'inline');
        }
        if(index == pageNum-1) {
          $('#nextPage, #lastPage').css('display', 'none');
        }

        SD.showData({
          page: page,
          query: 'filter'
        });
        htmlpage(pageNum, index);
      });
    }
  }

  function htmlpage(pageNum, now) {
    var arr = [];
    for(var i=0; i<pageNum; i++) {
      arr.push('<a href="javascript:;">'+ (i+1) +'</a>');
    }
    arr[now] = '<em>'+ (now+1) +'</em>'
    var html = arr.join('')
    $('.pagination').css('display','block');
    $('#pList').append(html);
  }

  $('.goTo').click(function() {
    $(window).scrollTop(0);
  })

});
