define(['jquery', 'jqueryUI'], function($, $UI) {
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
    }
  }


  Window.prototype = {
    constructor : Window,
    alert: function(cfg) {
      var CFG = $.extend(this.cfg, cfg);
      var boundingBox = $('<div class="window_boundingBox">' +
          '<div class="window_header">' + CFG.title + '</div>' +
          '<div class="window_body">' + CFG.content + '</div>' +
          '<div class="window_footer"><input class="window_alertBtn" type="button" value=' + CFG.text4AlertBtn + ' /></div>'
        + '</div>');
      boundingBox.appendTo("body");

      btn =boundingBox.find('.window_alertBtn');

      mask = null;
      if(CFG.hasMask) {
        mask = $('<div class="window_mask"></div>');
        mask.appendTo('body');
      }

      btn.click(function() {
        CFG.handler4AlertBtn && CFG.handler4AlertBtn();
        boundingBox.remove();
        mask && mask.remove();
      });

      boundingBox.css({
        width: this.cfg.width + 'px',
        height: this.cfg.height + 'px',
        left: (this.cfg.x || (window.innerWidth-this.cfg.width)/2) + 'px',
        top: (this.cfg.y || (window.innerHeight-this.cfg.height)/2) + 'px'
      });

      if(CFG.hasCloseBtn) {
        var closeBtn = $('<span class="window_closeBtn">X</span>')
        closeBtn.appendTo(boundingBox);
        closeBtn.click(function() {
          CFG.handler4CloseBtn && CFG.handler4CloseBtn();
          boundingBox.remove();
          mask && mask.remove();
        });
      }

      if(CFG.isDraggable) {
        boundingBox.draggable({handle: CFG.dragHandle});
      } else {
        boundingBox.draggable();
      }


    },

    confirm: function() {

    },

    prompt: function() {

    }
  };

  return {
    Window: Window
  }
})