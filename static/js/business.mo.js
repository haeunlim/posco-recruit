$(document).ready(function () {
  let thisVal =$('.depth3_wrap button.active').val();
  SetslideList(thisVal);
  BusinessDetailSlider();
  BusinessIntroSlider();
  setDetailTtlText();
});
function BusinessIntroSlider() {
  var busienssSlider;
  busienssSlider = new Swiper(".business_cont .swiper", {
    slidesPerView: "auto",
    slideToClickedSlide: true,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
      stopOnLastSlide: true,
    },
    speed: 1000,
    spaceBetween: 10,
     on: {
      reachEnd: function() {
        this.snapGrid = [...this.slidesGrid];
      },
    }
  });
  // scroll dots animation
  busienssSlider.autoplay.stop();
  setTimeout(() => {
    busienssSlider.autoplay.start();
  }, 1000);


  busienssSlider.on("slideChange", function () {
    if(busienssSlider.isEnd){
      busienssSlider.autoplay = false;
      setTimeout(() => {
        this.slideTo(0);
      }, 1700);
    }
  });

  
}

function BusinessDetailSlider() {
  var busienssDetailSlider;
  busienssDetailSlider = new Swiper(".business_detail_cont .swiper", {
    slidesPerView: 'auto',
    spaceBetween: 15,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".business_detail_cont .swiper-button-next",
      prevEl: ".business_detail_cont .swiper-button-prev",
    },
  });

  $(".depth3_wrap button").on("click", function () {
    addRemove($(this));
    let thisVal= $('.depth3_wrap button.active').val();
    
    setDetailTtlText();
    SetslideList(thisVal);
    busienssDetailSlider.init();
    busienssDetailSlider.slideTo(0);
  });
  $(".business_detail_cont .swiper-slide").on("click", function () {
   
    addRemove($(this));
  });
}

// 썸네일 정보 면저 뿌리기
function SetslideList(thisVal) {
  const imgBaseUrl = "./static/img/about/";
  const btnVal = thisVal;
 let textIdx;
 const btnVal2= btnVal.substring(1) -1;
  
  let thumbLength;

  
  let arrText0= [
    {url1: 'https://www.posco.co.kr/homepage/docs/kor7/jsp/s91a0000001i.jsp',url2:'https://www.youtube.com/@posco',ttl:'포스코', txt: `조강 생산 4500만 톤 체제를 갖춘 WSD 선정
    13년 연속 ‘세계에서 가장 경쟁력 있는 철강회사’
    `},
    {url1: 'https://www.poscosteeleon.com/kr/main.do',url2:'https://www.youtube.com/channel/UCyQPJhGoNt9XxfBTL6Xramw',ttl:'포스코스틸리온', txt:`인피넬리(INFINeLI) 등 컬러강판을 생산하는 
    글로벌 표면처리강판 전문기업
    `},
    {url1: 'https://www.snnc.co.kr/',ttl:'SNNC', txt: `단일 규모 세계 최대 생산능력의 전기로를 갖춘
    페로니켈 생산 전문기업
    `},
    {url1: 'http://www.poscomtech.com/',ttl:'포스코엠텍', txt: `스틸의 가치를 높이는 글로벌 포장&소재
    전문기업
    `},
    {url1: 'https://www.entob.com/index.jsp',ttl:'엔투비', txt: `기업간 전자상거래(B2B) 서비스를 제공하는
    대한민국 대표 MRO 전문 Marketplace
    `},
    {url1: 'https://www.poscohumans.com/kr/main.do',ttl:'포스코휴먼스', txt: `국내 1호 자회사형 장애인표준사업장
    `},
    {url1: 'http://www.poscomobility.com/front/main/getMain.do',url2:'https://www.youtube.com/channel/UC5H3II0yYV-D_BSnDtmBj9w',ttl:'포스코모빌리티솔루션', txt: `친환경차, UAM, 드론 등 미래 모빌리티 소재∙
    부품 생산 전문기업
    `},
    {url1: 'https://www.poscortech.com:40413/',ttl:'포스코IH', txt: `지식자산 조사∙분석∙컨설팅 서비스 전문기관
    `},
    {url1: 'https://www.p-nr.com/index.do',ttl:'PNR', txt: `제철 부산물 자원화 전문기업
    `},
    {url1: 'http://www.poswelding.com/',ttl:'포항특수용접봉', txt: `고망간강 용접재료 등 특수용접봉 전문기업
    `}
  ];
  let arrText1= [
    {url1: 'https://www.poscofuturem.com/',url2:'https://www.youtube.com/@poscofuturem',ttl:'포스코퓨처엠', txt: `양/음극재 등 미래 모빌리티 산업을 위한 화학&
    에너지소재 글로벌 리더
    `},
    {url1: 'http://www.poscomcm.com/',ttl:'포스코MC머티리얼즈', txt: `대한민국 최초의  프리미엄 침상코크스 제조기업
    `},
    {url1: 'http://www.pochemical.com/main',ttl:'피앤오케미칼', txt: `고순도 과산화수소 등 첨단 정밀화학 소재
    생산기업
    `},
  ];
  let arrText2= [
    {url1: 'http://www.poscolithium.kr/main#__275381__item2',ttl:'포스코필바라리튬솔루션', txt: `고성능 이차전지 양극재 핵심원료 수산화리튬
    생산 전문기업
    `},
    {ttl:'포스코JK솔리드솔루션', txt: `차세대 이차전지 핵심소재 고체전해질 생산기업
    `},
    {ttl:'포스코HY클린메탈', txt: `전기차용 배터리 리사이클링 전문기업
    `},
  ];
  let arrText3= [
    {url1: 'https://www.posco.co.kr/homepage/docs/kor7/jsp/s91a0000001i.jsp',url2:'https://www.youtube.com/@posco',ttl:'포스코', txt: `조강 생산 4500만 톤 체제를 갖춘 WSD 선정
    13년 연속 ‘세계에서 가장 경쟁력 있는 철강회사’
    `},
    {url1: 'http://www.poscointl.com/kor/index.do',url2:'https://www.youtube.com/@pointerTv',ttl:'포스코인터내셔널', txt: `무역상사의 영역을 넘어 비즈니스 전 과정에서
    가치를 창출하는 글로벌종합사업회사
    `},
    {url1: 'https://www.poscoenc.com:446/ko/index.aspx',url2:'https://www.youtube.com/user/HelloPOSCOENC',ttl:'포스코이앤씨', txt: `도시, 플랜트, 인프라를 구축하는 스마트
    종합건설회사
    `},
  ];
  let arrText4= [
    {url1: 'http://www.poscointl.com/kor/index.do',url2:'https://www.youtube.com/@pointerTv',ttl:'포스코인터내셔널', txt: `무역상사의 영역을 넘어 비즈니스 전 과정에서
    가치를 창출하는 글로벌종합사업회사
    `},
    {url1: 'https://www.poscoenc.com:446/ko/index.aspx',url2:'https://www.youtube.com/user/HelloPOSCOENC',ttl:'포스코이앤씨', txt: `도시, 플랜트, 인프라를 구축하는 스마트
    종합건설회사
    `},
  ];
  let arrText5= [
    {url1: 'https://www.poscoenc.com:446/ko/index.aspx',url2:'https://www.youtube.com/user/HelloPOSCOENC',ttl:'포스코이앤씨', txt: `도시, 플랜트, 인프라를 구축하는 스마트
    종합건설회사
    `},
    {url1: 'https://www.poscodx.com/servlet/Main?lang=kr',url2:'https://www.youtube.com/@poscodx',ttl:'포스코DX', txt: `산업현장을 스마트하게 진화시키는 IT,
    EIC엔지니어링 기술 전문기업
    `},
    {url1: 'https://www.poscoflow.com/',url2:'https://www.youtube.com/@poscoflow',ttl:'포스코플로우', txt: `친환경 스마트 물류솔루션으로 물류의 새로운
    흐름을 선도하는 글로벌 파트너
    `},
    {url1: 'https://www.poscowide.com/',ttl:'포스코와이드', txt:`종합부동산서비스, 건축, 인프라, 플랜트, 골프,
    레저 분야 종합관리 전문기업
    `},
    {url1: 'https://www.poscoanc.com/kr/main/index.do',url2:'https://www.youtube.com/user/poscoancstory',ttl: '포스코A&C',txt: `건축, 디자인, 건설 사업관리, 유지관리 서비스 등 건설사업 전문기술 종합기업` }
  ];
 
  let arrText6= [

    {   url1: "http://www.poscointl.com/kor/index.do",
      url2: "https://www.youtube.com/@pointerTv",ttl:'포스코인터내셔널', txt: `무역상사의 영역을 넘어 비즈니스 전 과정에서
    가치를 창출하는 글로벌종합사업회사
    `},
  ];

  const ListElement = (Path,a, idx, c,d, url1,url2) =>
    `   <div class="swiper-slide">
    <a href="#!" class="business_card">
      <div class="summary">
        <div class="card-ttl-box flex_b_c">
        <h3 class="card-ttl">${c}</h3>
           <div class="button-wrap">
           ${url2 ? `<button type="button" aria-label="유뷰트 바로보기 버튼" class="youtube" onclick="window.open('${url2}')"></button>`:''} 
           ${url1 ? ` <button type="button" aria-label="바로보기 버튼" class="link" onclick="window.open('${url1}')">
            </button>`:''} 
          </div>
        </div>
      
        <div class="text-area">
          <p>
            ${d}
          </p>
        </div>
      </div>
    
      <figure>
        <div
          class="bg-pos"
          style="
            background-image: url(${Path}business${a}_img${idx}.png);
          "
        ></div>
      </figure>
      
    </a>
  </div>`;
  
  $("#businessDetailSlider").empty();
  
  if(btnVal == "01"){
    thumbLength = 10;
  }else if(btnVal == "05"){
    thumbLength = 2;
  }else if(btnVal == "06"){
    thumbLength = 5;
  }else if(btnVal == "07"){
    thumbLength = 1;
  }else{
    thumbLength = 3
  }
  let j;

  let arrText= [arrText0,arrText1,arrText2,arrText3,arrText4,arrText5,arrText6];
  arrText= arrText[btnVal2];
  for (let i = 1; i <= thumbLength; i++) {
      j= i -1;
    if (i < 10) {
      i = "0" + i;
    }
    textIdx = i-1;
    $("#businessDetailSlider").append(ListElement(imgBaseUrl,btnVal, i, arrText[j].ttl, arrText[j].txt,arrText[j].url1,arrText[j].url2));
  } 

  
  
}

function setDetailTtlText() {
  const ttl = $(".detail .sub-ttl-box h2");
  let depth3 = $(".detail .depth3_wrap button.active").val();
  depth3 = depth3.replace(/(^0+)/, "") - 1;
 

  const businessDetailTTl = [
   {width:"550px", text:`“세계에서 가장 경쟁력 있는 철강사 13년 연속 1위의
      자리를 지키고 있는 포스코를 중심으로 <br>
      국내외 13개국에서 철강사업을 영위하고 있습니다.”
      `},
   {width:"780px", text:`“포스코그룹은 전 세계에서 유일하게 이차전지소재의 원료부터<br class="only_web">
      양/음극재 등 최종소재까지 모두 공급할 수 있는 밸류체인을 완성했습니다.<br>
      그룹사간 시너지를 통해 사업을 확장해나가겠습니다.”
      `},
   {width:"550px", text:`“포스코그룹은 이차전지소재 양극재의 핵심 원료인
      리튬/니켈의 자원부터 생산 체제까지 모두 갖추고 친환경 미래소재 대표기업으로 자리잡고 있습니다.”
      `},
   {width:"590px", text:`“포스코홀딩스를 중심으로 포스코·포스코인터내셔널·포스코이앤씨 등이 수소의 생산부터 운송과 저장, 활용의 모든 단계에 걸쳐 밸류체인을 완성하고 있습니다.”
      `},
   {width:"700px", text:`“가스전 개발과 생산, 트레이딩과 운송, LNG 터미널을 통한 저장과 LNG 복합발전에 이르기까지 LNG 밸류체인 전반을  <br class="only_web">
      아우르는 친환경 에너지 사업을 선도합니다.”
      `},
   {width:"700px", text:`“모듈러 건축, 제로 에너지 빌딩 등 친환경 건축과 수소, 해상풍력 등
      친환경 인프라 수주 확대로 지속 가능한 성장을 추진합니다.”
      `},
   {width:"670px", text:`“국내 최대의 식량 트레이더로서 상-하류 밸류체인 확장을 통해 
    국가 식량안보와 미래 먹거리를 책임지겠습니다.”
      `},
  ];
  ttl.empty();
  if($(window).width() > 840){
    ttl.css('max-width',businessDetailTTl[depth3].width);

  }
  ttl.append(businessDetailTTl[depth3].text);
}


// 슬라이드 클릭하면 아래 탭 active 함수
function HandleSlideClickEvent(target) {
  const cardVal = target;
  const headerH = $('#header .wrap_dep2').outerHeight();
  const depth3 = $(".depth3_wrap button");
  
  let activeDepth3;
  const depth3Inner = $(".depth3_wrap .depth3_inner");
 
  depth3.each(function () {
    let dpeth3Val = $(this).val();

    if (dpeth3Val == cardVal) {
      depth3.removeClass("active");
      $(this).addClass("active");
    }
  });
  activeDepth3 = $(".depth3_wrap button.active");
  const dpeth3Active = activeDepth3.offset().left;
  const thisVal = activeDepth3.val();

  depth3Inner.animate({scrollLeft:dpeth3Active})
  let scrollTarget = $("section.detail").offset().top - headerH;
  $("html, body").animate({ scrollTop: scrollTarget });

  setDetailTtlText();
  SetslideList(thisVal);
}
