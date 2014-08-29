define(['widget', 'jquery', 'jqueryUI'], function(widget,$, $UI) {
  function Window() {
    this.cfg = {
      width: 500,
      height: 300,
      title: 'wangxing.sun',
      content: '',
      hasCloseBtn: false,
      hasMask : true,
      text4AlertBtn: 'okey',
      isDraggable: true,
      dragHandle: null,
      handler4AlertBtn: null,
      handler4CloseBtn: null
    };
    // this.handlers = {};
  }


  Window.prototype = $.extend({}, new widget.Widget(), {
    constructor : Window,

    // on: function(type, handler) {
    //   if(typeof  this.handlers[type] == 'undefined') {
    //     this.handlers[type] = [];
    //   }
    //   this.handlers[type].push(handler);
    //   return this;
    // },

    // fire: function(type, args) {
    //   if(this.handlers[type] instanceof Array) {
    //     var handlers = this.handlers[type];
    //     for(var i=0,len=handlers.length; i<len; i++) {
    //       handlers[i](args);
    //     }
    //   }
    // },

    renderUI: function() {
      this.boundingBox = $('<div class="window_boundingBox">' +
          '<div class="window_header">' + this.cfg.title + '</div>' +
          '<div class="window_body">' + this.cfg.content + '</div>' +
          '<div class="window_footer"><input class="window_alertBtn" type="button" value=' + this.cfg.text4AlertBtn + ' /></div>'
        + '</div>');
      if(this.cfg.hasMask) {
        this._mask = $('<div class="window_mask"></div>');
        this._mask.appendTo('body');
      }

      if(this.cfg.hasCloseBtn) {
        this.boundingBox.append('<span class="window_closeBtn">');
      }
      this.boundingBox.appendTo(document.body);
    },

    bindUI: function() {
      var that = this;
      this.boundingBox.delegate('.window_alertBtn', 'click', function() {
        that.fire('alert');
        that.destory();
      }).delegate('.window_closeBtn', 'click', function() {
        that.fire('close');
        that.destory();
      });
      if(this.cfg.handler4AlertBtn) {
        this.on('alert', this.cfg.handler4AlertBtn);
      }

      if(this.cfg.handler4CloseBtn) {
        this.on('close', this.cfg.handler4CloseBtn);
      }
    },

    syncUI: function() {
      this.boundingBox.css({
        width: this.cfg.width + 'px',
        height: this.cfg.height + 'px',
        left: (this.cfg.x || (window.innerWidth-this.cfg.width)/2) + 'px',
        top: (this.cfg.y || (window.innerHeight-this.cfg.height)/2) + 'px'
      });
      if(this.cfg.isDraggable) {
        this.boundingBox.draggable({handle: this.cfg.dragHandle});
      } else {
        this.boundingBox.draggable();
      }
    },

    destructor: function() {
      this._mask && this._mask.remove();
    },

    alert: function(cfg) {
      $.extend(this.cfg, cfg);
      // var boundingBox = $('<div class="window_boundingBox">' +
      //     '<div class="window_header">' + CFG.title + '</div>' +
      //     '<div class="window_body">' + CFG.content + '</div>' +
      //     '<div class="window_footer"><input class="window_alertBtn" type="button" value=' + CFG.text4AlertBtn + ' /></div>'
      //   + '</div>');

      // btn =boundingBox.find('.window_alertBtn');

      // mask = null;
      // that = this;
      // if(CFG.hasMask) {
      //   mask = $('<div class="window_mask"></div>');
      //   mask.appendTo('body');
      // }
      // boundingBox.appendTo("body");

      // btn.click(function() {
      //   // CFG.handler4AlertBtn && CFG.handler4AlertBtn();
      //   boundingBox.remove();
      //   mask && mask.remove();
      //   that.fire('alert');
      // });

      // boundingBox.css({
      //   width: this.cfg.width + 'px',
      //   height: this.cfg.height + 'px',
      //   left: (this.cfg.x || (window.innerWidth-this.cfg.width)/2) + 'px',
      //   top: (this.cfg.y || (window.innerHeight-this.cfg.height)/2) + 'px'
      // });

      // if(CFG.hasCloseBtn) {
      //   var closeBtn = $('<span class="window_closeBtn">X</span>');
      //   closeBtn.appendTo(boundingBox);
      //   closeBtn.click(function() {
      //     // CFG.handler4CloseBtn && CFG.handler4CloseBtn();
      //     boundingBox.remove();
      //     mask && mask.remove();
      //     that.fire('close');
      //   });
      // }

      // if(CFG.handler4AlertBtn) {
      //   this.on('alert', CFG.handler4AlertBtn);
      // }

      // if(CFG.handler4CloseBtn) {
      //   this.on('close', CFG.handler4CloseBtn);
      // }

      // if(CFG.isDraggable) {
      //   boundingBox.draggable({handle: CFG.dragHandle});
      // } else {
      //   boundingBox.draggable();
      // }
      this.render();
      return this;
    },

    confirm: function() {

    },

    prompt: function() {

    }
  });

  return {
    Window: Window
  }
})