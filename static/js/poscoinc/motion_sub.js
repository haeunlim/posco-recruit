
var controller = new ScrollMagic.Controller();

$(".txt_head1").each(function(){

  var tween_each = new TimelineMax({pause: true});
  var $this = $(this);

  tween_each.staggerFrom($this.find(" > p"), 0.6, {
    delay:0.2,
    opacity:0,
    y:60,
    ease: Expo.easeOut
  },0.2,"start");


  new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook:1,
    reverse:false,
  })
  //.addIndicators() // add indicators (requires plugin)
  .setTween(tween_each)
  .addTo(controller)
  .on("enter", function (e) {
    $this.addClass("on");
  })

});


$(".js_sm_box_top").each(function(){
  var tween_each = new TimelineMax({pause: true});
  var $this = $(this);

  tween_each.staggerFrom($this.find(".js_sm_box"), 0.6, {
    opacity:0,
    y:60,
    delay:0.2,
    ease: Expo.easeOut
  },0.2,"start");

  new ScrollMagic.Scene({
    triggerElement: this,
    reverse:false,
    triggerHook:0.8,
  })
  //.addIndicators() // add indicators (requires plugin)
  .setTween(tween_each)
  .addTo(controller);
});





$(".js_sm_box_top_solo").each(function(){
  var tween_each = new TimelineMax({pause: true});
  var $this = $(this);

    tween_each.from($this, 0.4, {
        opacity:0,
        y:60,
    }, "start");  

  new ScrollMagic.Scene({
    triggerElement: this,
    reverse:false,
    triggerHook:0.8,
  })
  //.addIndicators() // add indicators (requires plugin)
  .setTween(tween_each)
  .addTo(controller);
});





// 기업시민 타이틀 비쥬얼 애니메이션
     var tween_esg_p1 = new TimelineMax();

        tween_esg_p1.from(
          $(".t_beyound .qq1"),
          0.3,
          {
            opacity: 0,
            y: -30,
          },
          "start"
        );
        tween_esg_p1.from(
          $(".t_beyound .t1"),
          0.6,
          {
            opacity: 0,
            x: 30,
          },
          "-=0.0"
        );
        tween_esg_p1.from(
          $(".t_beyound .dot1"),
          0.3,
          {
            opacity: 0,
          },
          "-=0.0"
        );
        tween_esg_p1.from(
          $(".t_beyound .t2"),
          0.6,
          {
            opacity: 0,
            x: 30,
          },
          "-=0.0"
        );
        tween_esg_p1.from(
          $(".t_beyound .qq2"),
          0.3,
          {
            opacity: 0,
            y: -30,
          },
          "-=0.1"
        );

        new ScrollMagic.Scene({
          triggerElement: ".t_beyound",
          triggerHook: 0.8,
          reverse: false,
        })
          //.addIndicators() // add indicators (requires plugin)
          .setTween(tween_esg_p1)
          .addTo(controller);

        var tween_esg_sub0 = new TimelineMax();

        tween_esg_sub0.from(
          $(".wrap_esg1_1_2 .bg_line"),
          1.5,
          {
            width: 0,
            opacity: 0,
            x: -50,
          },
          "start"
        );

        new ScrollMagic.Scene({
          triggerElement: ".wrap_esg1_1_2",
          triggerHook: 0.8,
          reverse: false,
        })
          //.addIndicators() // add indicators (requires plugin)
          .setTween(tween_esg_sub0)
          .addTo(controller);

        var tween_esg_sub1 = new TimelineMax();

        tween_esg_sub1.from(
          $(".wrap_esg1_1_3 .lst-col.line"),
          0.3,
          {
            opacity: 0,
            y: 20,
          },
          "start"
        );

        tween_esg_sub1.staggerFrom(
          $(".wrap_esg1_1_3 .lst-col.line .item "),
          0.4,
          {
            height: 0,
            ease: Expo.easeOut,
          },
          0.2,
          "-=0.6"
        );

        tween_esg_sub1.staggerFrom(
          $(".wrap_esg1_1_3 .lst-col.line .item .circle"),
          0.6,
          {
            scale: 0,
            ease: Expo.easeOut,
          },
          0.1,
          "-=0.6"
        );

        tween_esg_sub1.staggerFrom(
          $(".wrap_esg1_1_3 .lst-col.cont .item "),
          0.4,
          {
            opacity: 0,
            y: 20,
            ease: Expo.easeOut,
          },
          0.1,
          "-=0.7"
        );

        new ScrollMagic.Scene({
          triggerElement: ".wrap_esg1_1_3",
          triggerHook: 0.8,
          reverse: false,
        })
          //.addIndicators() // add indicators (requires plugin)
          .setTween(tween_esg_sub1)
          .addTo(controller);