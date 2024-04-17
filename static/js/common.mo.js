/* 제이쿼리 default */
$.fx.speeds._default = 200; // slideXX() duration
$.easing.easeInOutExpo = function (n, e, t, a, i) {
  return 0 == e ? t : e == i ? t + a : (e /= i / 2) < 1 ? (a / 2) * Math.pow(2, 10 * (e - 1)) + t : (a / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
};

$(function () {
  /* .tab-list, .progress-list 활성화 항목으로 스크롤 */
  tabInit();
});

/* GNB toggle for mobile */
function gnbToggle() {
  if (!$("#headline").hasClass("e00") && !$("body").hasClass("main")) $(document).scrollTop(0);
  $("body").toggleClass("gnb-opened");
  $("header .map").toggleClass("opened");
  var $gnb = $("#gnb");
  $gnb.toggleClass("opened");
  if ($gnb.hasClass("opened")) {
    $gnb.scrollTop(0).find(".active").removeClass("active").next().slideUp(0);
  }
}

/* 모달팝업 */
function openModal(url) {
  var $modalWrap = $("<div>", { class: "modal-wrap" }),
    $modalBox = $("<div>", { class: "modal-box" });
  $modalBox.load(url, function (response, status) {
    if (status == "success") {
      // 기팝업 닫기
      var $opened = $(".modal-wrap");
      $opened.each(function (i, el) {
        if (!$(el).children(".modal-box").hasClass("xxx")) {
          $(el).removeClass("opened");
          setTimeout(function () {
            $(el).remove();
          }, 300);
        }
      });

      var $close = $(this).find(".close");
      $close.bind("click", function (e) {
        $modalWrap.removeClass("opened");
        setTimeout(function () {
          $modalWrap.remove();
          if ($(".modal-wrap").length == 0) $("body").removeClass("modal-opened");
        }, 300);
      });

      if ($(this).children().hasClass("sitemap")) $(this).addClass("sitemap-box"); // 사이트맵

      $("body")
        .addClass("modal-opened")
        .append($modalWrap.append($(this)));
      setTimeout(function () {
        $modalWrap.addClass("opened");
      }, 10);
    }
  });
}

/* 비디오 viewer */
function showVideo(src) {
  var $viewerWrap = $("<div>", { class: "video-viewer-wrap" }),
    $videoBox = $("<div>", { class: "video-box" }),
    $iframe = $("<iframe>", { src: src, frameborder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowfullscreen: true }),
    $close = $("<button>", { class: "close", text: "닫기" });
  $close.bind("click", function (e) {
    $viewerWrap.remove();
    if ($(".modal-wrap").length == 0) $("body").removeClass("modal-opened");
  });
  $("body")
    .addClass("modal-opened")
    .append($viewerWrap.append($videoBox.append($iframe)).append($close));
}

/* 게시물 전체선택 */
function setChildChk(e, opt) {
  var state = e.target.checked;
  [].forEach.call(opt.items, function (el, i) {
    el.checked = state;
  });
  if (opt.items[0]) opt.items[0].onchange();
}
function setMotherChk(opt) {
  var state = true;
  for (var i = 0; i < opt.items.length; i++) {
    if (!opt.items[i].checked) {
      state = false;
      break;
    }
  }
  if (opt.mother) opt.mother[0].checked = state;
  if (opt.connectButtons) {
    var checkedItem = false;
    for (var i = 0; i < opt.items.length; i++) {
      if (opt.items[i].checked) {
        checkedItem = true;
        break;
      }
    }
    [].forEach.call(opt.connectButtons, function (el) {
      // el.disabled = !checkedItem;
      if (checkedItem) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }
  if (opt.counter) {
    var checked = opt.items.filter(function (i, el) {
      return el.checked;
    });
    opt.counter[0].innerText = checked.length;
  }
}

/* .tab-list */
function tabInit() {
  // 활성화 항목으로 스크롤
  var $activated = $(".tab-list > ul > .active, .tab-bar > ul > .active, .progress-list > ol > .current");
  $activated.each(function (i, el) {
    var $wrap = $(el).parent(),
      posX = $(el).offset().left,
      targetX = ($(window).width() - $(el).width()) / 2;
    $wrap.scrollLeft(posX > targetX ? posX - targetX : 0).css("visibility", "visible");
  });
}
