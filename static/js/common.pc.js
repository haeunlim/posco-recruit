/* IE11 polyfill */
// cssVars(); // for CSS variables (colors) // 로컬환경을 지원하지 않아 사용보류

/* 제이쿼리 default */
$.fx.speeds._default = 200; // slideXX() duration
$.easing.easeInOutExpo = function (n, e, t, a, i) {
  return 0 == e ? t : e == i ? t + a : (e /= i / 2) < 1 ? (a / 2) * Math.pow(2, 10 * (e - 1)) + t : (a / 2) * (-Math.pow(2, -10 * --e) + 2) + t;
};

$(function () {
  /* IE11 polyfill */
  Stickyfill.add($(".apply header, #apply-title, #location, .tab-scroll")); // for position sticky

  /* 스크롤 이벤트 스로틀링 */
  var $location = $("#location"),
    $util = $(".util-bottom"),
    $applyTitle = $("#apply-title"),
    $applyButtons = $("body.apply .button-group-flag:eq(-1)"),
    $fadabled = $(".grow-intro i"),
    // $scrollTab = $(".tab-scroll[data-target-class]:eq(0)"),
    // $scrollTabButtons = $scrollTab.find("button"),
    // $scrollTabTargets = $("." + $scrollTab.attr("data-target-class")),
    // tabScrolling = false,
    scrollTimeout,
    buttonTimeout;
  // 스크롤 탭메뉴
  // $scrollTabButtons.bind("click", function () {
  //   tabScrolling = true;
  //   var idx = $(this).parent().index();
  //   $scrollTabButtons.eq(idx).parent().addClass("active").siblings().removeClass("active");
  //   $("html")
  //     .stop()
  //     .animate(
  //       {
  //         scrollTop: $scrollTabTargets.eq(idx).offset().top - 160,
  //       },
  //       1000,
  //       "easeInOutExpo",
  //       function () {
  //         tabScrolling = false;
  //       }
  //     );
  // });
  $(window).bind("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        var sTop = $(this).scrollTop();
        if ($applyTitle[0]) $applyTitle.toggleClass("fixed", sTop > 64);
        if ($util[0]) $util.toggleClass("show", sTop > 0);
        if ($location[0]) $location.toggleClass("fixed", sTop >= 224); // for sticky(width 100%)
        // 스크롤 탭메뉴(sticky)가 있는 경우, 사용자 스크롤 조작 시 현재 화면에 대한 탭 활성화
        // if ($scrollTab[0] && $scrollTabTargets.length) {
        //   $scrollTab.toggleClass("fixed", $scrollTab.offset().top - sTop <= 0); // for sticky(width 100%)
        //   var idx = $scrollTabTargets.filter(function () {
        //     return sTop - ($(this).offset().top - 160) > $(this).outerHeight() / 2 && $(this).offset().top + $(this).outerHeight() < sTop + $(window).outerHeight() / 2;
        //   }).length;
        //   if (!tabScrolling) $scrollTabButtons.eq(idx).parent().addClass("active").siblings().removeClass("active");
        // }
        // .button-group-flag fixed
        if ($applyButtons[0]) {
          $applyButtons.toggleClass("fixed", $(window).height() + $(window).scrollTop() - $(".apply .button-group-flag").offset().top < 0);
          // 스크롤 정지 시 .button-group-flag show
          clearTimeout(buttonTimeout);
          $applyButtons.removeClass("show");
          buttonTimeout = setTimeout(function () {
            $applyButtons.addClass("show");
          }, 1000);
        }
        // fadable content
        $fadabled.each(function (i) {
          if (!$(this).hasClass("active") && $(this).offset().top < $(window).scrollTop() + $(window).height()) {
            var obj = $(this),
              delay = i * 300;
              console.log(i);
            setTimeout(function () {
              obj.addClass("active");
            }, delay);
          }
        });
      }, 100);
    }
  });
  $(window).trigger("scroll");

  /* '.clear-able' hide */
  $("body").bind("mouseup", function (e) {
    $target = $(".clear-able:visible");
    $target.each(function (i, el) {
      if (!$.contains(el, e.target) && el != e.target) {
        // 토글버튼을 앞에 가진 경우는 트리거 실행
        if ($(el).is(".dropdown-list") && e.target != $(el).prev("button, a")[0]) {
          $(el).prev("button, a").trigger("click");
        } else {
        }
      }
    });
  });
  // let resizeTimeout; // for resize event throttling
  // window.addEventListener("resize", function () {
  //   if (!resizeTimeout) {
  //     resizeTimeout = setTimeout(function () {
  //       resizeTimeout = null;
  //       const mouseup = new MouseEvent("mouseup");
  //       document.body.dispatchEvent(mouseup);
  //     }, 100);
  //   }
  // });
  
  	//ENTER EVENT BLOCK
	$("input").keydown(function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		};
	});
	/*
	document.addEventListener('keydown', function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		};
	}, true);
	*/
});


/* 모달팝업 */
function openModal(url) {
  var $modalWrap = $("<div>", { class: "modal-wrap" });
  var $modalBox = $("<div>", { class: "modal-box" });
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
     
      if($('html').hasClass('fp-enabled')){
        $('body').on('scroll touchmove mousewheel', function(event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
          });
    }
      var $close = $(this).find(".close");
      $close.bind("click", function (e) {

        $modalWrap.removeClass("opened");
        setTimeout(function () {
          $modalWrap.remove();
          if ($(".modal-wrap").length == 0) $("body").removeClass("modal-opened");
        }, 300);

        
       
        if($('html').hasClass('fp-enabled')){
          $('body').off('scroll touchmove mousewheel');
      }
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

/* 첨부이미지 preview */
function setThumb(target, file) {
  var isImg = ["image/jpeg", "image/jpg", "image/png"].indexOf(file.type) > -1;
  if (isImg) {
    var src = URL.createObjectURL(file);
    $(target)
      .attr("src", src)
      .load(function () {
        URL.revokeObjectURL(src);
      })
      .show();
  }
}
