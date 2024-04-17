var h22Common = {};
h22Common.setRadio = function(jsonData, targetId,objName,className, selectVal, valCol, nameCol,edit) {
	var html = "";         
	var val = "";
	var name = "";
	var checked = "";
	var disabled = "";
	if(edit){
		disabled = ' disabled="disabled"';
	}
	html+='<span class="checkbox-group">';
	$.each(jsonData, function(idx, json){
		val = (json[valCol] || "");     
		name = (json[nameCol] || "");      
	                
		if(selectVal == val){
			checked = 'checked="checked"';
		}else{
			checked = '';
		}
		html +='<label>';
		html +='<span class="input-checkbox" >';
		html += '<input type="radio" id="'+(objName+val)+'" name="'+objName+'" class="'+className+'" value="'+val+'" '+checked+disabled+' />';
		html +="<i></i>"
		html +="</span>";
		html +="<b>"+name+"</b>";
		html +='</label>';
	});
	html+="</span>";
	$("#"+targetId).html(html);
},     
h22Common.getByteLength = function(str) {
	var codeByte = 0;
	for (var idx = 0; idx < str.length; idx++) {
		var oneChar = escape(str.charAt(idx));
		if ( oneChar.length == 1 ) {
			codeByte ++;
		} else if (oneChar.indexOf("%u") != -1) {
			codeByte += 3;
		} else if (oneChar.indexOf("%") != -1) {
			codeByte ++;
		}
	}
	return codeByte;
}
// ---------------------------------------
// 로딩바 닫기
// ---------------------------------------
h22Common.getCloseLodingBar = function() {
	if ($(top.document).length > 0) {
		$(top.location).attr("href", "javascript:h22Common.closeLodingBar();"); // jQuery이용
	} else {
		h22Common.closeLodingBar();
	}
};

// ---------------------------------------
// 로딩바 열기
// ---------------------------------------
h22Common.getOpenLodingBar = function() {
	if ($(top.document).length > 0) {
		$(top.location).attr("href", "javascript:h22Common.openLodingBar();"); // jQuery이용
	} else {
		h22Common.openLodingBar();
	}
};

// ---------------------------------------
// 로딩바 닫기
// ---------------------------------------
h22Common.closeLodingBar = function() {
	$.unblockUI();
};

// ---------------------------------------
// 로딩바 열기
// ---------------------------------------
h22Common.openLodingBar = function() {
	$.blockUI({
		message: "<img src='static/img/loadingBar.gif' width='100px' height='100px' />",
		css: {
			backgroundColor: "rgba(0,0,0,0.0,)",
			color: "#000000",
			border: "0px solid #a00"
		}
	});
};


/**
 * 팝업창 열기
 * 
 * @param pUrl		url 및 파라미터정보 예) /S75/S75A10/popup/s75Testpop01.do?ServiceName=s75Code-service&find=1
 * @param pWidth	팝업창 가로사이즈 예 700
 * @param pHeight	팝업창 세로사이즈 예 800
 * @param pName		팝업창이름
 * @return
 */
h22Common.getOpenPopup = function(pUrl, pWidth, pHeight, pName) {
	// var popupX = (window.screen.width / 2) - (pWidth / 2); // 만들 팝업창 좌우 크기의 1/2 만큼 보정값으로 빼주었음
	// var popupY= (window.screen.height /2) - (pHeight / 2); // 만들 팝업창 상하 크기의 1/2 만큼 보정값으로 빼주었음
	var popupX = (screen.availWidth - pWidth) / 2;
	var popupY = (screen.availHeight - pHeight) / 2 - 10;

	if (window.screenLeft < 0) {
		popupX += window.screen.width * -1;
	} else if (window.screenLeft > window.screen.width) {
		popupX += window.screen.width;
	}

	var options = "width=" + pWidth;
	options += ",height=" + pHeight;
	options += ",top=" + popupY;
	options += ",left=" + popupX;
	options += ",toolbar=no,menubar=no,status=yes,scrollbars=yes,resizable=yes";
	var pPopup = window.open(pUrl, pName, options);
	if (pPopup != undefined) {
		pPopup.focus();
	}
};


/**
 * ajax submit
 * 
 * @param url : acction url
 * @param type : 요청 method (GET, POST)
 * @param dataType : 요청 데이터 타입 (ex : json)
 * @param data : 요청 데이터
 * @param sync : 동기(false) ,비동기(true) 여부
 * @param callbackSuccess : 성공시 호출 함수
 * @param callbackError : 에러시 호출 함수
 * @param callbackBeforeSend : submit 전 호출함수
 * @param callbackComplete : 완료 후 호출 함수
 * @param loadingbarHide : 로딩바 표시 여부 (true : 로딩바 숨김)
 * @return
 */
h22Common.submitAjax = function(url, type, dataType, data, sync, callbackSuccess, callbackError, callbackBeforeSend, callbackComplete, loadingbarHide) {

	// 로딩바를 어떻게 할까? => 한페이지에서 여러번 호출할 수 있으므로 로딩바처리에 대해 논의필요
	if (!loadingbarHide) {
		h22Common.getOpenLodingBar();
	}

	if (data == undefined || data == "") {
		data = '{}';
	}

	//var dataObj = JSON.parse(data);
	//dataObj['programid'] = h22Common.getProgramId();
	//data = JSON.stringify(dataObj);

	var actionUrl = "/h22a01-recruit" + url;
	var tmpSync = sync == null || sync == undefined ? false : sync;
	$.ajax({
		url: actionUrl
		, type: type
		, dataType: dataType
		, data: data
		, async: tmpSync
		//, crossDomain: true
		//, xhrfields : {withCredentials : true} 
		, contentType: "application/json; charset=UTF-8"
		, beforeSend: function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
			if (typeof callbackBeforeSend == 'function') callbackBeforeSend();
		}
		, success: function(res) {
			if(!loadingbarHide){
				h22Common.getCloseLodingBar();
			}
			if (typeof callbackSuccess == 'function') callbackSuccess(res);
		}
		, complete: function() {
			if (typeof callbackComplete == 'function') callbackComplete();
		}
		, error: function(xhr, textStatus, error) {
			if(!loadingbarHide){
				h22Common.getCloseLodingBar();
			}
			if (typeof callbackError == 'function') {
				callbackError(xhr.responseJSON, textStatus, error);
			} else {
				var errorCode = [400, 500];
				var pc_device = "win16|win32|win64|mac|macintel";
				var this_device = navigator.platform;
				if (xhr.status == "401") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error1.html";
					} else {
						alert("로그인 후 이용가능합니다.");
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AM000.html";
							} else {
								window.top.location.href = "H22A0000.html";
							}
						} else {
							window.top.location.href = "H22A0000.html";
						}
					}					
				} else if (xhr.status == "409") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error2.html";
					} else {		
						alert("중복로그인으로 로그아웃되었습니다.");
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AMMain.html";
							} else {
								window.top.location.href = "H22AMain.html";
							}
						} else {
							window.top.location.href = "H22AMMain.html";
						}
					}
				} else if (xhr.status == "403") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error3.html";
					} else {		
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AMMain.html";
							} else {
								window.top.location.href = "H22AMain.html";
							}
						} else {
							window.top.location.href = "H22AMain.html";
						}
					}
				} else if (xhr.status == "502") {
					//alert("Failed to load resource: the server responded with a status of 502 (Bad Gateway)");
					alert("오류가 발생하였습니다.\n관리자에게 문의하시기 바랍니다.");
				} else if (errorCode.indexOf(xhr.status) > -1) {
					//message:{"status":500,"message":"INTER SERVER ERROR","code":"E000"}
					/*
					var result = JSON.parse(xhr.responseText);
					if (typeof result.code == "undefined") {
						alert(result.status+" : "+result.message);
					} else {
						alert(result.code+" : "+result.message);	
					}
					*/
					alert("오류가 발생하였습니다.\n관리자에게 문의하시기 바랍니다.");
				} else {
					//alert("code:"+xhr.status+"\n"+"message:"+xhr.responseText+"\n"+"error:"+error);
					alert("오류가 발생하였습니다.\n관리자에게 문의하시기 바랍니다.");
				}
			}
		}
	});
};

/**
 * ajax multipart submit
 * 
 * @param url : acction url
 * @param data : 요청 데이터
 * @param callbackSuccess : 성공시 호출 함수
 * @param callbackError : 에러시 호출 함수
 * @param callbackBeforeSend : submit 전 호출함수
 * @param callbackComplete : 완료 후 호출 함수
 * @return
 */
h22Common.multipartSubmitAjax = function(url, data, callbackSuccess, callbackError, callbackBeforeSend, callbackComplete) {
	h22Common.getOpenLodingBar();
	var actionUrl = "/h22a01-recruit" + url;
	$.ajax({
		url: actionUrl
		, type: "POST"
		, data: data
		, enctype: "multipart/form-data"
		, contentType: false
		, processData: false
      	, cache: false
		, beforeSend: function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
			if (typeof callbackBeforeSend == 'function') callbackBeforeSend();
		}
		, success: function(res) {
			h22Common.getCloseLodingBar();
			if (typeof callbackSuccess == 'function') callbackSuccess(res);
		}
		, complete: function() {
			if (typeof callbackComplete == 'function') callbackComplete();
		}
		, error: function(xhr, textStatus, error) {
			h22Common.getCloseLodingBar();
			if (typeof callbackError == 'function') {
				callbackError(xhr.responseJSON, textStatus, error);
			} else {
				var errorCode = [400, 500];
				var pc_device = "win16|win32|win64|mac|macintel";
				if (xhr.status == "401") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error1.html";
					} else {
						alert("로그인 후 이용가능합니다.");
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AM000.html";
							} else {
								window.top.location.href = "H22A0000.html";
							}
						} else {
							window.top.location.href = "H22A0000.html";
						}
					}					
				} else if (xhr.status == "409") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error2.html";
					} else {		
						alert("중복로그인으로 로그아웃되었습니다.");
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AMMain.html";
							} else {
								window.top.location.href = "H22AMain.html";
							}
						} else {
							window.top.location.href = "H22AMain.html";
						}
					}
				} else if (xhr.status == "403") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error3.html";
					} else {		
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AMMain.html";
							} else {
								window.top.location.href = "H22AMain.html";
							}
						} else {
							window.top.location.href = "H22AMain.html";
						}
					}
				} else if (xhr.status == "502") {
					//alert("Failed to load resource: the server responded with a status of 502 (Bad Gateway)");
					alert("오류가 발생하였습니다.\n관리자에게 문의하시기 바랍니다.");
				} else if (errorCode.indexOf(xhr.status) > -1) {
					//message:{"status":500,"message":"INTER SERVER ERROR","code":"E000"}
					/*
					var result = JSON.parse(xhr.responseText);
					if (typeof result.code == "undefined") {
						alert(result.status+" : "+result.message);
					} else {
						alert(result.code+" : "+result.message);	
					}
					*/
					alert("오류가 발생하였습니다.\n관리자에게 문의하시기 바랍니다.");
				} else {
					//alert("code:"+xhr.status+"\n"+"message:"+xhr.responseText+"\n"+"error:"+error);
					alert("오류가 발생하였습니다.\n관리자에게 문의하시기 바랍니다.");
				}
			}
		}
	});
};

/**
 * 현재날짜시간 가져오기
 * 
 * @return true / false
 * @exception
 */
h22Common.getCurrentDateTime = function() {
	var nowDate = new Date();
	var year = nowDate.getFullYear();
	var month = nowDate.getMonth() + 1;
	var date = nowDate.getDate();
	var hours = nowDate.getHours();
	var minute = nowDate.getMinutes();
	var second = nowDate.getSeconds();
	var arrCurrent = new Array();

	arrCurrent.push(year);
	arrCurrent.push("-" + (month < 10 ? ("0" + month) : month));
	arrCurrent.push("-" + (date < 10 ? ("0" + date) : date));
	arrCurrent.push(" " + (hours < 10 ? ("0" + hours) : hours));
	arrCurrent.push(":" + (minute < 10 ? ("0" + minute) : minute));
	arrCurrent.push(":" + (second < 10 ? ("0" + second) : second));

	return arrCurrent.join("");
};

/**
 * replace null value
 * @returns target
 */
h22Common.nvl = function(target, replaceStr) {
	if (target === null || target === undefined) {
		if (replaceStr === null || replaceStr === undefined) {
			return '';
		} else {
			return replaceStr;
		}
	} else {
		//return (''+target).replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+/g,"");
		return (''+target).replace(/<(\/script|script)([^>]*)>/gi,"");
	}
};

/**
 * replace null or empty value
 * @returns target
 */
h22Common.nvl2 = function(target, replaceStr) {
	if (target === null || target === undefined || target === '') {
		return replaceStr;
	} else {
		return (''+target).replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+/g,"");
	}
};

/**
 * *****************************************************
 * 포맷체크 관련함수	(날짜, 숫자등)
 * *****************************************************
 */

/**
 * 숫자값 3자리마다 , 체크(123,456,789)
 * 
 * @param objValue
 * @return true / false
 * @exception
 */
h22Common.formatNumber = function(value) {
	var str = String(value);
	str = str.split('.');
	var tmpStr = str[0];
	var re = /(-?[0-9]+)([0-9]{3})/;
	while (re.test(tmpStr)) {
		tmpStr = tmpStr.replace(re, "$1,$2");
	}
	if (str.length > 1) {
		str = tmpStr + '.' + str[1];
	} else {
		str = tmpStr;
	}
	return str;
};

/**
 * 입력값이 숫자인지 체크한다(정수와 실수)
 * 
 * @param objValue
 * @return true / false
 * @exception
 */
h22Common.isNum = function(objValue) {
	var bool = true;
	for (var i = 0; i < objValue.length; i++) {
		ch = objValue.charCodeAt(i);
		if (!((ch >= 0x30 && ch <= 0x39) || ch == 0x2E)) {
			bool = false;
			break;
		}
	}
	return bool;
};

/**
 * 입력값이 -값인지 체크한다(정수와 실수)
 * 
 * @param objValue
 * @return true / false
 * @exception
 */
h22Common.isMinus = function(objValue) {
	var bool = true;
	if (new RegExp("^-[0-9]+", "g").test(objValue)) {
		bool = false;
	}
	return bool;
};

/**
 * 날짜 형식이 YYYYMM 인지 판별  
 */
h22Common.checkYearMonthFormat = function(date) {
	var dateFormat = /^\d{4}(0[1-9]|1[012])$/;
	if (dateFormat.test(date) === true) {
		return true;
	} else {
		return false;
	}
};

/**
* table 데이터 json 형식 변경하기
* @param  tableObjName   : table name
* @param  cbkName :  checkbox name
* @param  type :  데이터 상태 I : 저장, U : 수정, D : 삭제
* @return
*/
h22Common.getTableDataToJson = function(tableObjName, cbkName, type) {
	var trObj = $(tableObjName);                   
    var result = new Array();
    var s;
    var sType;
    var sName;
    var sValue;
        
	$.each(trObj, function(idx, item) {
		s = {};
		if ($(item).find('[name=' + cbkName + ']').is(":checked") == true) {
			s["ROWINDEX"] = idx + 1;

			if (type == "D") {
				s["FLAG"] = "D";
			} else {
				if ($(item).find('[name=' + cbkName + ']').val() == "") {
					s["FLAG"] = "I";
				} else {
					s["FLAG"] = "U";
				}
			}

			$.each($(item).find("input, select, textarea"), function(index, item2) {
				sType = $(item2).attr("type");
				sName = $(item2).attr("name");
				sValue = $(item2).val();

				if (sType != undefined && sType.toUpperCase() == "CHECKBOX") {
					if ($(item2).is(":checked") == true) {
						s[sName] = sValue;
					} else {
						s[sName] = "";
					}
				} else {
					s[sName] = sValue;
				}
			});
			result.push(s);
		}
	});
    
    return result;
};


/**
* name으로 파라메터 받기
* @param  name : 파라메터명
* @return
*/
h22Common.getParameterByName = function(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    if (results != null) {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	} else {
		return null;
	}
	
};

h22Common.makeMultiCombo = function(category1, category2) {
	var len1 = 0;
	var len2 = 0;
	if (category1 != undefined) {
		len1 = Object.keys(category1).length;
	}

	if (category2 != undefined) {
		len2 = Object.keys(category2).length;
	}

	var json = {};
	for (var i = 0; i < len1; i++) {
		var sysTp= category1[i].CD_V;
		var enumKeys = "";
		var enumValues = "";

		for (var j = 0; j < len2; j++) {
			if (sysTp == category2[j].SYS_TP) {
				enumKeys += "|" + category2[j].CD_V;
				enumValues += "|" + category2[j].CD_NM;
			}
		}

		json['Enum' + sysTp] = enumValues;
		json['EnumKeys' + sysTp] = enumKeys;
	}
	return json;
};

h22Common.makeMultiResponsibilityCombo = function(category1, category2) {
	var len1 = 0;
	var len2 = 0;
	if (category1 != undefined) {
		len1 = Object.keys(category1).length;
	}

	if (category2 != undefined) {
		len2 = Object.keys(category2).length;
	}

	var json = {};
	for (var i = 0; i < len1; i++) {
		var sysTp= category1[i].CD_V;
		var enumKeys = "";
		var enumValues = "";

		for (var j = 0; j < len2; j++) {
			if (sysTp == category2[j].SYS_TP) {
				enumKeys += "|" + category2[j].RESPONSIBILITY_KEY;
				enumValues += "|" + category2[j].RESPONSIBILITY_NAME;
			}
		}

		json['Enum' + sysTp] = enumValues;
		json['EnumKeys' + sysTp] = enumKeys;
	}
	return json;
};


/**
* getPaging  페이징 화면 생성
* @param  pageId : 페이징처리 div Id
* @param  totalCnt : 전체레코드수
* @param  dataSizeId : 페이지당 보여줄 데이터 ID
* @param  pageSizeId : 페이지 그룹 범위 ID 
* @param  currPageNoId : 현재페이지 ID
* @param  functionName :  함수이름(페이징번호 클릭 시 호출 함수이름)
* @return
*/
h22Common.getPagingInfo = function(pageId, totalCnt, dataSizeId, pageSizeId, currPageNoId, functionName) {
	var sDataSize = $("#" + dataSizeId).val();   // 페이지당 보여줄 데이타수
	var sPageSize = $("#" + pageSizeId).val();  // 페이지 그룹 범위       1 2 3 5 6 7 8 9 10
	var sPageNo = $("#" + currPageNoId).val();     // 현재페이지	

	h22Common.getPaging(pageId, totalCnt, sDataSize, sPageSize, sPageNo, functionName);
};

/**
* getPaging  페이징 화면 생성
* @param  pageId : 페이징처리 div Id
* @param  totalCnt : 전체레코드수
* @param  dataSize : 페이지당 보여줄 데이터수
* @param  pageSize : 페이지 그룹 범위 
* @param  pageNo : 현재페이지
* @param  functionName :  함수이름(페이징번호 클릭 시 호출 함수이름)
* @return
*/
h22Common.getPaging = function(pageId, totalCnt, dataSize, pageSize, pageNo, functionName) {
	var nTotalCnt = parseInt(totalCnt);	   // 전체레코드수
	var nDataSize = parseInt(dataSize);   // 페이지당 보여줄 데이타수
	var nPageSize = parseInt(pageSize);  // 페이지 그룹 범위       1 2 3 5 6 7 8 9 10
	var nPageNo = parseInt(pageNo);     // 현재페이지

	var html = new Array();

	if (nTotalCnt == 0) {
		$("#" + pageId).empty();
		return "";
	}

	// 페이지 카운트
	var pageCnt = nTotalCnt % nDataSize;
	if (pageCnt == 0) {
		pageCnt = parseInt(nTotalCnt / nDataSize);
	} else {
		pageCnt = parseInt(nTotalCnt / nDataSize) + 1;
	}

	var pRCnt = parseInt(nPageNo / nPageSize);
	if (nPageNo % nPageSize == 0) {
		pRCnt = parseInt(nPageNo / nPageSize) - 1;
	}

	//처음페이지, 이전페이지
	if (nPageNo > nPageSize) {
		var s2;
		if (nPageNo % nPageSize == 0) {
			s2 = nPageNo - nPageSize;
		} else {
			s2 = nPageNo - nPageNo % nPageSize;
		}

		//처음페이지			   
		html.push('<a href="#!"><img src="static/img/page_ico01.gif" class="vam" onclick="javascript:' + functionName + '(1);"/></a>');

		//이전페이지
		html.push('<a href="#!"><img src="static/img/page_ico02.gif" class="vam" onclick="javascript:' + functionName + '(' + s2 + ');"/></a>');
	}

	//paging Bar
	html.push('<span class="num">');
	for (var index = pRCnt * nPageSize + 1; index < (pRCnt + 1) * nPageSize + 1; index++) {
		if (index > pageCnt) {
			break;
		}
		if (index == nPageNo) {
			html.push('<a href="javascript:' + functionName + '('+index+');" class="on">'+index+'</a>');	
		} else {
			html.push('<a href="javascript:' + functionName + '('+index+');">'+index+'</a>');
		}
	}
	html.push('</span>');

	//다음페이지, 마지막페이지
	if (pageCnt > (pRCnt + 1) * nPageSize) {
		//다음페이지	
		html.push('<a href="#!"><img src="static/img/page_ico03.gif" class="vam" onclick="javascript:' + functionName + '(' + ((pRCnt + 1) * nPageSize + 1) + ');"/></a>');
		//마지막페이지
		html.push('<a href="#!"><img src="static/img/page_ico04.gif" class="vam" onclick="javascript:' + functionName + '(' + pageCnt + ');"/></a>');
	}

	$("#" + pageId).empty().append(html.join(""));
	$(document).on("click", "span.num a", function() {
		$("span.num a").removeClass("on");
		$(this).addClass("on");
	});
};

/**
* getPaging 홈페이지용 페이징 화면 생성
* @param  pageId : 페이징처리 div Id
* @param  totalCnt : 전체레코드수
* @param  dataSize : 페이지당 보여줄 데이터수
* @param  pageSize : 페이지 그룹 범위 
* @param  pageNo : 현재페이지
* @param  functionName :  함수이름(페이징번호 클릭 시 호출 함수이름)
* @return
*/
h22Common.getHomePaging = function(pageId, totalCnt, dataSize, pageSize, pageNo, functionName) {
	var nTotalCnt = parseInt(totalCnt);	   // 전체레코드수
	var nDataSize = parseInt(dataSize);   // 페이지당 보여줄 데이타수
	var nPageSize = parseInt(pageSize);  // 페이지 그룹 범위       1 2 3 5 6 7 8 9 10
	var nPageNo = parseInt(pageNo);     // 현재페이지

	var html = new Array();

	if (nTotalCnt == 0) {
		$("#" + pageId).empty();
		return "";
	}

	// 페이지 카운트
	var pageCnt = nTotalCnt % nDataSize;
	if (pageCnt == 0) {
		pageCnt = parseInt(nTotalCnt / nDataSize);
	} else {
		pageCnt = parseInt(nTotalCnt / nDataSize) + 1;
	}

	var pRCnt = parseInt(nPageNo / nPageSize);
	if (nPageNo % nPageSize == 0) {
		pRCnt = parseInt(nPageNo / nPageSize) - 1;
	}

	//처음페이지, 이전페이지
	if (nPageNo > nPageSize) {
		var s2;
		if (nPageNo % nPageSize == 0) {
			s2 = nPageNo - nPageSize;
		} else {
			s2 = nPageNo - nPageNo % nPageSize;
		}

		//처음페이지		
		html.push('<a href="javascript:' + functionName + '(1);" class="first">처음</a>');

		//이전페이지
		html.push('<a href="javascript:' + functionName + '(' + s2 + ');" class="prev">이전</a>');
	}

	//paging Bar
	for (var index = pRCnt * nPageSize + 1; index < (pRCnt + 1) * nPageSize + 1; index++) {
		if (index > pageCnt) {
			break;
		}
		if (index == nPageNo) {
			html.push('<a href="javascript:return false;" class="current">'+index+'</a>');	
		} else {
			html.push('<a href="javascript:' + functionName + '('+index+');">'+index+'</a>');
		}
	}
	
	//다음페이지, 마지막페이지
	if (pageCnt > (pRCnt + 1) * nPageSize) {
		//다음페이지	
		html.push('<a href="javascript:' + functionName + '(' + ((pRCnt + 1) * nPageSize + 1) + ');" class="next">다음</a>');
		//마지막페이지
		html.push('<a href="javascript:' + functionName + '(' + pageCnt + ');" class="last">끝</a>');
	}

	$("#" + pageId).empty().append(html.join(""));
	$(document).on("click", "span.num a", function() {
		$("span.num a").removeClass("current");
		$(this).addClass("current");
	});
};

/**
* getPaging  페이징 화면 생성
* @param  val : 파일명
* @param  functionName : 업로드 허용확장자 체크
* @return
*/
h22Common.isPermissionFileExt = function(val) {
	var ext = val.split('.').pop().toUpperCase();
	return $.inArray(ext, ["GIF", "JPEG", "JPG", "PNG", "BMP"]);
};


/**
* getHeader  Header 생성
*/
h22Common.getHeader = function() {
	if ($("header").length > 0) {
		$("header").remove();
	}
	
	if ($("#header").length > 0) {
		$("#header").remove();
	}
	$header = $('<header id="header"></header>');
	$("#wrap").prepend($header);
	$("header").load("homeheader.html");
};

/**
*  getHomeHeader Homepage Header 생성
*/
h22Common.getHomeHeader = function() {
	if ($("header").length > 0) {
		$("header").remove();
	}
	$header = $('<header  id="header"></header>');
	$("#wrap").prepend($header);
	$("header").load("homeheader.html");
};

/**
*  getMobileHeader Mobilepage Header 생성
*/
h22Common.getMobileHeader = function() {
	if ($("header").length > 0) {
		$("header").remove();
	}
	$header = $('<header id="header"></header>');
	if ($("#headline").length > 0) {
		$("#headline").after($header);
	} else {
		$("#wrap").prepend($header);
	}
	$("header").load("mobileheader.html");
};

h22Common.makeLocation = function() {
	if ($("#location").length > 0) {
		var html = "";
		var orgPage = location.href;
		var page = orgPage.substring(orgPage.lastIndexOf("/")+1,orgPage.lastIndexOf(".")-1);
		$("#gnb > nav > ul > li").each(function (index, item) {
			var obj = $(item).children("a:first-child").clone();
			html += "<li>" + obj.wrap("<div/>").parent().html() + "</li>";
			if ($(item).hasClass("active")) {
				$("#menuTitle").html($(item).children("a:first-child").text());
				$("#subMenuList").html($(item).find("ul").html());
				orgPage = orgPage.substring(orgPage.lastIndexOf("/")+1,orgPage.lastIndexOf("."));
				$(item).find("li").each(function (index, item) {
					if (orgPage == "H22A6013" || orgPage == "H22A6014") {
						if ($(item).children("a").attr("href").indexOf(orgPage) > -1) {
							$("#subMenuTitle").html($(item).children("a").text());
							return false;
						}
					} else {
						if ($(item).children("a").attr("href").indexOf(page) > -1) {
							$("#subMenuTitle").html($(item).children("a").text());
							return false;
						}
					}
				}); 
			}
		});
		$("#menuList").html(html);
	}
}

h22Common.makeMobileLocation = function() {
	if ($("#location").length > 0) {
		var menuHtml = "";
		var menuTitle = "";
		var subMenuHtml = "";
		var subMenuTitle = "";
		var page = location.href;
		page = page.substring(page.lastIndexOf("/")+1,page.lastIndexOf(".")-1);
		$("#gnb > nav > ul > li").each(function (index, item) {
			var obj = $(item).children("button:first-child").clone();
			menuHtml += "<li><a href='"+$(item).find("li").children("a:first-child").attr("href")+"'>" + obj.html() + "</a></li>";
			$(item).find("li").each(function (index, item) {
				if ($(item).children("a").attr("href").indexOf(page) > -1) {
					menuTitle = $(item).closest("ul").parent().find("button").html();
					subMenuHtml = $(item).closest("ul").html();
					subMenuTitle = $(item).children("a").text();
				}				
			}); 
		});
		$("#menuList").html(menuHtml);
		$("#menuTitle").html(menuTitle);
		$("#subMenuList").html(subMenuHtml);
		$("#subMenuTitle").html(subMenuTitle);
	}
}

/**
*  getHomeFooter Homepage Footer 생성
*/
h22Common.getHomeFooter = function() {
	if ($("footer").length > 0) {
		$("footer").remove();
	}
	$footer = $('<footer id="footer"></footer>');
	$("#wrap").append($footer);
	$("footer").load("homefooter.html");
};
h22Common.fullpageHomeFooter = function() {
	if ($("footer").length > 0) {
		$("footer").remove();
	}
	$footer = $('<footer id="footer"></footer>');
	$("#footer_sect").append($footer);
	$("footer").load("homefooter.html");
};

/**
*  getMobileFooter Mobilepage Footer 생성
*/
h22Common.getMobileFooter = function() {
	if ($("footer").length > 0) {
		$("footer").remove();
	}
	$footer = $('<footer id="footer"></footer>');
	$("#wrap").append($footer);
	$("footer").load("mobilefooter.html");
};


/**
* getHeader  Left 생성
*/
h22Common.getLeft = function() {
	if ($("aside").length > 0) {
		$("aside").remove();
	}					
	$aside = $('<aside></aside>');
	$("#container").prepend($aside);		
	$("aside").load("left.html");
};

/**
* 입사지원서 Tab 생성
* @param  id : Tab등 생성할 Element Id
* @param  list : Tab 목록
* @param  cur : 현재페이지 URL
* @return
*/
h22Common.makeApplTab = function(id, list, cur) {
	var html = "";
	for (var i = 0; i < list.length; i++) {
		if (list[i].TAB_URL == cur) {
			html += "<li class='active'><a>"+list[i].TAB_NAME+"</a></li>";
		} else {
			html += "<li><a href='"+list[i].TAB_URL+".html' onclick='goTab(this.href); return false;'>"+list[i].TAB_NAME+"</a></li>";
		}
	}
	$("#"+id).html(html);
};

/**
* Date Type 포멧
* @param  params : 전달 Parameter
* @return
*/
h22Common.dateFormat = function(date,type) {	
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	
	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	hour = hour >= 10 ? hour : '0' + hour;
	minute = minute >= 10 ? minute : '0' + minute;
	second = second >= 10 ? second : '0' + second;
	
	return date.getFullYear() + '-' + month + '-' + day + (type ? ' '+ hour : '');
};

/**
* Ibsheet 서버 조회 엑셀다운로드
* @param  sheetObj : sheetID
* @param  queryId  : 조회쿼리ID
* @param  extendParamString : parameter(querystring형식)
* @param  fileName : 파일명
* @param  downCols : 다운로드할 컬럼명 예) Price|AMT|TotalReward
* @param  merge    : 헤더 merge 여부  1 or 0 
* @param  downCols : 다운할 컬럼명  
* @return
*/
h22Common.directDown2Excel = function(sheetObj, queryId, extendParamString, fileName, merge, downCols) {
	if (!sheetObj) {
		return alert("sheet정보가 없습니다.");
	}
	if (!queryId) {
		return alert("조회가 불가능합니다.");
	}
	var param = {
		url: "/h22a01-recruit/ibsheet/directDown2Excel.do",
		extendParam: "queryId=" + queryId,
		fileName: $(".heading1").eq(0).text() + ".xlsx",
		merge: 1,
		sheetDesign: 1,
		downCols: sheetObj.getCols("Visible").join("|")	// 기본 visible
	};	
	if (fileName) {
		param["fileName"] = fileName;
	}
	if (downCols) {
		param["downCols"] = downCols;
	}
	if (extendParamString) {
		if (extendParamString.substr(0,1) != "&") {
			param["extendParam"] += "&";
		}
		param["extendParam"] += extendParamString;
	}
	sheetObj.directDown2Excel(param);
};

/* 면접화면 저장 버튼 제어 */
h22Common.btnControl = function() {
	var params = {
		SEARCH_HR_AFTC_MRG_ADOP_NTIC_ID : $("#SEARCH_HR_AFTC_MRG_ADOP_NTIC_ID").val() ? $("#SEARCH_HR_AFTC_MRG_ADOP_NTIC_ID").val() : h22Common.getParameterByName("id"),
		SEARCH_EVENT_ID : $("#EVENT_ID").val() ? $("#EVENT_ID").val() : h22Common.getParameterByName("eventId")
	}
	h22Common.submitAjax('/H22A7070/buttonControl', "Get", "json", params, true, function(res) {
		/*if (res.HR_AFTC_MRG_ADOP_SE_EN_F != 'A') {
			$("#btnSave").prop('disabled', true);
		} else {			
			$("#btnSave").prop('disabled', false);
		}*/
		if($("#BTN_STATUS").length>0){
			$("#BTN_STATUS").val(res.HR_AFTC_MRG_ADOP_SE_EN_F);
		}
	},null,null,null,true);
};

/* 전형단계 단계확정 or 공고마감*/
h22Common.endStep = function(seenfCode,evtId,id) {//단계확정 or 공고마감여부,EVENT_ID,공고ID
	var eventId = $("#EVENT_ID").val() ? $("#EVENT_ID").val() : h22Common.getParameterByName("eventId");
	var niceId = $("#SEARCH_HR_AFTC_MRG_ADOP_NTIC_ID").val() ? $("#SEARCH_HR_AFTC_MRG_ADOP_NTIC_ID").val() : h22Common.getParameterByName("id");
	var confirmMsg=seenfCode == "E" ? "단계를 확정하시겠습니까?" : "공고를 마감하시겠습니까?";
	if (evtId) {
		eventId = evtId
	}
	if (id) {
		niceId = id
	}	
	if (!confirm(confirmMsg)) {
		return;
	}				
	var params = {
		 HR_AFTC_MRG_ADOP_NTIC_ID : niceId
		,EVENT_ID : eventId
		,CMJ_NM     : "H22AN230" //단계확정 or 마감 ID
		,HR_AFTC_MRG_ADOP_SE_EN_F :seenfCode  //단계확정 : E , 공고마감 : C
	}
	h22Common.submitAjax('/H22A4000/callJob', "GET", "json", params, true, function (res) {
		alert(res.msg);								
		if(typeof endStepCallBack == 'function') endStepCallBack();
	});		
};

/**
 * ajax batch submit
 * 
 * @param url : acction url
 * @param type : 요청 method (GET, POST)
 * @param dataType : 요청 데이터 타입 (ex : json)
 * @param data : 요청 데이터
 * @param sync : 동기(false) ,비동기(true) 여부
 * @param callbackSuccess : 성공시 호출 함수
 * @param callbackError : 에러시 호출 함수
 * @param callbackBeforeSend : submit 전 호출함수
 * @param callbackComplete : 완료 후 호출 함수
 * @param loadingbarHide : 로딩바 표시 여부 (true : 로딩바 숨김)
 * @return
 */
h22Common.submitBatchAjax = function(url, type, dataType, data, sync, callbackSuccess, callbackError, callbackBeforeSend, callbackComplete, loadingbarHide) {

	var actionUrl = "/h22a02-batch" + url;
	var tmpSync = sync == null || sync == undefined ? false : sync;
	$.ajax({
		url: actionUrl
		, type: type
		, dataType: dataType
		, data: data
		, async: tmpSync
		//, crossDomain: true
		//, xhrfields : {withCredentials : true} 
		, contentType: "application/json; charset=UTF-8"
		, beforeSend: function(xmlHttpRequest) {
			xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을 header에 기록
			if (typeof callbackBeforeSend == 'function') callbackBeforeSend();
		}
		, success: function(res) {
			if (typeof callbackSuccess == 'function') callbackSuccess(res);
		}
		, complete: function() {
			if (typeof callbackComplete == 'function') callbackComplete();
		}
		, error: function(xhr, textStatus, error) {
			if (typeof callbackError == 'function') {
				callbackError(xhr.responseJSON, textStatus, error);
			} else {
				var errorCode = [400, 500];
				var pc_device = "win16|win32|win64|mac|macintel";
				var this_device = navigator.platform;
				if (xhr.status == "401") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error1.html";
					} else {
						alert("로그인 후 이용가능합니다.");
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AM000.html";
							} else {
								window.top.location.href = "H22A0000.html";
							}
						}
					}					
				} else if (xhr.status == "409") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error2.html";
					} else {		
						alert("중복로그인으로 로그아웃되었습니다.");
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AMMain.html";
							} else {
								window.top.location.href = "H22AMain.html";
							}
						}
					}
				} else if (xhr.status == "403") {
					if ($(".user em").attr("userSysTp")) {						
						window.top.location.href = $(".user em").attr("userSysTp")+"Error3.html";
					} else {		
						if (this_device) {
							if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
								window.top.location.href = "H22AMMain.html";
							} else {
								window.top.location.href = "H22AMain.html";
							}
						}
					}
				} else if (xhr.status == "502") {
					alert("Failed to load resource: the server responded with a status of 502 (Bad Gateway)");
				} else if (errorCode.indexOf(xhr.status) > -1) {
					//message:{"status":500,"message":"INTER SERVER ERROR","code":"E000"}
					var result = JSON.parse(xhr.responseText);
					if (typeof result.code == "undefined") {
						alert(result.status+" : "+result.message);
					} else {
						alert(result.code+" : "+result.message);	
					}
				} else {
					alert("code:"+xhr.status+"\n"+"message:"+xhr.responseText+"\n"+"error:"+error);
				}
			}
		}
	});
};

(function() {
	$.fn.serializeObjectStr = function() {
		var obj = null;
		var strJson = "";
		try {
			if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
				var arr = this.serializeArray();
				if (arr) {
					obj = {};

					$.each(arr, function() {
						// obj의 key값은 arr의 name, obj의 value는 value값
						obj[this.name] = this.value;
					});
				}
			}
		} catch (ex) {
			alert(ex.message);
		}
		if (obj != null) {
			strJson = JSON.stringify(obj)
		}
		return strJson;
	};

	$.fn.serializeObject = function() {
		"use strict";
		var result = {};
		var extend = function(i, element) {
			var node = result[element.name];
			if ("undefined" !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value);
				} else {
					result[element.name] = [node, element.value];
				}
			} else {
				result[element.name] = element.value;
			}
		};

		$.each(this.serializeArray(), extend);
		return result;
	};
})(jQuery);

$(document).ready(function (){
	var submitAction = function(e) {
		e.preventDefault();
	    e.stopPropagation();
		/* do something with Error */
	};
	$('form').bind('submit', submitAction);
});

//백스페이스, F5, Ctrl + r 입력금지 
//input 태그인 경우에는 백스페이스 사용할 수 있음
/*
$(document).keydown(function (e) {
	key = (e) ? e.keyCode : event.keyCode;
	//alert(key);
	var t = document.activeElement;
	if (key == 8 || key == 116 || key == 17 || key == 82) {
		if (key == 8) {
			if (t.tagName != "input" || t.tagName != "INPUT") {
				if (e) {
					e.preventDefault();
				} else {
					e.keyCode = 0;
					e.returnValue = false;
				}
			}
		} else {
			if (e) {
				e.preventDefault();
			} else {
				e.keyCode = 0;
				e.returnValue = false;
			}
		}
	}
});
*/

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
 
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

function onlyNumbers(obj){  
	obj.value = obj.value.replace(/[^0-9]/g, "");
}

function onlyNumberScale(obj){  
	obj.value = obj.value.replace(/[^0-9.]/g, "");
}

function checkScale(obj) {
	var pattern = /(^\d+$)|(^\d{1,}.\d{0,2}$)/;
	if (!pattern.test(obj.value)) {
		obj.value = "";
		return;
	};
}