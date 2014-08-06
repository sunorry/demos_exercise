define(['jquery','jqueryUI'], function($,$UI) {
  function Window() {
    this.cfg = {
      width: 500,
      height:300,
      title: '系统消息',
      content: '',
      handler: null,
      text4AlertBtn : 'sunorry',
      hasCloseBtn: false,
      hasMask: true,
      isDraggable: true,
      dragHandle: null
    };
    this.handlers = {};
  }

  Window.prototype = {
    on: function(type, handler){
      if(typeof this.handlers[type] == 'undedined') {
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
    },
    fire: function(type, data) {
      if(this.handlers[type] instanceif Array) {
        var handlers = this.handlers[type];
        for(var i=0,len=handlers.length; i<len; i++) {
          hanlders[i](data);
        }
      }
    },
    alert: function(cfg) {
      var CFG = $.extend(this.cfg, cfg);
      var boundingBox = $('<div class="window_boundingBox"><div class="window_header">'+
          CFG.title + '</div> <div class="window_body">' +
          CFG.content + '</div> <div class="window_footer"><input type="button" value=' + CFG.text4AlertBtn +' /></div>'
        +'</div>');
      boundingBox.appendTo('body');


      var btn = boundingBox.find('.window_footer input');
      mask = null;
      that = this;
      if(CFG.hasMask) {
        mask = $('<div class="window_mask"></div>');
        mask.appendTo('body');
      }
      btn.click(function() {
        CFG.handler && CFG.handler(); //有此参数，就执行
        boundingBox.remove();
        mask && mask.remove();
        that.fire('alert');
      });
      boundingBox.css({
        width: CFG.width + 'px',
        height: CFG.height + 'px',
        left: (CFG.x || (window.innerWidth - CFG.width)/2) + 'px',
        top: (CFG.y || (window.innerHeight - CFG.height)/2) + 'px'
      });
      if(CFG.hasCloseBtn) {
        var closeBtn = $('<span class="window_closeBtn">X</span>');
        closeBtn.appendTo(boundingBox);
        closeBtn.click(function() {
          boundingBox.remove();
          mask && mask.remove();
          that.fire('close');
        })
      }
      if(CFG.isDraggable) {
        if(CFG.dragHandle) {
          boundingBox.draggable({handle: CFG.dragHandle})
        } else {
          boundingBox.draggable();
        }
      }
    },
    confirm: function() {},
    prompt: function() {}
  };
  return {
    Window: Window
  }
})