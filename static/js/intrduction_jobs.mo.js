$(document).ready(function () {

    $(".depth3_wrap button").on("click", function () {
        const thisVal = $(this).val();
        const textval = $(this).text();
        const breadcrumbItem = $(".breadcrumb-item.active");
        breadcrumbItem.text(textval);
        addRemove($(this));
    
        // 포스코면 
        thisVal == "posco"
    ? ( $(".contents_area")
            .eq(0)
            .addClass("active")
            .siblings()
            .removeClass("active"))
    // 포스코가 아니면 
    :   ($(".contents_area")
            .eq(1)
            .addClass("active")
            .siblings()
            .removeClass("active"), 
             SetAnotherSlideList(thisVal))
    
    
      });
  });

    // 포스코 외의 다른 탭 내용들 
  function SetAnotherSlideList(thisVal) {
const imgBaseUrl = "./static/img/jobs/";
const dpeth3Val = $(".depth3_wrap button.active").val();
const btnVal = thisVal;
let listLength;

// 포스코 인터내셔널 
let arrText0 = [
{
ttl: "영업",
txt: "Sales",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#해외철강 </button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#국내철강
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
> #철강원료
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#식량
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>#바이오_캐미컬
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
> #모빌리티</button>`,
},
{
ttl: "기획/재무",
txt:"Corporate Planning/Finance",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#경영기획  
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#재무  
</button>`,
},
{
ttl: "자원개발",
txt: "Resources Development",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#자원개발  
</button>`,
},
{
ttl: "LNG사업",
txt: "LNG Business",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#LNG사업  
</button>`,
},
{
ttl: "발전사업",
txt:"Power  Generation Business",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#발전사업  
</button>`,
},
{
ttl: "사업개발",
txt: "Business Development",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#사업개발  
</button>`,
},
{
ttl: "터미널사업",
txt:"Terminal Business",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#터미널사업  
</button>`,
},
{
ttl: "에너지정책",
txt:"Energy Policy",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#에너지정책  
</button>`,
},
{
ttl: "경영지원",
txt:"Management Support",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#HR     
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#커뮤니케이션     
</button>`,
},
];

// 포스코 이앤씨 
let arrText1 = [
{
ttl: "플랜트",
txt:"Plant",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#플랜트 </button>`,
},
{
ttl: "에너지",  txt:"Energy",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#에너지  
</button>`,
},
{
ttl: "토목환경",  txt:"Civil Engineering Environment",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#시공_견적_설계  
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#영업  
</button>`,
},
{
ttl: "건축",  txt:"Architecture",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#시공_견적_설계_영업  
</button><button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#기계_전기_토목_조경  
</button>`,
},
{
ttl: "Q-SHE(안전/품질/공정/PMO)",  txt:"Q-HSE(Safety/Quality/Process/PMO)",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#Q_SHE_안전_품질_공정_PMO  
</button>`,
},
{
ttl: "외주구매",  txt:"Purchasing",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#외주구매  
</button>`,
},
];
// 포스코 퓨쳐앰
let arrText2 = [
{
ttl: "생산기술",
txt: "Production Technology",
btns: ` <button
type="button"
onclick="location.href='./H22NM008-view.html'"
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
onclick="location.href='./H22NM008-view.html'"
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
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#안전_보건

</button>
`,
},
{
ttl: "R&D",  txt:"Research & Development",
btns: `  <button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#R&D
</button>
`,
},
{
ttl: "기획/재무",  txt:"Corporate Planning/Finance",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
>
#기획_재무
</button>`,
},
{
ttl: "경영지원",
txt: "Management Support",
btns: `<button
type="button"
onclick="location.href='./H22NM008-view.html'"
value="01"
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
onclick="location.href='./H22NM008-view.html'"
value="01"
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
          <h3 class="card-ttl">${c}</h3>
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