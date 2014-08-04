var oContainer = $('#container');
var oLoader = $('#oLoader');
var iWidth = 200; //列宽
var iSpace = 10; //间隔宽
var iOuterWidth = iWidth + iSpace;
var iCells = 0;
var sUrl = 'http://www.wookmark.com/api/json/popular?callback=?';
var iPage = 0;
var iBtn = true;

var arrL = []; //存放 left 值
var arrT = [];
// 计算列数 innerWidth 可视区宽度
function setCells() {
  iCells = Math.floor($(window).innerWidth() / iOuterWidth);
  if (iCells < 3) {
    iCells = 3;
  }
  if (iCells > 6) {
    iCells = 6;
  }
  oContainer.css('width', iOuterWidth * iCells - iSpace);

}

setCells();

for (var i = 0; i < iCells; i++) {
  arrT.push(0);
  arrL.push(i * iOuterWidth);
}





function getData() {
  if (iBtn) {
    iBtn = false;
    oLoader.show();
    $.getJSON(sUrl, 'page=' + iPage, function(data) {
      $.each(data, function(index, obj) {

        var oImg = $('<img>');
        oImg.attr('src', obj.preview);
        oContainer.append(oImg);

        //算出高度，因为宽度确定，按比例缩小高度，这样下面的数组加的时候就直接写，也不会图片还没加载上，然后高度加不上
        var iHeight = iWidth / obj.width * obj.height;

        oImg.css({
          width: iWidth,
          height: iHeight
        })
        // arrT 最小值 的 index
        var iMinIndex = getMin();

        //定位
        oImg.css({
          left: arrL[iMinIndex],
          top: arrT[iMinIndex]
        });
        // console.log(arrT[iMinIndex])
        arrT[iMinIndex] += iHeight + 10;
        oLoader.hide();
        iBtn = true;
      });
    });
  }

}

getData()
$(window).on('scroll', function() {
  var iH = $(window).scrollTop() + $(window).innerHeight();
  var iMinIndex = getMin();
  if (arrT[iMinIndex] + oContainer.offset().top < iH) {
    iPage++;
    getData();
  }
});
$(window).on('resize', function() {
  var iOldCells = iCells;
  setCells();

  var iH = $(window).scrollTop() + $(window).innerHeight();
  var iMinIndex = getMin();
  if (arrT[iMinIndex] + oContainer.offset().top < iH) {
    iPage++;
    getData();
  }

  if (iOldCells == iCells) {
    return false;
  }
  arrT = [];
  arrL = [];
  for (var i = 0; i < iCells.length; i++) {
    arrT.push(0);
    arrL.push(i * iOuterWidth);
  }
  var aImgs = oContainer.find('img');
  aImg.each(function() {
    var iMinIndex = getMin();

    //定位
    $(this).animate({
      left: arrL[iMinIndex],
      top: arrT[iMinIndex]
    });

    arrT[iMinIndex] += $(this).height() + 10;

  });
})

function getMin() {
  var iv = arrT[0];
  var _index = 0;
  for (var i = 0; i < arrT.length; i++) {
    if (arrT[i] < iv) {
      iv = arrT[i];
      _index = i;
    }
  }
  return _index;
}
