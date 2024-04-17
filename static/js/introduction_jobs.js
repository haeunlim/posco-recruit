$(document).ready(function () {
    let thisVal = "01";
    SetPoscoSlideList(thisVal);
  });

  $(".introduction_top button").on("click", function () {
    const thisVal = $(this).val();
    addRemove($(this));
    SetPoscoSlideList(thisVal);
  });

  $(".depth3_wrap button").on("click", function () {
    const thisVal = $(this).val();
    const thisTextVal = $(this).text();
    $(".breadcrumb .breadcrumb-item.active").text(thisTextVal);
    addRemove($(this));

    thisVal == "posco"
      ? SetPoscoSlideList(thisVal)
      : SetAnotherSlideList(thisVal);
    thisVal == "posco"
      ? $(".introduction_top").css("display", "flex")
      : $(".introduction_top").css("display", "none");
  });

  function SetAnotherSlideList(thisVal) {
    const imgBaseUrl = "./static/img/jobs/";
    const dpeth3Val = $(".depth3_wrap button.active").val();
    const btnVal = thisVal;
    let listLength = 9;

    let arrText0 = [
      {
        ttl: "영업",
        txt: "Sales",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#해외철강 </button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#국내철강
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
> #철강원료
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#식량
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>#바이오_캐미컬
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
> #모빌리티</button>`,
      },
      {
        ttl: "기획/재무",
        txt:"Corporate Planning/Finance",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#경영기획  
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#재무  
</button>`,
      },
      {
        ttl: "자원개발",
        txt: "Resources Development",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#자원개발  
</button>`,
      },
      {
        ttl: "LNG사업",
        txt: "LNG Business",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#LNG사업  
</button>`,
      },
      {
        ttl: "발전사업",
        txt:"Power  Generation Business",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#발전사업  
</button>`,
      },
      {
        ttl: "사업개발",
        txt: "Business Development",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#사업개발  
</button>`,
      },
      {
        ttl: "터미널사업",
        txt:"Terminal Business",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#터미널사업  
</button>`,
      },
      {
        ttl: "에너지정책",
        txt:"Energy Policy",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#에너지정책  
</button>`,
      },
      {
        ttl: "경영지원",
        txt:"Management Support",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#HR     
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#커뮤니케이션     
</button>`,
      },
    ];

    let arrText1 = [
      {
        ttl: "플랜트",
        txt:"Plant",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#플랜트 </button>`,
      },
      {
        ttl: "에너지",  txt:"Energy",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#에너지  
</button>`,
      },
      {
        ttl: "토목환경",  txt:"Civil Engineering Environment",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#시공_견적_설계  
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#영업  
</button>`,
      },
      {
        ttl: "건축",  txt:"Architecture",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#시공_견적_설계_영업  
</button><button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#기계_전기_토목_조경  
</button>`,
      },
      {
        ttl: "Q-SHE(안전/품질/공정/PMO)",  txt:"Q-HSE(Safety/Quality/Process/PMO)",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#Q_SHE_안전_품질_공정_PMO  
</button>`,
      },
      {
        ttl: "외주구매",  txt:"Purchasing",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#외주구매  
</button>`,
      },
    ];
    let arrText2 = [
      {
        ttl: "생산기술",
        txt: "Production Technology",
        btns: ` <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#생산기술
</button>
`,
      },

      {
        ttl: "설비기술/설비투자",
        txt: "Equipment Technology/Investment",
        btns: ` <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#설비기술_설비투자
</button>
`,
      },

      {
        ttl: "안전/보건",
        txt: "Safety/Health",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#안전_보건

</button>
`,
      },
      {
        ttl: "R&D",  txt:"Research & Development",
        btns: `  <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#R&D
</button>
`,
      },
      {
        ttl: "기획/재무",  txt:"Corporate Planning/Finance",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#기획_재무
</button>`,
      },
      {
        ttl: "경영지원",
        txt: "Management Support",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#경영지원

</button>
`,
      },
      {
        ttl: "마케팅",
        txt: "Marketing",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#마케팅

</button>
`,
      },
    ];
    const ListElement = (Path, a, idx, c, d, btns) =>
      `    <li>
            <a
              href="#!"
              class="img"
              style="
                background-image: url(${Path}${a}01_jobs${idx}.png);
              "
            >
              <div class="card">
                <div class="card-ttl-box">
                  <h2 class="card-ttl">${c}</h2>
                     ${d ? `<p>${d}</p>` : ""}
                </div>
                <div
                  class="hash_wrap flex free_size"
                  style="--mg-x: 5px; --mg-t: 10px"
                >
                 ${btns}
                </div>
              </div>
            </a>
          </li>`;

    $("#introduction_list").empty();

    let j;
    let arrText;

    if (thisVal == "poscointl") {
      arrText = arrText0;
      listLength = 9;
    } else if (thisVal == "poscoenc") {
      arrText = arrText1;
      listLength = 6;
    } else if (thisVal == "poscofuturem") {
      arrText = arrText2;
      listLength = 7;
    }

    for (let i = 1; i <= listLength; i++) {
      j = i - 1;
      if (i < 10) {
        i = "0" + i;
      }
      $("#introduction_list").append(
        ListElement(
          imgBaseUrl,
          dpeth3Val,
          i,
          arrText[j].ttl,
          arrText[j].txt,
          arrText[j].btns
        )
      );
    }
  }
  // 썸네일 정보 면저 뿌리기
  function SetPoscoSlideList(thisVal) {
    const imgBaseUrl = "./static/img/jobs/";
    const dpeth3Val = $(".depth3_wrap button.active").val();
    thisVal == "posco" ? (thisVal = "01") : "";
    const btnVal = thisVal;
    let textIdx;
    const btnVal2 = btnVal.substring(1) - 1;

    let listLength;

    let arrText0 = [
      {
        ttl: "생산기술",
        txt: "Production Technology",
        btns: ` <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#제선
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#제강
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#압연
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#품질
</button> `,
      },
      {
        ttl: "공정기술",
        txt: "Process Technology",
        btns: ` <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#공정기술
</button>`,
      },
      {
        ttl: "설비기술",
        txt: "Equipment Technology",
        btns: ` <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#기계
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#전기_전자
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#토건
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#에너지
</button>`,
      },
      {
        ttl: "안전/보건/환경",
        txt: "Safety/Health/Environment(SHE)",
        btns: `  <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#안전_보건
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#환경
</button>`,
      },
      {
        ttl: "마케팅/구매",
        txt: "Marketing/Purchasing",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#마케팅
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#구매
</button>`,
      },
      {
        ttl: "경영지원",
        txt: "Management Support",
        btns: `  <button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#HR
</button>
<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"
>
#홍보
</button>`,
      },
      {
        ttl: "재무",
        txt: "Finance",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#재무
</button>`,
      },
    ];
    let arrText1 = [
      {
        ttl: "조업",
        txt:"Operation",
        btns: `<button
  type="button"
  onclick="modalFn.show($('#jobModal_1'));"

>
  #조업
</button>`,
      },
      {
        ttl: "정비",
        txt:"Maintenance",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#정비
</button>`,
      },
      {
        ttl: "특수직무",
        txt:"Computer/Architecture etc.",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#특수직무
</button>`,
      },
    ];
    let arrText2 = [
      {
        ttl: "R&D",
        txt:"Research & Development",
        btns: `<button
type="button"
onclick="modalFn.show($('#jobModal_1'));"

>
#R&D
</button>`,
      },
    ];

    const ListElement = (Path, a, b, idx, c, d, btns) =>
      `    <li>
            <a
              href="#!"
              class="img"
              style="
                background-image: url(${Path}${a}${b}_jobs${idx}.png);
              "
            >
              <div class="card">
                <div class="card-ttl-box">
                  <h2 class="card-ttl">${c}</h2>
                     ${d ? `<p>${d}</p>` : ""}
                </div>
                <div
                  class="hash_wrap flex free_size"
                  style="--mg-x: 5px; --mg-t: 10px"
                >
                 ${btns}
                </div>
              </div>
            </a>
          </li>`;

    $("#introduction_list").empty();

    if (btnVal == "01") {
      listLength = 7;
    } else if (btnVal == "02") {
      listLength = 3;
    } else if (btnVal == "03") {
      listLength = 1;
    }
    let j;

    let arrText = [arrText0, arrText1, arrText2];
    arrText = arrText[btnVal2];
    for (let i = 1; i <= listLength; i++) {
      j = i - 1;
      if (i < 10) {
        i = "0" + i;
      }
      textIdx = i - 1;
      
      
      $("#introduction_list").append(
        ListElement(
          imgBaseUrl,
          dpeth3Val,
          btnVal,
          i,
          arrText[j].ttl,
          arrText[j].txt,
          arrText[j].btns
        )
      );
    }
  }