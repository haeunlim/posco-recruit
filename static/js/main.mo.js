
$(document).ready(function(){
    setTimeout(() => {
      $(".spot_main").addClass("animation_sect");
    }, 200);


  var tween_main_txt1 = new TimelineMax({ repeat: 0, repeatDelay: 0 });
  tween_main_txt1.wrap = $(".spot_main .m_txt");
tween_main_txt1.txt01 = tween_main_txt1.wrap.find(".ttl01");
    tween_main_txt1.txt02 = tween_main_txt1.wrap.find(".ttl02");
    tween_main_txt1.txt03 = tween_main_txt1.wrap.find(".ttl03");
  tween_main_txt1.staggerFrom(
    tween_main_txt1.txt01.find(".rows > .t"),
    0.7,
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
   0.7,
      {
      delay: 0.5,
      opacity: 0,
    },
    "-=0"
  );
  tween_main_txt1.to(
    tween_main_txt1.txt02,
    0.1,
    {
      opacity: 1,
    },
    "-=0"
  );

  tween_main_txt1.staggerFrom(
    tween_main_txt1.txt02.find(".rows.n1 > .t"),
    1.2,
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
    0.7,
    {
      y: "100%",
      ease: Power3.easeInOut,
    },
    0.1,
    "-=0.5"
  );

  tween_main_txt1.staggerFrom(
    tween_main_txt1.txt02.find(".rows.n3 > .t"),
    0.7,
    {
      y: "100%",
      ease: Power3.easeInOut,
    },
    0.1,
    "-=0.5"
  );

  tween_main_txt1.to(
    tween_main_txt1.txt02,
    0.7,
    {
    delay: 0.5,
    opacity: 0,
  },
  "-=0"
  );
  tween_main_txt1.to(
    tween_main_txt1.txt03,
    0.1,
    {
      opacity: 1,
    },
    "-=0.5"
  );
  tween_main_txt1.staggerFrom(
    tween_main_txt1.txt03.find(".rows > .t"),
    0.7,
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
    0.7,
    {
      delay: 1.4,
      opacity: 0,
    },
    "-=0.5"
  );
  // tween_main_txt1.pause();

  var visualSwiper = new Swiper(".main_intro_visual .swiper", {
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    dots: true,
    speed: 700,
    loop: true,
    virtualTranslate: true, autoplayDisableOnInteraction: true,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".spot_main .swiper-pagination",
      clickable: true,
    },
  });
  visualSwiper.on("slideChangeTransitionStart", function () {
    tween_main_txt1.restart();
  });

  $(".spot_main .swiper-pagination-bullet").on('click',function () {
    var idx = $(this).index() + 1;
    visualSwiper.slideTo(idx, 3500);
  });

  $(".spot_main .pause_btn").on("click", function () {
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
});

   