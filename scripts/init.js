var arr = [42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];


//将数组中的数据以 div 的形式添加到父容器中
function init(parent, arr) {
  parent.children().remove();
  for (var i = 0, len = arr.length; i < len; i++) {
    parent.append("<div class=" + i + "></div>");
  }
  var divs = $('#sort div');
  for (var i = 0, len = divs.length; i < len; i++) {
    $(divs.get(i)).css({
      'background': randomColor(),
      'height': arr[i] * 10 + 'px',
      'left': (10 + i * 30) + 'px'
    });
  }
}

// 排序，记录排序时 换的位置
var sortOrder = [];

function bubbleSort(arr) {
  var len = arr.length,
    temp = 0;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        sortOrder.push([j, j + 1]);
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

//换柱子使用div的class换，所以每次移动后也将class交换
var step = 0;
function move() {
  var len = sortOrder.length - 1;
  if (step > len) return;
  var a = sortOrder[step][0],
      b = sortOrder[step][1];

  var x = $('.' + a),
    y = $('.' + b);

  $.when(x.animate({
    left: 10 + 30 * b
  }, 300, function() {
    x.attr('class', b);
  }), y.animate({
    left: 10 + 30 * a
  }, 300, function() {
    y.attr('class', a);
  })).done(function() {
    ++step;
    move();
  });
}



$(function() {
  var sort = $('#sort');
  init(sort, arr);
  bubbleSort(arr);
  move();
});

//随机颜色
function randomColor() {
  var value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  return '#' + value[Math.floor(Math.random() * 14)] + value[Math.floor(Math.random() * 14)] + value[Math.floor(Math.random() * 14)] + value[Math.floor(Math.random() * 14)] + value[Math.floor(Math.random() * 14)] + value[Math.floor(Math.random() * 14)];
}
