define(['jquery'], function($) {
  function getCFG() {
    this.cfg = {
      id: 'body',
      handler4CB: null
    }
  }

  getCFG.prototype = {
    constructor: getCFG,

    // getType: function(cfg) {
    //   debugger
    //   // var CFG = $.extend(this.cfg, cfg);
    //   $(cfg.id).delegate('span', 'click', function() {
    //     var type = $(this).data('event');
    //     if(type) {
    //       return type;
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    listen: function(cfg) {
      var CFG = $.extend(this.cfg, cfg);
      var obj = {};
      $(CFG.id).delegate('span', 'click', function() {
        var dataType = $(this).data('event');
        if(dataType == 'filterList') {
          var key = $(this).data('key');
          var type = $(this).data('ftype');
          obj[type] = key;
          CFG.handler4CB && CFG.handler4CB(obj);
        } else if( dataType == 'sortList') {
          var sortType = $(this).data('stype');
          var sort = $(this).data('sort');
          if(!sort) {
            $(this).parents('li').addClass('cur').siblings().removeClass('cur');
            obj.sort = sortType;
            obj['asc'] = true;
            CFG.handler4CB && CFG.handler4CB(obj);
          } else {

          }
          // console.log('@@@')
        } else {
          return false
        }
        // console.log('xxx')
      });
    }

    // listen: function(cfg) {
    //   var CFG = $.extend(this.cfg, cfg);
    //   var obj = {};
    //   var type = this.getType(CFG);
    //   console.log(type,12);

    //   if(type) {
    //     $(CFG.id).delegate('span', 'click', function() {
    //       var key = $(this).data('key');
    //       var type = $(this).data('ftype');
    //       obj[type] = key;
    //       CFG.handler4CB && CFG.handler4CB(obj);
    //     });
    //   }
    // }
  }


  return {
    getCFG: getCFG
  }
});
