$(function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", vh + "px");
  window.addEventListener("resize", function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  });

  $(window).on("scroll", function () {
    headerAni();
    ScrollTopBtnShowHide();
  });
});

// function scrollTopBtn() {
//   $("html, body").animate({ scrollTop: 0 }, 600);
// }



function ScrollTopBtnShowHide() {
  let condition;
  let fH = $("#footer").outerHeight();
  let ActiveFooter = $("#footer").hasClass("active");
  const $ScrollTopBtn = $(".btn_top_fix");
  const ActiveFirstSection = $("#section01").hasClass("active");
  const sT = $(window).scrollTop();
  const isFullPage = $("html").hasClass("fp-enabled");

  if (!isFullPage) {
    condition = sT < 50;
  } else {
    condition = ActiveFirstSection;
  }
  if (condition) {
    $ScrollTopBtn.removeClass("show");
  } else {
    $ScrollTopBtn.addClass("show");
  }

  if (ActiveFooter) {
    $(".btn_top_fix").css("bottom", fH - 31);
  } else {
    $(".btn_top_fix").css("bottom", 60);
  }
}

function headerAni() {
  let condition;
  let sH_offset = 100;
  const ActiveFirstSection = $("#section01").hasClass("active");
  const sT = $(window).scrollTop();
  const isFullPage = $("html").hasClass("fp-enabled");
  const isSubPage=$("html").hasClass('subPage');
  if (!isFullPage) {
    condition = sT < sH_offset;
  } else {
    condition = ActiveFirstSection;
  }
  if(isSubPage || isFullPage){
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
