  
  var IS_MOBILE = /mobile|android|bada|blackberry|blazer|ip(hone|od|ad)|windows (ce|phone)/i.test(navigator.userAgent||navigator.vendor||window.opera);
  
  var WINDOW_WIDTH   = window.innerWidth ? window.innerWidth : jQuery(window).width();

  var tabletW = 1180;
  
  /*!
   * imagesLoaded PACKAGED v4.1.4
   * JavaScript is all like "You images are done yet or what?"
   * MIT License
   */
  !function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
  
  
  var WINDOW_HEIGHT   = window.innerHeight ? window.innerHeight : jQuery(window).height();
  var SCROLL_TOP      = 0;
  var SCROLL_TOP_PREV   = 0;
  var SCROLL_DIRECTION  = "stop";
  
  
  var moSize = 840;
  var winW = window.innerWidth ? window.innerWidth : jQuery(window).width();
  var pcFlag = (winW > moSize) ? true : false;
  
  setTimeFlag = null;
  $(window).on("resize",function(){
      WINDOW_WIDTH   = window.innerWidth ? window.innerWidth : jQuery(window).width();
      clearInterval(setTimeFlag);
      setTimeFlag = setTimeout(function(){
        if(WINDOW_WIDTH > moSize){
          if(!pcFlag){
            //alert("pc");
            pcFlag = true;
            location.reload();
          } 
        }else{
          if(pcFlag){
            //alert("mobile");
            pcFlag = false;
            location.reload();
          } 
        }
      },300);
      
  });
  
  
  
  var myICheck = new Array();
  
  
  function  init(){
     //  jQuery(window).resize(function(event){dmpEventManager.resize(event);});
     // jQuery(document).scroll(function(evenent){dmpEventManager.scroll(event);});
  
     $(window).on("resize.moSwicth",function(){
  
          WINDOW_WIDTH   = window.innerWidth ? window.innerWidth : jQuery(window).width();
          clearInterval(setTimeFlag);
          setTimeFlag = setTimeout(function(){
            if(WINDOW_WIDTH > moSize){
              if(!pcFlag){
                //alert("pc");
                pcFlag = true;
                location.reload();
              } 
            }else{
              if(pcFlag){
                //alert("mobile");
                pcFlag = false;
                location.reload();
              } 
            }
          },300);
      });
  
  
     var upload_file_length = $('div.upload_file_wrap').length;
     
     if(upload_file_length > 0){
  
       $(document).on('click', 'a.btn_image_add', function (e){
         e.preventDefault();
           upload_file_length++;
         if (upload_file_length > 5) { 
             upload_file_length = 5;
             alert('�� �댁긽 異붽��� �� �놁뒿�덈떎.')
         } else { 
             $(this).parent().parent().append('<div class="upload_file_wrap" style="margin-top:5px; display:table;">\n<input type="file" name="file'+upload_file_length+'">\n</div>');
         }
       });
  
       $(document).on('click', 'a.btn_remove', function (e) {
           e.preventDefault();
           
           if(upload_file_length <= 1 ) {
               upload_file_length = 1;
               alert('�� �댁긽 ��젣�� �� �놁뒿�덈떎.');
           } else { 
               //$(this).parent().remove();
               $('input[name=file'+upload_file_length+']').parent().remove();
               upload_file_length--;
           }
       })
     }
  
     var check_length = $('.i-chk').length;
     
  
  
     if(check_length > 0){
        
  
  
        
  
          $(".i-chk").each(function(index){
            $(this).addClass('icheck_num_' + ( index) );
            var cls = $(this).attr("class").replace("i-chk ","");
  
            myICheck.push( $(this).iCheck({
              checkboxClass: 'icheckbox_square',
              radioClass: 'iradio_square',
           }));
  
  
         });
  
    }
  
     
  }
  $(function(){
      init();
  })
  // Modals
  var modalFn = {
      show : function(t, params){
          var defaults = {
              onStart : function(){},
              onLoad : function(){},
              onClose : "",
              btnCloseCl : 'modal_close',
              bgClose : true,
              bxId: "#modal_bx",
              bgId : '#modal_overlay',
              parent : false
          };
          params = params || {};
          for (var prop in defaults) {
              if (prop in params && typeof params[prop] === 'object') {
                  for (var subProp in defaults[prop]) {if (! (subProp in params[prop])) params[prop][subProp] = defaults[prop][subProp];}
              } else if (! (prop in params)) {params[prop] = defaults[prop];}
          };
          var _this = this;
          if(typeof t != 'object' && $(params.bxId).length === 0){
              var bx_id = params.bxId.substring(params.bxId.indexOf('#')+1, params.bxId.indexOf('.') === -1 ? params.bxId.length : params.bxId.indexOf('.'));
              var bx_class = params.bxId.replace("#"+bx_id,"").replace("."," ");
              $("body").append($("<section></section>").prop({id : bx_id}).addClass(bx_class));
          }
          if($(params.bgId).length === 0 && params.bgId != ""){
              var bg_id = params.bgId.substring(params.bgId.indexOf('#')+1, params.bgId.indexOf('.') === -1 ? params.bgId.length : params.bgId.indexOf('.'));
              var bg_class = params.bgId.replace("#"+bg_id,"").replace("."," ");
              $("body").append($("<div></div>").prop({id : bg_id}).addClass(bg_class));
          }
  
          var bg = $(params.bgId);
          $('body').css('overflow','hidden');
          bg.css('display','block');
          typeof t != 'object' ? ajax() : show();
          function ajax(){
                   $.ajax({
                  url : t,
                  type : "get",
                  dataType : "html",
                  data : params.data,
                  success : function(data){
                      if($(params.bxId).length === 0){
                          var bx_id = params.bxId.substring(params.bxId.indexOf('#')+1, params.bxId.indexOf('.') === -1 ? params.bxId.length : params.bxId.indexOf('.'));
                          var bx_class = params.bxId.replace("#"+bx_id,"").replace("."," ");
                          $("body").append($("<section></section>").prop({id : bx_id}).addClass(bx_class));
                      }
                      var bx = $(params.bxId);
                      bx.html(data);
                      t = bx.find(">*").eq(0);
                      show();
                  },
                  error : function(a,b,c){
                      alert(b);
                  }
              });
          }
          function show(){
              if(params.onLoad)params.onLoad();
              var posi = t.css('position');
              t.css('display','block');
              t.imagesLoaded(function(){
                  if($(".modal.on").length > 0) params.parent = $('#'+$(".modal.on").attr("id"));
                  bg.addClass('on');
                  if(params.bgClose){
                      bg.off('click').on('click',function(){close()});
                  }
                  $(window).on('resize', {tg : t}, modalFn.resize).resize();
                  if(params.parent){
                      params.parent.removeClass('on');
                  }
                  t.addClass('on');
                  t.find('.'+params.btnCloseCl).on('click',function(){close()});
              });
          }
          function close() {
              modalFn.hide(t,params.parent,params.bgId, params.onClose, params.mobileUI);
          }
      },
      hide : function(t, parent, bgId, onClose, mobileUI){
          var bg = bgId ? $(bgId): $("#modal_overlay");
          var bx = $("#modal_bx");
          onClose ? onClose() : "";
          if(!parent){
              bg.off('click');
              bg.removeClass('on');
              $('body').css('overflow','');
          }else{
              bg.off('click').on('click',function(){modalFn.hide(parent);});
              parent.addClass('on');
          }
          t.removeClass('on notrans');
          setTimeout(function(){
              if(!parent){
                  bg.remove();
                  bx.remove();
              }
              t.css('display','none');
              t.css({'max-height':'', "top":''});
          },500);
          $(window).off('resize', modalFn.resize);
          this.close = null;
      },
      resize : function(e){
          var t = e.data.tg ? e.data.tg : e;
          var posi = t.css('position');
          var vH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          var bxHeadH = t.find(".modal_header").length != 0 ? t.find(".modal_header").outerHeight() : 0;
          var bxFootH = t.find(".modal_footer").length != 0 ? t.find(".modal_footer").outerHeight() : 0;
          var bxCont = t.find(".modal_content");
          var scl = posi =='fixed' ? 0 : $(window).scrollTop();
          bxCont.css({"height": ""});
          var bxH = t.outerHeight();
          if(bxCont.outerHeight() > bxH-bxHeadH-bxFootH) bxCont.css({"height": (bxH-bxHeadH-bxFootH)+1});
          bxH = t.outerHeight();
          t.css({"top":( bxH > vH ? scl : (vH-bxH)/2+scl )+"px"});
      }
  };
  
  
  function siteLoading() {
     $('#site-loading').css('display', 'block');
      var sl = gsap.timeline().pause();
          sl.fromTo("#site-loading .first > .inner", {y: 160}, {duration: 1.75, y: 0, ease:Power3.easeIn}, '-=0.35');
          sl.fromTo("#site-loading .second > .inner", {y: -180}, {duration: 1.75, y: 0, ease:Power3.easeIn}, '-=1.75');
          sl.to("#site-loading .line", {duration: 0.75, x: -50+'%'}, '-=0.35');
          sl.to("#site-loading .line > .bar", {duration: 0.75, width: 100+'%'}, '-=0.75');
          sl.to("#site-loading .line", {duration: 0.5, alpha: 0}, '+=0.25');
          sl.to("#site-loading .first", {duration: 1, y: -100+'%', ease:Power3.easeIn});
          sl.to("#site-loading .first > .inner", {duration: 1, y: 100+'%', ease:Power3.easeIn}, '-=1');
          sl.to("#site-loading .second", {duration: 1, y: 100+'%', ease:Power3.easeIn}, '-=1');
          sl.to("#site-loading .second > .inner", {duration: 1, y: -100+'%', ease:Power3.easeIn}, '-=1');
          sl.set("#site-loading", {display: ''});
  
      sl.play();
  }
  
  
  
  
  function layer_video_popup(){
     var $win = $(window);
     var $html = $('html, body');
     var $wrap = $('#wrap');
     var winTop = 0;
     var $wrap_popup;
  
       this.open = function (title,url,type,func){
      
        
  
   if(func != ''){
     var callbacks = $.Callbacks();
     callbacks.add( func );
    }
  
    if(type == "mp4"){
      var $popup = '<div class="modal_section"><div class="inner"><div class="video"><video id="popupVidoTy1" playsinline loop controls><source src="'+url+'" type="video/mp4"></video></div><p class="title">'+title+'</p><button class="close" onclick="layerVideoPopup.close(); return false;"><i class="icon-cross2"></i></button></div></div>';
  
      $("body").append($popup);
    }else if(type == "youtube"){
      var $popup_ytb = '<div class="modal_section"><div class="inner"><div class="video"><div id="popupVidoTy1"><iframe style="opacity:0"  src="https://www.youtube.com/embed/'+url+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div><p class="title">'+title+'</p><button class="close" onclick="layerVideoPopup.close(); return false;"><i class="icon-cross2"></i></button></div></div>';
      $("body").append($popup_ytb);
    }  
        
        
        
  
        var $wrap_popup = $(".modal_section");
        
  
          var tween_open = new TimelineMax();
          var $this = $(this);
  
          TweenMax.set($wrap, {"margin-top":"0"});
            TweenMax.set($wrap_popup, {
                "top":"100%",
             });
            tween_open.to($wrap, 1.5, { ease: Expo.easeInOut, "margin-top":"-50vh"}, "start");  
            tween_open.to($wrap_popup, 1.5, { ease: Expo.easeInOut, "top":"0", onComplete: videoStart}, "start");  
  
            function videoStart(){
              if(type == "mp4"){
                var vid = document.getElementById("popupVidoTy1");
                vid.play(); 
              }else if(type == "youtube"){
                var t = new Plyr("#popupVidoTy1");
                t.on("ready", function(e){
                    t.play()
                });
              }
            }
         // $wrap.stop().animate({ "margin-top":"-50vh"}, 2000, 'easeOutBounce'); 
         // $wrap_popup.stop().animate({ "height":"100vh"}, 2000, 2000, 'easeOutBounce',function(){
         //   vid.play(); 
         // });
  
       };//open
       this.close = function (){
        //var $id = $(id);
         var tween_close = new TimelineMax();
         var $wrap_popup = $(".modal_section");
         TweenMax.set($wrap, {"margin-top":"50vh"});
         TweenMax.set($wrap_popup, {
          "top":"0%",
          
         });
         tween_close.to($wrap, 1.5, { ease: Expo.easeInOut, "margin-top":"0"}, "start");  
         tween_close.to($wrap_popup, 1.5, { ease: Expo.easeInOut, "top":"-100%", onComplete: motionOncomplete}, "start");  
  
  
         function motionOncomplete(){
          TweenMax.set($wrap, {"margin-top":"0"});
           $wrap_popup.remove();
         }
       };//close
  
  
  }//layerPopup
  
  
  window.layerVideoPopup  = new layer_video_popup();
  
  
  
  function tab(o,s){
    $obj  = $(o);
  
    $obj.each(function(){
  
      var $this = $(this);
      var $total = $this.find("li").length;
      var $first = s-1;
      var $prev = $first;
      var tab_id = new Array();
      var $btn = $this.find("li");
      var $start = $btn.eq($first);
  
      for( var i=0; i<$total; i++){
        tab_id[i] = $btn.eq(i).find("a").attr("href");
        $(tab_id[i]).css("display","none");
        $(tab_id[$first]).css("display","block");
      }
  
      $start.addClass("on");
      $btn.find("a").bind("click",function(e){
          e.preventDefault();
      })
     $btn.bind("click",function(e){
  
      var $this = $(this);
      var $index = $(this).index();
  
  
      if(!$this.hasClass("link")){
            if(!$this.hasClass("on")){
             $btn.each(function(){
              $(this).removeClass("on");
             });
             $this.addClass("on");
             $(tab_id[$prev]).css("display","none");
             $(tab_id[$index]).css({"display":"block","opacity":0}).stop().animate({"opacity":1},500);
             $prev = $index;
          }
          $this.trigger("resize");
          window.dispatchEvent(new Event('resize'));
          //$.fn.matchHeight._update();
  
          return false;
  
      }
  
  
  
  
  
  
  
  
  
     });
  
  
    });//each
  }//tab
  
  // Side Menu
  function sMenu() {
    if(!$('body').hasClass('open_menu')){
  
      if(!IS_MOBILE){
        $('#site-nav .menu_container .depth1 > ul > li.small').hasClass('active') ? $('#site-nav .head_container .close').addClass('black') : $('#site-nav .head_container .close').removeClass('black');
        $('#site-nav .menu_container .depth1 > ul > li > a').off('mouseover').on('mouseover', function(e) {
  
          $(this).closest('li').siblings().removeClass('active').end().addClass('active');
          $(this).closest('li').hasClass('small') ? $('#site-nav .head_container .close').addClass('black') : $('#site-nav .head_container .close').removeClass('black');
        });
  
        $('#site-nav .menu_container .depth1 > ul > li > a').off('focus').on('focus', function(e) {
          $(this).closest('li').siblings().removeClass('active').end().addClass('active');
          $(this).closest('li').hasClass('small') ? $('#site-nav .head_container .close').addClass('black') : $('#site-nav .head_container .close').removeClass('black');
        });
      }else{
        $('#site-nav .menu_container .depth1 > ul > li > a').on('click', function(e) {
          //e.preventDefault();
          $(this).closest('li').siblings().removeClass('active').end().addClass('active');
        });
      }
  
      $('body').addClass('open_menu');
  
    }else{
  
      if(!IS_MOBILE){
        $('#site-nav .menu_container .depth1 > ul > li > a').off('mouseover');
      }else{
        $('#site-nav .menu_container .depth1 > ul > li > a').off('click');
      }
      
      $('body').removeClass('open_menu');
      $('#site-nav .menu_btn').focus();
  
    }
  
    
  }
  
  
  var showLazyMotion = function(){
    var arrApp, appLen, _this = this;
  
    this.init = function(){
      arrApp = [];
      var appear = $("[data-lazy='parent']");
      appLen = appear.length;
      if(!appLen) return;
      var i;
      for(i = 0 ; i < appLen ; i++){
          arrApp.push(appear.eq(i));
      }
  
      if(appLen){
          /*_this.lazy(scollSmooth.offset);
          scollSmooth.addListener((status) => {
            _this.lazy(status.offset);
          });*/
          _this.lazy();
          $(window).off('scroll', _this.lazy).on('scroll',_this.lazy);
      }
    };
  
    this.lazy = function(){
        var wT = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
            wW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            wH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            wB = wT + wH;
        var i, len = arrApp.length;
        for (i = 0; i < len ; i++) {
            var app = arrApp[i];
            var bxHead = Math.round(app.offset().top+100);
            var bxFoot = bxHead + app.outerHeight();
  
            if(wT < bxFoot && wB > bxHead){
                if(!app.hasClass('is-show')){
                    app.addClass('is-show');
  
                    if(app.find('.counter').length > 0) {
                      var _this = app.find('.counter');
                      var delay = ((_this.closest('[data-lazy-delay]').data('lazy-delay'))-1)*300;
                      _this.each(function() {
                        counterRun($(this));
                      });
                        
                    }
                }
            }
        }
    };
    this.init();
  }
  
  var imgParaMotion = function(){
    var arrApp, appLen, _this = this;
  
    this.init = function() {
      arrApp = [];
      var appear = $('.img_para');
      appLen = appear.length;
      if(!appLen) return;
      var i;
      for(i = 0 ; i < appLen ; i++){
        arrApp.push(appear.eq(i));
      }
  
      if(appLen){
        _this.para(scollSmooth.offset);
        scollSmooth.addListener((status) => {
          _this.para(status.offset);
        });
      }
    };
  
    this.para = function(offset){
      var wT = offset.y,
          wH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
          wB = wT + wH;
      var paraLen = arrApp.length, i;
      for(i = 0 ; i < paraLen ; i++){
        var paraBx = arrApp[i];
        var paraBxHead = Math.round(paraBx.offset().top+wT || 0);
        var paraH = paraBx.outerHeight();
        var paraBxFoot = paraBxHead + paraH;
        if(paraBx.hasClass("ani")){
          var flag = true;
        }else{
          var flag = true;
        }
  
        if(wT < paraBxFoot && wB > paraBxHead){
          var imgT = paraBx.offset().top+wT;
          var rate = ((paraBx.data('rate') || 0.5));
          var delta = paraBx.hasClass('front') ? Math.max(Math.min((wT+wH-imgT)/(wH+paraH),1),0) : Math.max(Math.min(1-(wT+wH-imgT)/(wH),1),-1);
          //if( paraBx.hasClass('front') )console.log(Math.max(Math.min((wT+wH-imgT)/(wH+paraH),1),0))
          var dist = -Math.floor(delta*paraH*rate);
          //console.log(imgT);
          paraBx.find(">*")[0].style['transform'] = 'translateY('+dist+'px)';
        }
      }
    };
  
    this.init();
  }
  
  function counterRun(t,d) {
    $({ Counter: 0 }).delay(d).animate({
      Counter: t.text()
    }, {
      duration: 2000,
      easing: 'swing',
      step: function() {
       t.text(Math.ceil(this.Counter));
      }
    });
  }
  
  
  function scrollTopBtn() {
      $('html, body').animate({scrollTop: 0}, 600);
  }
  var menuSetTime = null;
  var menuSetTime2 = null;
  
  $(function(){
      var ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var lazyMotion = new showLazyMotion();
  
  if(tabletW < ww){
      
  
          $("#site-header .menu > li").on("mouseenter mouseleave",function(e){
              
              ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
              if(tabletW < ww){
                  var $this = $(this);
                  if(e.type == "mouseenter"){
                      clearInterval(menuSetTime);
                      $this.addClass("hover").siblings(".hover").removeClass("hover").find(".hover").removeClass("hover");
                  }else{
                      menuSetTime = setTimeout(function(){
                          $this.removeClass("hover");
                      });
                  }
              }
          });
  
  
          // $("#site-header .menu > li").on("mouseenter mouseleave",function(e){
          //     var $this = $(this);
          //     if(e.type == "mouseenter"){
          //         clearInterval(menuSetTime);
          //         $this.addClass("hover").siblings(".hover").removeClass("hover").find(".hover").removeClass("hover");
          //     }else{
          //         menuSetTime = setTimeout(function(){
          //             $this.removeClass("hover");
          //         });
          //     }
          // });
  }
      // Main Menu
      /*$('#site-header .menu > li > a:not([target])').off('mouseover focus').on('mouseover focus', function(e) {
        $(this).closest('li').siblings().removeClass('on').end().addClass('on');
        $('#site-header').addClass('menuOn');
      });
  
      $('#site-header .menu > li').off('mouseleave').on('mouseleave', function(e) {
        $(this).removeClass('on');
      });
  
      $('#site-header .menu').off('mouseleave').on('mouseleave', function(e) {
        $('#site-header').removeClass('menuOn');
      });
  
      $('#site-header .menu > li > a[target]').on('mouseover focus', function(e) {
       $('#site-header').removeClass('menuOn');
      });
  
      $('#site-header .logo a').off('focus').on('focus', function(e) {
        $('#site-header .menu > li').removeClass('on');
        $('#site-header').removeClass('menuOn');
      });*/
  
  
      // Sub Menu
      $('#sub-menu > .inner > a').off('focus').on('click', function(e) {
          if($('#sub-menu').hasClass('on')) {
              $('#sub-menu').removeClass('on');
          }else{
              $('#sub-menu').addClass('on');
          }
      });
  
      // Footer
      $('#site-footer .top .select > button').on('click', function(e) {
        e.preventDefault();
        var url = $('#site-footer .top .select > select').val();
        if(url == "") return false;
        //window.open(url, '_blank');
  
        if (!IS_MOBILE) { 
          window.open(url, '_blank'); 
        } else { 
          window.location.href = url; 
        }
  
        $("#site-footer .top .select > select option:eq(0)").prop("selected", true);
      });
  
  });
  
  
  $(window).on('scroll', function(e) {
      var sT = $(window).scrollTop(),
          wH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
          sH_offset = 190;
          
      if(sT >= sH_offset){
        $('#site-header').addClass('scrollDown');
         $('#wrap').addClass('scrollDown');
      }else{
        $('#site-header').removeClass('scrollDown');
        $('#wrap').removeClass('scrollDown');
      }
  
  });
  
  
  function setCookie(name, value, expiredays) {
      var todayDate = new Date();
      todayDate.setDate( todayDate.getDate() + expiredays );
      document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
  }
  
  function getCookie(name) {
      var value = null;
      if(document.cookie){
          var array=document.cookie.split((escape(name)+'='));
          if(array.length >= 2){
              var arraySub=array[1].split(';');
              value=unescape(arraySub[0]);
          }
      }
      return value;
  }
  
  function widthAutoSize(obj){
    var $obj = $(obj);
    var width = 30;
  
    $obj.find("> .was_js").each(function(){
      var $this = $(this);
      width = width + $this.outerWidth(true);
    });
  
    $obj.css({ "width":width});
  }
  
  
  
  // function  dmpEventManager(){
  //     this.functions      = {};
  //     this.functions.resize = [];
  //     this.functions.scroll = [];
  
  //     this.addResize  = function(func){
  //           if( this.functions.resize.indexOf(func) == - 1){
  //               this.functions.resize.push(func);
  //           }
  //     };
  
  //     this.addScroll  = function(func){
  //       if ( this.functions.scroll.indexOf(func) == - 1){
  //         this.functions.scroll.push(func);
  //       }
  //     };
  
  //     this.resize   = function(event){
  //       WINDOW_HEIGHT = window.innerHeight ? window.innerHeight : jQuery(window).height();
  //       for ( var i in this.functions.resize ){
  //         this.functions.resize[i]();
  //       }
  //     };
  
  //     this.scroll   = function(event){
  //       var scrollTopPrev = SCROLL_TOP;
  //       var windowHeight  = WINDOW_HEIGHT;
  
  //       SCROLL_TOP_PREV   = SCROLL_TOP;
  //       SCROLL_TOP      = jQuery(document).scrollTop();
  //       SCROLL_DIRECTION  = SCROLL_TOP == scrollTopPrev ? "stop" : ( SCROLL_TOP > scrollTopPrev ? "bottom" : "top" );
  
  //       for ( var i in this.functions.scroll ){
  //         this.functions.scroll[i]();
  //       }
  //     };
  
  //   }//MaeilEventManager
  
  //   window.dmpEventManager   = new dmpEventManager();
  //   