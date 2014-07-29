$(function() {


  //从右到左动画
  function transformxy(el, pos) {
    el.animate({
      right: pos
    }, 200)
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
  })


});