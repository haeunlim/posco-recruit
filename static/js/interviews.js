$(function () {
  SetThumbList();
  SetDetailViewData("posco", '포스코');
  HandleThumbClick();
  HandleInterviewsDepth3Click();
  SetItemCurrentNum(".item_control_box", "#inter_thumb_list");
  SetItemCurrentNum(
    ".right_item.active .qna_control_box",
    ".right_item.active .qna_box"
  );
});

// 썸네일 정보 면저 뿌리기
function SetThumbList() {
  const imgBaseUrl = "./static/img/interview/";
  const department = $(".depth3_wrap button.active").val();
  let thumbLength;
  
  const ListElement = (url,a, imgNum, b) =>
    `<li>
    <a href="#!">
      <figure>
        <img
          src="${url}${a}_thumb_img${imgNum}.png"
          alt="${b} 직원"
        />
      </figure>
      <div class="hover_text_box">
              <strong>Professional</strong>
              <p>영업(바이오&케미컬)</p>
             </div>

    </a>
  </li>`;
  const ActiveFirst = () => {
    $("#inter_thumb_list li:first-child").addClass("active");
  };
  $("#inter_thumb_list").empty();
  
  if(department == "posco"){
    thumbLength = 18;
  }else{
    thumbLength = 2
  }

  for (let i = 1; i < thumbLength; i++) {
    if (i < 10) {
      i = "0" + i;
    }
    $("#inter_thumb_list").append(ListElement(imgBaseUrl,department, i));
  }
  ActiveFirst();
}

// 3depth btn 
function HandleInterviewsDepth3Click() {
  $(".depth3_wrap button").on("click", function () {
    const department = $(this).val();
    const departmentText = $(this).text();
    const Text = $(this).text();
    const breadcrumbItem = $(".breadcrumb-item.active");

    // const InterviewList_RemoveClass = $(".interview_thumb_list").removeClass(
    //   "posco poscofuturem poscointl poscoenc"
    // );
    // const InterviewList_BtnVal_AddClass = $(".interview_thumb_list").addClass(
    //   department
    // );
    $('#visual_list').removeClass('active');
    addRemove($(this));
    // InterviewList_RemoveClass;
    // InterviewList_BtnVal_AddClass;
    breadcrumbItem.text(Text);
    SetThumbList();
    SetDetailViewData(department, departmentText);
    HandleThumbClick();
    SetItemCurrentNum(".item_control_box", "#inter_thumb_list");
    SetItemCurrentNum(
      ".right_item.active .qna_control_box",
      ".right_item.active .qna_box"
    );
    StateDisabledBtn();
  });
}

// 더 많은 이야기 보기 누르면 나오는 데이터 갈아끼우기
function SetDetailViewData(department, departmentText) {
  const $InputBox = $("#visual_list");
  const $detailVisualBox = $("#more_interview_visual");
  const thumbListLength = $(".interview_thumb_list li").length + 1;
  const departmentVal = department;
  const departmentTextVal = departmentText;
 
  const ListElement = (departmentVal,num, departmentTextVal) =>
    ` <li class="right_item">
    <div class="visual_box">
      <figure class="interview_visual">
        <img src="./static/img/interview/${departmentVal}${num}_img03.png" alt="" />
      </figure>
      <div class="interviewer_text">
        <div class="sub-ttl-box">
          <strong class="top-txt">We are POSCO PEOPLE</strong>
          <h2 class="sub-ttl">
            공정하고 다양한 방식으로<br />
            인정받을 수 있는 곳<br />
            매일 매일 설레이는 곳
          </h2>
        </div>
        <div class="people_info">
          ${departmentTextVal} / 기획&amp;재무<br />김도학 대리
        </div>
        <button
          type="button"
          class="view_detail_btn"
          onclick="EventBindViewDetailBtn('open')"
        >
          <span>직무 이야기 보기</span>
          <span class="move_arrow"
            ><img src="./static/img/ico/ico_about_arrow.png" alt=""
          /></span>
        </button>
      </div>
    </div>
    <div class="more_box">
      <div class="more_interview_visual">
        <figure class="active_visual active">
          <img
            src="./static/img/interview/${departmentVal}${num}_img01.png"
            alt=""
          />
        </figure>
        <figure class="active_visual">
          <img
            src="./static/img/interview/${departmentVal}${num}_img02.png"
            alt=""
          />
        </figure>
        <figure class="active_visual">
          <img
            src="./static/img/interview/${departmentVal}${num}_img03.png"
            alt=""
          />
        </figure>
      </div>
      <div class="card">
        <div class="card-body">
          <ul class="qna_box">
            <li class="active">
              <div class="q">
                <h3>Q1. 어떤 업무를 담당하고 있나요?</h3>
              </div>
              <div class="a">
                <p>
                  원료 공정은 일관제철소의 첫번째 공정으로 제품을
                  생산하는 공정은 아니지만, 해외로부터 운송되어진
                  철광석, 석탄, 부원료를 선박에서 하역, 야드에 적치
                  및 관리하는 역할을 합니다.
                </p>
                <p>
                  그리고 후공정인 소결, 코크스, 고로공정에 원료를
                  조달합니다. 저는 원료 이송시 품질과 물류에 대한
                  조업 조건을 검토하고 기준을 정립하며,문제점 발생
                  시 근본 원인을 분석하고 개선하는 역할을 합니다.
                  또한, 공장에서 관리하는 주요 지표를 개선하기 위해
                  기술적인 검토도 병행합니다.공장에서 관리하는 주요 지표를 개선하기 위해
                  텍스트가 넘치면 ~ 스크롤이 생기게 텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게
                  텍스트가 넘치면 ~ 스크롤이 생기게 텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게텍스트가 넘치면 ~ 스크롤이 생기게
                </p>
              </div>
            </li>
            <li>
              <div class="q">
                <h3>Q2. 어떤 업무를 담당하고 있나요?</h3>
              </div>
              <div class="a">
                <p>
                  원료 공정은 일관제철소의 첫번째 공정으로 제품을
                  생산하는 공정은 아니지만, 해외로부터 운송되어진
                  철광석, 석탄, 부원료를 선박에서 하역, 야드에 적치
                  및 관리하는 역할을 합니다.
                </p>
                <p>
                  그리고 후공정인 소결, 코크스, 고로공정에 원료를
                  조달합니다. 저는 원료 이송시 품질과 물류에 대한
                  조업 조건을 검토하고 기준을 정립하며,문제점 발생
                  시 근본 원인을 분석하고 개선하는 역할을 합니다.
                  또한, 공장에서 관리하는 주요 지표를 개선하기 위해
                  기술적인 검토도 병행합니다.
                </p>
              </div>
            </li>
            
          </ul>

          <div class="control_box qna_control_box flex_b_c">
            <button
              type="button"
              class="prev" aria-label="이전 버튼"
              onclick="HandleChangeFocusQna('prev')"
            >
              <img
                src="./static/img/btn/common_prev.png"
                alt=""
              />
            </button>
            <div class="fraction flex__c">
              <div class="current_num">01</div>
              <strong>/</strong>
              <div class="total_num">03</div>
            </div>
            <button
              type="button"
              class="next" aria-label="다음 버튼"
              onclick="HandleChangeFocusQna('next')"
            >
              <img
                src="./static/img/btn/common_next.png"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
    `;

  function ActiveFirst() {
    $("#visual_list >li:first-child").addClass("active");
    $(".qna_box li:first-child").addClass("active");
    $(".active_visual:first-child").addClass("active");
  }
  //박스 비우기
  $InputBox.empty();
  $detailVisualBox.empty();

  // 더 많은 이야기 보기 내용 넣기
  for (let i = 1; i < thumbListLength; i++) {
    if(i < 10){
      i= '0'+i;
    }
    $InputBox.append(ListElement(departmentVal, i, departmentTextVal));
  }
  ActiveFirst();
}

// 더보기 클릭 이벤트
function EventBindViewDetailBtn(status) {
  const $MoveEl = $(".interviews .right"),
    $backBtn = $(".interview_back_btn"),
    $btnName = $(".btn_name"),
    $workName = $(".work_name"),
    Show = "block",
    Hide = "none";
  moreViewActiveInit();

  status == "open" ? rightActive() : rightUnActive();

  function rightActive() {
    $MoveEl.addClass("active");
    $backBtn.addClass("active");
    $btnName.css("display", Hide);
    $workName.css("display",Show);
  }
  function rightUnActive() {
    $MoveEl.removeClass("active");
    $backBtn.removeClass("active");
    $workName.css("display", Hide);
    $btnName.css("display",Show);
  }


  SetItemCurrentNum(
    ".right_item.active .qna_control_box",
    ".right_item.active .qna_box"
  );
}

function HandleThumbClick() {
  $("#inter_thumb_list li").on("click", function () {
    const idx = $(this).index();
    $(".right_item")
      .eq(idx)
      .addClass("active")
      .siblings()
      .removeClass("active");

    addRemove($(this));
    StateDisabledBtn();

    SetItemCurrentNum(".item_control_box", "#inter_thumb_list");
  });
}
// 아이템 다음 버튼 이벤트
function HandleChangeFocusItem(direction) {
  const $listBox = $("#inter_thumb_list");
  const NextTurn = (el) => el.removeClass("active").next().addClass("active");
  const PrevTurn = (el) => el.removeClass("active").prev().addClass("active");
 
  direction == "next"
    ? NextTurn($listBox.find("li.active"))
    : PrevTurn($listBox.find("li.active"));
    const activeVisualIdx = $("#inter_thumb_list li.active").index();
    $(".right_item")
    .eq(activeVisualIdx)
    .addClass("active")
    .siblings()
    .removeClass("active");
  StateDisabledBtn();
  SetItemCurrentNum(".item_control_box", "#inter_thumb_list");
  moreViewActiveInit();
  LeftScrollMove();
}

// 17번째 다음버튼으로 도달할시 스크롤 움직이게
function LeftScrollMove() {
  if ($("#inter_thumb_list li.active").index() > 15) {
    $(".left")
      .stop()
      .animate({ scrollTop: $("#inter_thumb_list li.active").offset().top });
  }
  // else{
  //   $('.left').stop().animate({'scrollTop':0});
  // }
}



function HandleChangeFocusQna(direction) {
  const $VisualBox = $(".right_item.active .more_interview_visual");
  const $listBox = $(".right_item.active .qna_box");
  const $listEl = $listBox.find("li");
  let activeIdx;
  let listElLength = $listEl.length;
  let $activeVisual = $VisualBox.find(".active_visual.active");
  const LastTurn = $activeVisual.index() + 1 == listElLength;
  const FirstTurn = $activeVisual.index() == 0;
  const condition = direction == "next" ? LastTurn : FirstTurn;
  const turnActive = direction == "next" ? "first-child" : "last-child";
  
  if (condition) {
    $VisualBox
      .find(".active_visual:" + turnActive)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $listBox
      .find("li:" + turnActive)
      .addClass("active")
      .siblings()
      .removeClass("active");
  } else {
    direction == "next"
      ? ($listBox.find('li').removeClass("active").next().addClass("active"))
      : ($listBox.find('li').removeClass("active").prev().addClass("active"));
  }

  SetItemCurrentNum(
    ".right_item.active .qna_control_box",
    ".right_item.active .qna_box"
    );
    activeIdx = $listBox.find("li.active").index();
    $VisualBox.find(".active_visual").eq(activeIdx).addClass('active').siblings().removeClass('active');
}


// 썸네일 총갯수, qna 총 갯수 표기 아이템, qna 박스 동일하게
function SetItemCurrentNum(el, target) {
  const $controlBox = $(el);
  const $current = $controlBox.find(".fraction .current_num");
  const $total = $controlBox.find(".fraction .total_num");
  const $target = $(target);
  let currentVal;
  let totalVal = $target.find("li").length;
  currentVal = $target.find("li.active").index() + 1;

  if (totalVal < 10) {
    totalVal = "0" + totalVal;
  }
  if (currentVal < 10) {
    currentVal = "0" + currentVal;
  }
  $total.text(totalVal);
  $current.text(currentVal);
}

// 아이템 1번에서 더 앞으로 가지 못하게, 마지막에서 더 뒤로 가지 못하게 버튼 비활성화
function StateDisabledBtn() {
  const targetIdx = $("#inter_thumb_list li.active").index();
  const totalLength = $("#inter_thumb_list li").length;
  const $PrevBtn = $(".item_control_box .prev");
  const $NextBtn = $(".item_control_box .next");
  if (targetIdx == 0) {
    $PrevBtn.attr("disabled", "disabled");
  } else {
    $PrevBtn.removeAttr("disabled");
  }

  if (totalLength == targetIdx + 1) {
    $NextBtn.attr("disabled", "disabled");
  } else {
    $NextBtn.removeAttr("disabled");
  }
}
// 더 많은 이야기 보기 누르면 이미지, qna 순서 첫번째로 갑니다
function moreViewActiveInit() {
  const ActiveOn = $(".right").hasClass("active");
  if (ActiveOn) {
    $(".qna_box li:first-child")
      .addClass("active")
      .siblings()
      .removeClass("active");
    $(".more_interview_visual .active_visual:first-child")
      .addClass("active")
      .siblings()
      .removeClass("active");
    SetItemCurrentNum(
      ".right_item.active .qna_control_box",
      ".right_item.active .qna_box"
    );
  }
}
