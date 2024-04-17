$(function () {
  SetThumbList();
  SetVisualSlider('posco','포스코');
  HandleInterviewsDepth3Click();
  setInterviewMainSlide();
  detailSlider();

});
function HandleSectionActive(showEl) {
  const $interviewsSection = $('.interviews section');
  $interviewsSection.removeClass("active");
    $(showEl).addClass("active");
}
// 썸네일 정보 면저 뿌리기
function SetThumbList() {
  const imgBaseUrl = "./static/img/interview/";
  const department = $(".depth3_wrap button.active").val();
  
  const $inputBox = $("#inter_thumb_list");
  const $inputBox2 = $("#inter_thumb_slider");
  let sliderLength = $('.interivew-top .swiper-slide').length + 1;
  

  const ListElement = (imgBaseUrl, imgNum, department) =>
    `<li class="thumb_item">
    <a href="#!">
      <figure>
        <img
          src="${imgBaseUrl}${department}_thumb_img${imgNum}.png"
          alt="${department} 직원"
        />
      </figure>
    </a>
  </li>`;


  const SlideElement = (imgBaseUrl, imgNum, department) =>
    `<div class="swiper-slide thumb_item">
    <a href="#!">
      <figure>
        <img
          src="${imgBaseUrl}${department}_thumb_img${imgNum}.png"
          alt="${department} 직원"
        />
      </figure>
    </a>
  </div>`;

  $inputBox.empty();
  $inputBox2.empty();

  
  if(department == "posco"){
    sliderLength = 18;
  }else{
    sliderLength = 2
  }

  
  for (let i = 1; i < sliderLength; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    $inputBox.append(ListElement(imgBaseUrl, i, department));
    $inputBox2.append(SlideElement(imgBaseUrl, i, department));

    $('.interivew-thumbs li:first-child').addClass('active');
  }
}

// 3depth btn
function HandleInterviewsDepth3Click() {
  $(".depth3_wrap button").on("click", function () {
    const department = $(this).val();
    const departmentText = $(this).text();
    const breadcrumbItem = $(".breadcrumb-item.active");

    const InterviewList_RemoveClass = $(".interivew-thumbs").removeClass(
      "posco poscofuturem poscointl poscoenc"
    );
    const InterviewList_BtnVal_AddClass = $(".interivew-thumbs").addClass(
      department
    );
    addRemove($(this));
    InterviewList_RemoveClass;
    InterviewList_BtnVal_AddClass;
    breadcrumbItem.text(departmentText);
    SetThumbList();
    SetVisualSlider(department, departmentText);
    SetDetailSlider(department);
    HandleSectionActive('.interview_main_sect');
 
  });
}
function setInterviewMainSlide() {
  var interivewThumbsSlider = new Swiper(".interivew-thumbs .swiper", {
    slidesPerView: "auto",
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
  });
  var interivewTop = new Swiper(".interivew-top .swiper", {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".interivew-top .swiper-button-next",
      prevEl: ".interivew-top .swiper-button-prev",
    },
    thumbs: {
      swiper: interivewThumbsSlider,
    },
  });

  interivewTop.on('slideChange', function () {
    let idx = this.realIndex;
    let target = $('.interivew-thumbs li');
    let department = $('.depth3_wrap button.active').val();
    $(target).eq(idx).addClass('active').siblings().removeClass('active');
     SetDetailSlider(department);

  });

  HandleThumbItem(interivewTop);
}
function HandleThumbItem(el){
  $("#inter_thumb_list .thumb_item").on("click", function () {
    const idx = $(this).index();
    el.slideTo(idx);
    addRemove($(this));
    setTimeout(() => {
      HandleSectionActive('.interview_main_sect')
    }, 200);
  });
}

function detailSlider(){
  var ineterview_detail_slider = new Swiper(".ineterview_detail_slider .swiper", {
    effect: 'fade',
    loop:true,

    allowTouchMove: false,
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".detail-button-next",
      prevEl: ".detail-button-prev",
    },
  });

}



function SetVisualSlider(department, departmentText) {
  const $InputBox = $("#interview-top-slider");
  const thumbListLength = $(".interivew-thumbs .swiper-slide").length + 1;
  const departmentVal = department;
  const departmentTextVal = departmentText;
  
  const ListElement = (departmentVal,num, departmentTextVal) =>
    `  <div class="swiper-slide">
    <div class="visual_box">
      <figure class="interview_visual">
        <img
          src="./static/img/interview/${departmentVal}${num}_img03.png"
          alt=""
        />
      </figure>
    </div>
    <div class="interviewer_text tac">
      <div class="people_info">
        <strong>배상후 대리</strong>
        <p> ${departmentTextVal} / 영업(바이오&케미컬)</p>
      </div>
      <button
        type="button"
        class="more_story"
        onclick="HandleSectionActive('.view_sect')"
      >
        <span>직무 이야기 보기</span>
      </button>
    </div>
  </div>
    `;
  //박스 비우기
  $InputBox.empty();

  // 더 많은 이야기 보기 내용 넣기
  for (let i = 1; i < thumbListLength; i++) {
    if(i < 10){
      i= '0'+i;
    }
    $InputBox.append(ListElement(departmentVal, i, departmentTextVal));
  
  }
  setInterviewMainSlide();
}

