$(function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh + "px");
  window.addEventListener("resize", function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  });

 $(window).on("load", function () {
 
    scrollAnimation();
    HandleTopBtn();
  });
  $(window).on("scroll", function () {
    headerAni();
    ScrollTopBtnShowHide();
  });
});


function scrollAnimation() {
  var aniDiv = document.querySelectorAll(".ani_el");
  var aniDivArry = new Array();
  $(".first_ani *.ani_el").addClass("move");
  Array.prototype.forEach.call(aniDiv, function (ele) {
    aniDivArry.push(ele);
  });

  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop(),
      windowH = ($(window).height() / 4) * 3.8;
    var scrollBottom =
      $(document).height() - $(window).height() - $(window).scrollTop();

    if (scrollBottom <= 0) {
      $(".ani_el").addClass("move");
    }
    // section animate
    for (var i = 0; i < aniDivArry.length; i++) {
      if ($(aniDivArry[i]).offset().top < scrollTop + windowH) {
        $(aniDivArry[i]).addClass("move");
        
        aniDivArry.splice(i, 1);
      }
    }
  });
}

function scrollTopBtn() {
  $("html, body").animate({ scrollTop: 0 }, 600);
}

// Gnb Menu
function gnbMenu() {
  const StateOpenGnb = $("html").hasClass("openGnb");
  if (!StateOpenGnb) {
    $("html").addClass("openGnb");
  } else {
    $("html").removeClass("openGnb");
  }
}
function ScrollTopBtnShowHide() {
  const scrollTop = $(window).scrollTop();
  let condition  = scrollTop < 50;
  let fH = $("#footer").outerHeight();
  let footerTop = $("#footer").offset().top;
  const $ScrollTopBtn = $(".btn_top_fix");
  
  var scrollBottom =
  $(document).height() - $(window).height() - $(window).scrollTop();

  if (condition) {
    $ScrollTopBtn.removeClass("show");
  } else {
    $ScrollTopBtn.addClass("show");
  }
  if (scrollBottom  == 0) {
    $(".btn_top_fix").css("bottom", fH);
    $(".btn_top_fix").css("transform", 'translateY(50%)');

   
    
  } else {
    $(".btn_top_fix").css("bottom", '2.5rem');
  }
}

function HandleTopBtn() {

  $(".btn_top_fix").on("click", function () {
      $("html, body").stop().animate({ scrollTop: 0 });
    $(this).removeClass("show");
  });
}

function headerAni() {
  let sH_offset = 15;
  const isSubPage=$("html").hasClass('subPage');
  const scrollTop = $(window).scrollTop();
  let condition = scrollTop < sH_offset;
 
  let headerDpeth2Height = $('#header .wrap_dep2').outerHeight();
  let headerHeight = $('#header').outerHeight();
  let depth2Scroll = scrollTop + headerDpeth2Height;

 
  if(isSubPage){
    sH_offset = 30;
  if (condition) {
    if ($("html").hasClass("openGnb") == false) {
      $("html").removeClass("scrollDown");
      $("#header").removeClass("scrollDown");

    }
  } else {
    $("html").addClass("scrollDown");
    $("#header").addClass("scrollDown");
  }

  
}else{
  // 로그인 페이지나, 서브페이지가 아닐때 
   if (condition) {
    if ($("html").hasClass("openGnb") == false) {
      $("html").removeClass("bg_white");
      $("#header").removeClass("bg_white");

    }
  } else {
    $("html").addClass("bg_white");
    $("#header").addClass("bg_white");
  }
}
}
