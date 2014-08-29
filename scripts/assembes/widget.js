define(['jquery'], function($) {
  function Widget() {
    this.boundingBox = null; // 属性：最外层容器
  }

  Widget.prototype = {
    constructor: Widget,

    on: function(type, handler) {
      if(typeof this.handlers[type] == 'undefined') {
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
      return this;
    },

    fire: function(type, args) {
      if(this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type];
        for(var i=0,len=handlers.length; i<len; i++) {
          handlers[i](args);
        }
      }
    },

    // 接口：添加 dom 节点
    renderUI: function() {},

    // 接口：监听事件
    bindUI: function() {},

    //接口：初始化组件属性
    syncUI: function() {},

    //方法：渲染组件
    render: function(container) {
      this.renderUI();
      this.handlers = {};
      this.bindUI();
      this.syncUI();
      $(container || document.body).append(this.boundingBox);
    },
    //接口：销毁前的处理函数
    destructor: function() {},
    //方法：销毁组建
    destory: function() {
      this.destructor();
      this.boundingBox.off();
      this.boundingBox.remove();
    }


  }

  return {
    Widget: Widget
  }
});