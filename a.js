function aa() {}

var a = function aa() {}
var a = function() {}

(function aa(){})
~function aa(){}
+!

~function func1() { alert('func1'); }();

if(true) {
  function func2(){
    alert(1);
  }
} else {
  function func2(){
    alert(2);
  }
}

func2();
// 在不同浏览器中结果不同


if(true) {
  var a = function func2(){
    alert(1);
  }
} else {
  var a =function func2(){
    alert(2);
  }
}

func2();
//so use 表达式


var b = function func3() {
  alert(1)
}

// b(); 没问题
// func3(); ie8以下没问题

// 但是在函数内部可以调用的

var b = function func3() {
  alert(1);
  alert(typeof aaa);
};
b();

// func3 在外边找不到,内部可以，多以不推荐写名字

(function func4(){ alert('func4') });

func4(); //报错


//闭包
// a 和 b 不会被垃圾回收机制收回
function func1(a) {
  var b = 5;

  function func2() {
    alert(a);
    alert(b);
  }
}

//垃圾回收

function func3() {
  var a = 1;
}
func3();

//垃圾回收

function func4() {
  var a = 5;
  function func5() {
    alert(a);
  }
  return func5;
}
var c = aaa();
c();

//全局变量的污染
var a = 1;
function func6() {
  a++;
  alert(a);
}
func6();
func6();

//携程局部变量
function func7() {
  var a = 1;
  a++;
  alert(a);
}
func7();
func7();

//即使局部，又可累加
function func8() {
  var a = 1;
  return function() {
    a++;
    alert(a);
  }
}

var b = func8();
b();

//另一种写法
var b = (function(){
  var a = 1;
  return function() {
    a++;
    alert(a);
  }
})();
b();
b();

//模块化代码
var b = (function(){
  var a = 1;
  function aaa() {
    a++;
    alert(a);
  }
  function bbb() {
    a++;
    alert(a)
  }

  return {
    fun1: aaa,
    fun2: bbb
  }
})();

b.func1();
b.func2();


//循环结束，click还没执行，点的时候 i 是 length

for(var i=0; i<length; i++) {
  aLi[i].onclick = function() {
    alert(i);
  };
}

//把循环中的 i 当参数传过去，外部结束，也不会影响内部引用

(function(i){
  aLi[i].onclick = function() {
    alert(i);
  };
})(i);

aLi[i].onclick = (function(i){
  return function() {
    alert(i)
  }
})(i)

ie8以下

var oDiv = getId('div'); // 获取 DOM 及诶
oDiv.onclick = function () {
  alert(oDiv.id)
}