$(document).ready(function () {
  $("#header").addClass("main");
});
$(function () {
  Main.init();

  // 첫번째 섹션 애니메이션
  $(window).on("load", function () {
    setTimeout(() => {
      $("#section01").addClass("animation_sect");
    }, 200);
  });
});

var Main = {
  init: function (e) {
    Main.mainVisualF();
    Main.aboutF();
    Main.fullpageF();
  },
  mainVisualF: function () {
    var controller = new ScrollMagic.Controller();
    var tween_main2 = new TimelineMax();

    new ScrollMagic.Scene({
      triggerElement: ".spot_main",
      //reverse:false,
      triggerHook: 0,
    })
      .on("enter", function (e) {
        tween_main_txt1.restart();
      })
      .on("leave", function (e) {})
      //.addIndicators() // add indicators (requires plugin)
      .setTween(tween_main2)
      .addTo(controller);

    var tween_main_txt1 = new TimelineMax({ repeat: 0, repeatDelay: 0 });
    tween_main_txt1.wrap = $(".spot_main .m_txt");
    tween_main_txt1.txt01 = tween_main_txt1.wrap.find(".ttl01");
    tween_main_txt1.txt02 = tween_main_txt1.wrap.find(".ttl02");
    tween_main_txt1.txt03 = tween_main_txt1.wrap.find(".ttl03");

    tween_main_txt1.staggerFrom(
      tween_main_txt1.txt01.find(".rows > .t"),
      1,
      {
        // delay:2,
        y: "100%",
        ease: Power3.easeInOut,
        delay: 0.3,
      },
      0.3,
      "start"
    );

    tween_main_txt1.to(
      tween_main_txt1.txt01,
      0.8,
      {
        delay: 0.8,
        opacity: 0,
      },
      "-=0"
    );
    tween_main_txt1.to(
      tween_main_txt1.txt02,
      0.3,
      {
        opacity: 1,
      },
      "-=0.5"
    );

    tween_main_txt1.staggerFrom(  
      tween_main_txt1.txt02.find(".rows.n1 > .t"),
      1,
      {
        opacity: 0,
        scale: 1.4,
        //x:40,
        ease: Power3.easeInOut,
      },
      0.3,
      "-=0.5"
    );

    tween_main_txt1.staggerFrom(
      tween_main_txt1.txt02.find(".rows.n2 > .t"),
      1,
      {
        y: "100%",
        ease: Power3.easeInOut,
      },
      0.3,
      "-=0.5"
    );

    tween_main_txt1.staggerFrom(
      tween_main_txt1.txt02.find(".rows.n3 > .t"),
      0.8,
      {
        y: "100%",
        ease: Power3.easeInOut,
      },
      0.3,
      "-=0.5"
    );

    tween_main_txt1.to(
      tween_main_txt1.txt02,
      0.8,
      {
        delay: 0.8,
        opacity: 0,
      },
      "-=0"
    );
    tween_main_txt1.to(
      tween_main_txt1.txt03,
      0.3,
      {
        opacity: 1,
      },
      "-=0.5"
    );
    tween_main_txt1.staggerFrom(
      tween_main_txt1.txt03.find(".rows > .t"),
      1,
      {
        // delay:2,
        y: "100%",
        ease: Power3.easeInOut,
        delay: 0.3,
      },
      0.3,
      "-=0.5"
    );

    tween_main_txt1.to(
      tween_main_txt1.txt03,
      0.8,
      {
        delay: 1.4,
        opacity: 0,
      },
      "-=0.5"
    );
    // tween_main_txt1.pause();

    var visualSwiper = new Swiper("#mainVisual", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 700,
      loop: true,

      autoplay: {
        delay: 10200,
        disableOnInteraction: false,
      },

      pagination: {
        el: "#section01 .swiper-pagination",
        clickable: true,
      },
      navigation: {
        prevEl: ".slide-control .prev",
        nextEl: ".slide-control .next",
      },
      on: {
        init: function () {
          const $nextNum = $(".slide-control .next").find(".num");
          const $prevNum = $(".slide-control .prev").find(".num");
          let realIndex = this.realIndex + 1;
          let length = $(".swiper-slide").length - 2;
          let next = realIndex + 1;
          $prevNum.text("0" + length);
          $nextNum.text("0" + next);

          // setTimeout(function () {
          //   $(window).resize();
          // }, 1000);
        },
      },
    });

    visualSwiper.on("slideChangeTransitionStart", function () {
      const $nextNum = $(".slide-control .next").find(".num");
      const $prevNum = $(".slide-control .prev").find(".num");
      let realIndex = this.realIndex + 1;
      let length = $(".swiper-slide").length - 2;
      let prev = realIndex - 1;
      let next = realIndex + 1;

      if (realIndex == 1) {
        $prevNum.text("0" + length);
      } else {
        $prevNum.text("0" + prev);
      }
      console.log(realIndex, length);
      if (realIndex == length) {
        $nextNum.text("01");
      } else {
        $nextNum.text("0" + next);
      }

      tween_main_txt1.restart();
    });

    $("#section01 .swiper-pagination-bullet").mouseenter(function () {
      var idx = $(this).index() + 1;
      visualSwiper.slideTo(idx, 3500);
    });

    $("#section01 .pause_btn").on("click", function () {
      if ($(this).hasClass("paused")) {
        visualSwiper.autoplay.start();
        visualSwiper.slideNext();
        $(this).removeClass("paused");
        tween_main_txt1.restart();
      } else {
        visualSwiper.autoplay.stop();
        $(this).addClass("paused");
      }
    });
  },
  aboutF: function () {
    $(".about_item.active").siblings().addClass("active-side");

    $(".about_item").on("mouseenter", function () {
      $(".about_item").removeClass("active active-side");
      $(this).addClass("active");
      $(".about_item.active").siblings().addClass("active-side");
    });
  },

  fullpageF: function () {
    var myFullpage = new fullpage("#fullpage", {
      sectionSelector: ".section",
      scrollBar: true,
      autoScrolling: true,
      scrollingSpeed: 400,
      menu: "#main_step",
      navigation: false,
      easingcss3: "cubic-bezier(0.790, 0.005, 0.390, 0.995)",
      licenseKey: "Q1L98-W78P9-KTSN6-27J6J-JFEWO",
      afterLoad: function (origin, destination, direction, trigger) {
        sectActiveAni();
      }
    });

    var flagMain;
    var setTimeMain;
    function mainResize() {
      clearInterval(setTimeMain);
      var ww =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      var wh =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      setTimeMain = setTimeout(function () {
        // console.log(flagMain);
        if (ww <= 1280) {
          if (!flagMain) {
            flagMain = true;
            fullpage_api.setAutoScrolling(false);
            fullpage_api.setFitToSection(false);
          }
        } else {
          if (flagMain) {
            flagMain = false;
            fullpage_api.setAutoScrolling(true);
            fullpage_api.setFitToSection(true);
            $("body").css("overflow", "hidden");
            fullpage_api.fitToSection();
          }
        } //if
      }, 600);
    }

    $(window).on("resize.main", mainResize);
    mainResize();

    function sectActiveAni() {
      let sOn = $(".section:not(.fp-auto-height, #section01)").hasClass(
        "active"
      );
      if (sOn) {
        $(".section.active").addClass("animation_sect");
      }
    }
  },
};
