$(function() {

  //从右到左动画
  function transformxy(el, pos) {
    el.animate({
      right: pos
    }, 200);
  }

  //点击 input 框 和点击 back
  var searchInput = $('#search-input'),
     searchDetail = $('#search-detail'),
       detailBack = $('#detail-back');

  searchInput.focus(function(){
    transformxy(searchDetail, 0);
  });
  detailBack.click(function() {
    transformxy(searchDetail, '-100%');
  });


  //点击城市 和 back
  var city = $('#city'),
      cityDetail = $('#city-detail'),
      cityBack = $('#city-back');
  city.click(function(){
    transformxy(cityDetail, 0);
  });
  cityBack.click(function() {
    transformxy(cityDetail, '-100%');
  });
  //热门推荐和搜索历史切换
  var searchHistory = $('.search-history'),
      historyList = $('.history-list'),
      hotCom = $('.hot-com'),
      comList = $('.com-list');
  searchHistory.click(function(){
    $(this).addClass('tab-active');
    hotCom.removeClass('tab-active');
    comList.css('display','none');
    historyList.css('display', 'block');
  });
  hotCom.click(function(){
    $(this).addClass('tab-active');
    searchHistory.removeClass('tab-active');
    comList.css('display', 'block');
    historyList.css('display', 'none');
  });
  var clearHistory = $('#clear-history');
  clearHistory.click(function(){
    var r = confirm('确定要清空搜索历史么？');
    if(r == true) {
      historyList.remove();
    } else {
      return false;
    }
  });

  // 点击综合筛选 和 返回
  var sortFilter = $('#sort-filter'),
      hotelFilter = $('#hotel-filter'),
      filterBack = $('#filter-back');
  sortFilter.click(function(){
    transformxy(hotelFilter, 0);
  });
  filterBack.click(function(){
    transformxy(hotelFilter, '-100%');
  });
  var indexLists = $('.index-list li'),
      checkboxes = $('.hotel-detail');
  indexLists.click(function() {
    var index = $(this).index();
    $(this).addClass('index-list-active').siblings().removeClass('index-list-active');
    checkboxes.css('display','none');
    $(checkboxes.get(index)).css('display','table-cell');
  });

  //点击推荐排序
  var sortOrder = $('#sort-order'),
      mark = $('#mask'),
      sortFormat = $('#sort-format'),
      sortCalcel = $('#sort-cancel'),
      sortOk = $('#sort-ok');
  sortOrder.click(function(){
    mark.show();
    sortFormat.slideDown('fast');
  });
  sortCalcel.click(function() {
    mark.hide();
    sortFormat.slideUp('fast');
  });
  sortOk.click(function(){
    mark.hide();
    sortFormat.slideUp('fast');
  });

  // 点击价格
  var priceFormat = $('#price-format'),
      sortLevel = $('#sort-level'),
      priceCancel = $('#price-cancel'),
      priceOk = $('#price-ok');
      $('#price-ok');
  sortLevel.click(function() {
    mark.show();
    priceFormat.slideDown('fast');
  });
  priceCancel.click(function() {
    mark.hide();
    priceFormat.slideUp('fast');
  });

  //ajax & mock
  $.mockjax({
    url: 'wangxingsun',
    responseTime: 1111,
    response: function(settings){
      console.log(settings.data.location , settings.data.pageNum);
      var obj = {};
      obj.picSrc = ["http://himg.qunarzz.com/imgs/201404/03/JhS1_t52qa9tW1xBJ76.jpg",
            "http://himg.qunarzz.com/imgs/201111/22/Z7SoxZ9jn3zEil4CZ76.jpg",
            "http://himg.qunarzz.com/imgs/201201/31/JhS1_t5GShP4zlsJJ76.jpg",
            "http://himg.qunarzz.com/imgs/201303/27/1879a01MqtRdskrj176.jpg"];
      obj.hotelName = ["我爱姚笛", "大雁塔没大雁", "如家是你家酒店", "韩剧挺好看"];
      obj.score = [2.1, 4.3, 5.0, 5.0];
      obj.address = ["挂甲屯疗养院", "雁塔区", "东海国际", "海淀区最帅"];
      obj.price = [1000, 213, 421, 253];
      this.responseText = obj;
    }
  });

  var pageNum = 1;
  var loader = $('#oLoader');
  var flag = true;
  $('#more').click(function(){
    if(!flag) {
      return false
    }
    flag = false;
    loader.show();
    $.ajax({
      url: 'wangxingsun',
      dataType: 'json',
      data: { location: 'more', pageNum: pageNum }
    }).done(function(data) {
      var picSrc = data.picSrc,
          hotelName = data.hotelName,
          score = data.score,
          address = data.address,
          price = data.price;
      var combine = function(pic, name, score, address, price) {
        return ['<li><img src=',
                 pic,
                 ' alt="hotel"><div class="details"><p class="details-name">',
                 name ,
                 '</p><p class="stars">一星酒店 <span>',
                 score ,
                 '分/ 13评论</span></p><p class="group">团</p><p class="location">',
                 address ,
                 '</p><p class="price"><span class="rmb">&yen;</span>',
                  price ,
                  '<span class="money-start">起</span></p></div><div class="lookfor"><span></span></div></li>'
               ].join("");
      };
      var arr = [];
      for(var i=0; i<picSrc.length; i++) {
        arr.push(combine(picSrc[i], hotelName[i], score[i], address[i], price[i]));
      }
      var html = arr.join("");
      $('#list').append(html);

      loader.hide();
      pageNum++
      flag = true;
    })
  });

  $(window).scroll(function() {
    var imgs = $('#list img'),
        scrollTop = $(window).scrollTop(),
        viewportHeight = $(window).height();
    var aHeight = scrollTop + viewportHeight;
    for(var i=0; i<imgs.length; i++) {
      var iImg = $(imgs.get(i));
      var iHeight = iImg.offset().top;
      if(iHeight < aHeight && iImg.hasClass('lazyload')) {
        var iSrc = iImg.data('src');
        iImg.attr('src',iSrc).removeClass('lazyload');
      }
    }
  });
  $(window).scroll();




    //关键词页面搜索列表加载
    $('#hotel-del-con').click(function(){
      $('#hotel-input').val('');
      $('#suggest').find('li').remove();
    })
    function throttle(fn, delay) {
      var timer = null;
      return function() {
        var me = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn.apply(me, args);
        }, delay);
      }
    }


    $.mockjax({
      url: 'wangxingsun1',
      responseTime: 555,
      response: function(settings){
        console.log(settings.data.searchValue);
        var obj = {};
        obj.list = [" 这是一个结果 ",
              " 这是一个结果 ",
              " 这是一个结果 ",
              " 这是一个结果 "];
        this.responseText = obj;
      }
    });

    function suggest(){
      var searchValue = $('#hotel-input').val();
      $.ajax({
        url: 'wangxingsun1',
        dataType: 'json',
        data: {searchValue: searchValue}
      }).done(function(data) {
        var combine = function(value) {
          return ['<li>',
                  searchValue,
                  value,
                  i,
                  '</li>'
                ].join('');
        };
        var arr = [];
        for(var i=0; i<data.list.length; i++) {
          arr.push(combine(data.list[i], i));
        }
        var html = arr.join('');
        $('#suggest').css('display','block')
                     .children()
                     .remove().end()
                     .append(html);
      })

    }

    $('#hotel-input').keyup(throttle(suggest,500));

    // 国内城市乱七八糟
    $('.area-cate').click(function() {
      $(this).siblings('dd').next().slideUp('fast').find('span').attr('class','arrow-up');
      $(this).next().slideToggle('fast').end().find('span').toggleClass('class','arrow-down');
    });





});