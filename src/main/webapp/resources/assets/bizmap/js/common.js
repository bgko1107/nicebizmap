//지도용 변수
var id;
var respVal = null, _g2 = null, marker = null, polygon = null, circle = null, rightclick = null, dMap = null;

var _upjong_cd = "";
//지역 선택시 필요한 code
var _mega_cd = '';					// 선택한 행정 시/도 변수
var _cty_cd = '';					// 선택한 행정 시/군/구 변수
var _admi_cd = '';					// 선택한 행정 읍/면/동 변수
// 지역 선택시 필요한 code
var _mega_nm = '';					// 선택한 행정 시/도 변수
var _cty_nm = '';					// 선택한 행정 시/군/구 변수
var _admi_nm = '';					// 선택한 행정 읍/면/동 변수
var click_id = '';
$(function(){
    /* 사이드바 상단 메인기능 버튼 css 관련 */
	  $(".left .gnb .nav > ul > li > button").click(function(){
	 	$(".left .gnb .nav > ul").addClass("select");
	 	// $(".left .gnb .nav > ul > li").removeClass("on");
	 	// $(this).parent().addClass("on");
		  if($(this).parent().hasClass("on")) {
			  $(this).parent().removeClass("on");
		  } else {
			  $(".left .gnb .nav > ul > li").removeClass("on");
			  $(this).parent().addClass("on");
		  }
	 	var idx = $(this).parent().index();
	 	$(".left .sub .box").removeClass("on");
	 	$(".left .sub .box").eq(idx).addClass("on");
	 });
   /* 사이드바 하단 서브기능 버튼 css 관련 */
   $("#map .left .gnb .bottom-btn > ul > li > button").mouseover(function() {
    $(this).find('span').css({'color': '#3f6fb5', 'font-weight': 'bold'});
   });
   $("#map .left .gnb .bottom-btn > ul > li > button").mouseout(function() {
    $(this).find('span').css({'color': '#757575', 'font-weight': 'normal'});
   });
	// $(".left .sub .box-head .btn-close").click(function(){
	// 	$(".left .gnb .nav > ul").removeClass("select");
	// 	$(".left .sub .box").removeClass("on");
	// });

//	$(".search-box .select-area .btn > li > button").click(function(){
//		var idx = $(this).parent().index();
//		$(".search-box .select-list > div").removeClass("on");
//		$(".search-box .select-list > div").eq(idx).addClass("on");
//	});

//	$(".search-box .select-area .btn > li > button").focusout(function(){
//		// clearInterval(id);
//		// id = setTimeout(function(){
//		// 	$(".search-box .select-list > div").removeClass("on");
//		// },200);
//		$(".search-box .select-list > div").removeClass("on");
//	});
//	$("#detail-box").click(function(e){
//        window.location.href = '/analyse/analyse2.jsp';
//	})

	$(".search-box .select-list > div > ul > li > button").click(function(){
		clearInterval(id);
	});

	
	$(".tab-btn > ul > li > button").click(function(e){

		if($(this).parent().parent().parent().attr("id") == 'faq'){
			var idx = $(this).parent().index();
			////console.log(idx)
			$(this).parent().parent().find('li').removeClass("on");
			$(this).parent().parent().find('li').eq(idx).addClass("on");
			//console.log($(this).parent().parent().parent().parent().attr("class"))
			if($(this).parent().parent().parent().parent().hasClass("dialog") || $(this).parent().parent().parent().parent().hasClass("con")){
				$(this).parent().parent().parent().next().find('.unit').removeClass("on");
				$(this).parent().parent().parent().next().find('.unit').eq(idx).addClass("on");
			}else{
				$(".aside .content .tab-con > .unit").removeClass('on');
				$(".aside .content .tab-con > .unit").eq(idx).addClass('on');
			}
		}else if($(this).parent().parent().parent().attr("id") == 'select_upjong'){
			var idx = $(this).parent().index();
			analyseMaps.getUpjongList(idx);
		}
	});

	$(".aside .head .close").click(function(){
		$(".aside").removeClass("on");
	});

	$(".left .sub .box-section .tit").click(function(){
		$(this).parent().parent().find(".box-section").removeClass("on");
		$(this).parent().addClass("on");
	});

	$(".wrap").append("<div class='tooltip-balloon'><p></p></div>");

	$(".tooltip").mouseover(function(){
		$(".tooltip-balloon > p").html($(this).find(".txt").html())
		var $h = $(".tooltip-balloon").outerHeight()
		$(".tooltip-balloon").css({
			"top":Math.round($(this).offset().top) - $h,
			"left":Math.round($(this).offset().left)
		})
		$(".tooltip-balloon").addClass("on");
	}).mouseout(function(){
		$(".tooltip-balloon").removeClass("on");
	});

	$(window).scroll(function(){
		$(".tooltip-balloon").removeClass("on");
	});

	$(".left .sub .box-body").scroll(function(){
		$(".tooltip-balloon").removeClass("on");
	});
//
//	$(".pop-detail .btn-close").click(function(){
//		sendMsgToParent();
//	// 부모에게 메시지 전달
//	});
//	function sendMsgToParent(msg) {
//		window.parent.postMessage(msg,'*' );
//	}	
//		
//	// 메시지 수신 받는 eventListener 등록
//	window.addEventListener('message',receiveMsgFromChild);
//
//	// 자식으로부터 메시지 수신
//	function receiveMsgFromChild() {
//		$(".iframe, .iframe-bg").removeClass("on");
//	}	

	$("#map .left .gnb .bottom-btn .ham").click(function(){
		$(this).parent().toggleClass("on");
	});

	$("#map .dialog .inner > .btn-close").click(function(){
		$(this).parent().parent().hide();
		console.log("close iframe");
		$("#page_reset").parent('li').addClass('on');
	});

	$(".accor-list .q").click(function(){
		if(!$(this).parent().hasClass("on")){
			$(this).parent().parent().find("li").removeClass("on");
			$(this).parent().parent().find("li > .answer").slideUp(300);
			$(this).parent().addClass("on");
			$(this).parent().find(".answer").slideDown(300);
		}
	});

	
	$(".accordion .item").addClass("on");
	$(".accordion .accordion-tit").click(function(){
		var idx = $(this).parent('.item').index();
		
		if($(this).parent(".item").hasClass("on"))
		{
			$(this).parent(".item").removeClass("on");
		}
		else
		{
			$(this).parent(".item").addClass("on");
		}
			
	});


//    $('.btn-close').bind('click', function(){
//		$("#iframe-wrap").hide();
//		closeDetail();
//    });
	
})

$.addComma = function(value) { // 천 단위에 ',' 삽입
	return Number(value).toLocaleString('en');
};

function isEmpty(value){
	if(typeof value === 'function'){
		return false;
	}
	return (value == null || value.length === 0);
}

function openDetail(){
	$("html").css('overflow','hidden');
	$(".iframe, .iframe-bg").addClass("on");
}
function closeDetail(){
	parent.$("html").css('overflow','');
	parent.$("#iframe").removeClass('on');
	parent.$("#iframe-bg").removeClass('on');
	parent.$("#iframeList").find("#subscribe_iframe").removeClass('on');
	parent.$("#iframeList").find("#notice_iframe").removeClass('on');
	parent.$("#iframeList").find("#login_iframe").removeClass('on');
	parent.$("#iframeList").find("#mypage_iframe").removeClass('on');
//	parent.$('.iframe-bg,.on').removeClass('on');
}

function openIframeDetail(id, click_id){
	$("html").css('overflow','hidden');
	//$("#iframeList").find("#iframe-bg").addClass("on");
	$("#iframeList").find("#" + id).attr("src",$("#iframeList").find("#" + id).attr("src"));
	if(!isEmpty(click_id)){
		var tmp = $("#" + id).attr('src');
		if(tmp.indexOf("click_id") < 1){
			$("#" + id).attr('src', tmp + "?click_id=" + click_id);		// 클릭한 버튼의 id
		}else{
			var gubun = click_id;	// subscribe_2
			if(gubun.substring(gubun.length-2, gubun.length-1) == '_'){
				gubun = gubun.substring(0,gubun.lastIndexOf(gubun.substring(gubun.length-2, gubun.length-1)));
			}
			var replaceUrl = tmp;			// /analyse/subscribe_iframe.jsp?click_id=subscribe_1&asdasdasd=123123
			replaceUrl = replaceUrl.substring(replaceUrl.indexOf('click_id'));		// click_id=subscribe_1&asdasdasd=123123
			var url = replaceUrl.substring(0,replaceUrl.indexOf(gubun) + click_id.length);	//click_id=subscribe_1
			replaceUrl = replaceUrl.substring(0,replaceUrl.indexOf(gubun)) + click_id;	//click_id=subscribe_2
			tmp = tmp.replace(url, replaceUrl);  // analyse/subscribe_iframe.jsp?click_id=subscribe_1 -> click_id=subscribe_1 : click_id=subscribe_2
			$("#" + id).attr('src', tmp);		// 클릭한 버튼의 id
		}
	}
	$("#iframeList").find("#" + id).addClass("on");
	$('#' + id + '').focus();
	$(".iframe-bg").addClass("on");
}

function closeIframeDetail(){
	console.log("closeIframeDetail start!!");
	parent.$("html").css('overflow','');
	//iframe 창 숨기기
	parent.$("#iframe").removeClass('on');
	// iframeList 창 모두 숨기기
	parent.$("#iframeList").find("#subscribe_iframe").removeClass('on');
	parent.$("#iframeList").find("#notice_iframe").removeClass('on');
	parent.$("#iframeList").find("#login_iframe").removeClass('on');
	parent.$("#iframeList").find("#mypage_iframe").removeClass('on');
	parent.$("#iframe-bg").removeClass('on');
//	parent.$('.iframe-bg,.on').removeClass('on');
	//parent.$("#iframeList").find("#iframe-bg").removeClass('on');
	parent.$("#iframeList").find("#index_iframe-bg").removeClass("modal-backdrop");
	console.log(click_id);
	parent.$("#" + click_id).focus();
	$("#page_reset").parent('li').addClass('on');
}

function iframeOpen(gubun, click_id){

	var popupY= scrollY + 470;
	openIframeDetail(gubun, click_id);
	$("#" + gubun).css("top",popupY);
	$("#" + gubun).css("z-index", 1100);
	$("#" + gubun).attr("src",$("#" + gubun).attr("src"));

	$("#iframeList").find("#index_iframe-bg").addClass("modal-backdrop");

	/* 웹접근성 iframe 내부 초점이동 */
	$('#' + gubun + '').focus();
	var thisIframe = document.activeElement;
	if(document.getElementById("" + gubun + "") == thisIframe) {
		console.log("true");
	}
}


(function ($) {
	$.analyseCommon = {

			/*****
			 * 자바스크립트 초기화 - 최초 1회 실행
			 */
			init: function () {
				//console.log("startCommon");
			},
			makeDetailMap: function(div){

				// 네이버 지도 초기화
				dMap = new naver.maps.Map(div, {
					zoom: 15,
					minZoom: 8,
					maxZoom: 17,
					//size: new naver.maps.Size(100%,350),
					mapTypeId: 'normal',
					center: new naver.maps.LatLng(37.56648, 126.97787),
					zoomControl: true,
					zoomControlOptions: {
						position: naver.maps.Position.TOP_RIGHT
					},
					mapTypeControl: true,
					mapTypeControlOptions: {
						style: naver.maps.MapTypeControlStyle.BUTTON,
						position: naver.maps.Position.TOP_RIGHT
					},
					scaleControl: true,
					scaleControlOptions: {
						position: naver.maps.Position.BOTTOM_RIGHT
					},
					logoControl: true,
					logoControlOptions: {
						position: naver.maps.Position.BOTTOM_LEFT
					},
					mapDataControl: true,
					mapDataControlOptions: {
						position: naver.maps.Position.BOTTOM_LEFT
					}
				});
				
				dMap.data.setStyle(function(feature) {
					
					var styleOptions = {
						fillColor: '#2a7cdd',
						fillOpacity: 0.5,
						strokeColor: '#2a7cdd',
						strokeWeight: 1,
						strokeOpacity: 1
					};
					
					return styleOptions;
				});
			},
			
			callAjax: function(sParam){
				$.ajax({
				     type:"post"
				    ,url: '/util/readData.jsp'
				    ,data: sParam
				    ,dataType: 'json'
				    ,async: false
				    ,success: function(resp, url) {
				    	respVal = resp;
				    }
				    ,beforeSend:function(){
				    	
				    }
				    ,complete:function(){
				    	loading_circle('remove');
				    }
				    ,error: function(resp, status, err) {
				    	if (typeof error === "function") {
				            error(resp.responseText);
				        } else {
				            //console.log(status);
				            //console.log(err);
				        }
				    }
				});
				
				/*$.ajax({
				    url: '/util/readData.jsp',
				    type: 'post',
				    data: sParam,
				    async: true,
				    dataType: 'json',
				    beforeSend:function(){
				    	//console.log("---------------------- 1");
				    	loading_circle('add');
				    },
				    success: function(resp, url) {
				    	//console.log("success Ajax");
				    	//console.log(resp);
				    	respVal = resp;
				    	loading_circle('remove');
				    },
				    error: function(resp, status, err) {
				        if (typeof error === "function") {
				            error(resp.responseText);
				        } else {
				            //console.log(status);
				            //console.log(err);
				        }
				    }
				})*/
			}
	}

	window.onload = function() {
		// map 객체 존재 여부 체크.
		if (typeof map == 'undefined') return false;
		
		// 네이버지도 줌 컨트롤 키보드로 접근가능하도록
		var nowZoomLv = map.getZoom(),
			maxZoomLv = map.getMaxZoom(),
			minZoomLv = map.getMinZoom();
		// '+' 키보드다운 시
		$('#map img[alt="지도 확대"]').parent().keydown(function(e) {
			if(e.keyCode == 13 || e.keyCode == 32) {
				if(nowZoomLv < maxZoomLv) {
					nowZoomLv = nowZoomLv + 1;
				} else {
					return;
				}
				map.setZoom(nowZoomLv);
				console.log(nowZoomLv);
			} else {
				return;
			}
		});
		// '-' 키보드다운 시
		$('#map img[alt="지도 축소"]').parent().keydown(function(e) {
			if(e.keyCode == 13 || e.keyCode == 32) {
				if(nowZoomLv > minZoomLv) {
					nowZoomLv = nowZoomLv - 1;
				} else {
					return;
				}
				map.setZoom(nowZoomLv);
				console.log(nowZoomLv);
			} else {
				return;
			}
		});
	}

	
})(jQuery);


function makeDetailMap(div){
	//console.log('makeDetailMap Start' + div);
	
	//console.log('makeDetailMap End');
}

function callAjax(sParam){
	
	$.ajax({
	    url: '/util/readData.jsp',
	    type: 'post',
	    data: sParam,
	    async: false,
	    dataType: 'json',
	    success: function(resp, url) {
	    	//console.log("success Ajax");
	    	respVal = resp;
	    },
	    error: function(resp, status, err) {
	        if (typeof error === "function") {
	            error(resp.responseText);
	        } else {
	            //console.log(status);
	            //console.log(err);
	        }
	    }
	});
}

function subScribeUpjongSelectBoxList(upjong_cd,gubun) {

	// 수정 필요 
	////console.log('선택 업종' + upjong_cd)
	////console.log('Upjong('+upjong_cd+') : admi_cd : ' + _admi_cd);

	$('.unit').remove();
    var url = '/util/readData.jsp?LF=nice.Analyse&LID=getUpjongSelect&readType=json&sql_type=upjong&upjong_cd='+upjong_cd;
	if(_admi_cd != ''){
		url += '&admi_cd=' + _admi_cd;
	}

	if(gubun == '1'){
		url += '&check_type=upjong1';	
	}else{
		if(gubun == '2' || gubun == '3'){
			url += '&check_type=admi';
		}
	}
	//console.log('url : ' + url );
		
    var tmp_div = '';

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(resp, url) {
        	//console.log("-----------------");
        	//console.log(gubun);
        	//console.log(resp);
        	var tmp = "";
        	var tmp_list = [];
        	var tmp_obj = {};
        	if(resp.rUpjongList.length > 0){
        		if(gubun == '2'){
        			tmp = '<option value="">중분류</option>';
        			$("select[name=upjong3_cd]").html('<option value="">소분류</option>');
        		}
        		if(gubun == '3'){
        			tmp = '<option value="">소분류</option>';
        		}
        		if(gubun == '2'){
        			resp.rUpjongList.forEach(function (value, index, list){
        				if(value.check == "t"){
	        				tmp_obj = {
	    						'upjong2_cd' : value.upjong2_cd
	    						, 'upjong2_nm' : value.upjong2_nm
	    						, 'check' : value.check
	        				}
        				}
        				tmp_list.push(tmp_obj);
        			});
        			const arrUnique = tmp_list.filter((character, idx, arr)=>{
        				return arr.findIndex((item) => item.upjong2_cd === character.upjong2_cd && item.upjong2_nm === character.upjong2_nm) === idx
        			});
        			resp.rUpjongList = arrUnique; 
        		}
        		
	        	resp.rUpjongList.forEach(function (value, index, list){
		        	if(gubun == "1"){
		        		//console.log(value.upjong1_cd);
		        		//console.log(value.upjong1_nm);
		        		tmp = tmp + '<option value="' + value.upjong1_cd + '">' + value.upjong1_nm + '</option>';
		        	}else if(gubun == '2' && value.check == "t"){
		        		if(value.upjong2_cd != null && value.upjong2_cd != 'null' && value.upjong2_cd != undefined && value.upjong2_cd !='undefined' ){
		        			tmp = tmp + '<option value="' + value.upjong2_cd + '">' + value.upjong2_nm + '</option>';
		        		}
		        	}else if(gubun == '3' && value.check == "t"){
	        			tmp = tmp + '<option value="' + value.upjong3_cd + '">' + value.upjong3_nm + '</option>';
	        		}
	        	});
	        	
	        	if(gubun == '1'){
	        		$("select[name=upjong1_cd]").append(tmp);
	        	}else if(gubun == '2'){
	        		$("select[name=upjong2_cd]").html(tmp);
	        	}else{
	        		$("select[name=upjong3_cd]").html(tmp);
	        	}
        	}
        },
        
        error: function(resp, status, err) {
            if (typeof error === "function") {
                error(resp.responseText);
            } else {
                //console.log(status);
                //console.log(err);
            }
        }
    });
	
}

//구독 서비스 지역 select
function subScribeAdmiSelectBoxList(admi_type){
	// dapth구분을 위한 조건
	var admi_num = '';
	
    if(admi_type == 'mega'){
    	admi_num = '1';
    }else if(admi_type == 'cty'){
    	admi_num = '2';
    }else{
    	admi_num = '3';
    }

    var url = '/util/readData.jsp?LF=nice.Analyse&LID=getAdmiSelect&readType=json&sql_type=admi&admi_type='+admi_type;
	if(!isEmpty(_upjong_cd)){
		if(_upjong_cd.length > 1){
			url += '&admi_cd='+_admi_cd+ '&upjong3_cd='+_upjong_cd;
		}
	}
    //기존 화면이 있다면 제거
	$('#depth-'+admi_num).remove();

	//시/도,시/군/구,읍/면/동 선택에 따른 검색 조건 변경
    if(admi_type == 'cty'){
    	url += '&mega_cd=' + _mega_cd
    }else if(admi_type == 'admi'){
    	url += '&cty_cd=' + _cty_cd
    }else{
    	
    }
    
    if((admi_type == "cty") && (_mega_cd == '')){
    	////console.log('시/군/구가 선택되지 않았습니다.');
    	return;
    }else if((admi_type == 'admi') && (_cty_cd == '')){
    	////console.log('읍/면/동이 선택되지 않았습니다.');
    	return;
    }
    
	var _tmp_cd;
	
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(resp, url) {
        	var tmp = "";
        	if(admi_type == 'admi'){
        		tmp = '<option value="">읍면동</option>';
        	}
        	if(admi_type == 'cty'){
        		tmp = '<option value="">시군구</option>';
        		$("select[name=zone_cd]").html('<option value="">읍면동</option>');
        	}
        	resp.rAdmiSelect.forEach(function (value, index, list){
        		if(admi_type == 'cty'){
        			tmp = tmp + '<option value="' + value.cty_cd + '">' + value.cty_nm + '</option>';
            	}else if(admi_type == 'admi'){
            		tmp = tmp + '<option value="' + value.admi_cd + '">' + value.admi_nm + '</option>';
            	}else{
            		tmp = tmp + '<option value="' + value.mega_cd + '">' + value.mega_nm + '</option>';
            	}
        	});
        	
        	if(admi_type == 'cty'){
        		$("select[name=cty_cd]").html(tmp);
        	}else if(admi_type == 'admi'){
        		$("select[name=zone_cd]").html(tmp);
        	}else{
        		$("select[name=mega_cd]").append(tmp);
        	}
        	
        },
        error: function(resp, status, err) {
            if (typeof error === "function") {
                error(resp.responseText);
            } else {
                //console.log(status);
                //console.log(err);
            }
        }
    });
}

function loading_circle(tmp){
//	$("#iframe-bg").removeClass("on");
//	$('body').find("#loading_circle").remove();
	if(tmp == "add"){
		$("#iframe-bg").addClass("on");
		$('body').append('<img id="loading_circle" src="/images/loading_circle2.gif" style="position:absolute;width:auto; height:auto;margin:auto;top:0; bottom:0; left:0; right:0;z-index:2000"/>');
	}else{
		$("#iframe-bg").removeClass("on");
		$('body').find("#loading_circle").remove();
	}
	
}

function isEmpty(value){
    if(typeof value === 'function'){
        return false;
    }
    return (value == null || value.length === 0);
}

function addComma(value){
    if(isEmpty(value)){
        return 0;
    }
    if(value == "null" || value == "NaN"){
        return '';
    }
    var regExp = /\B(?=(\d{3})+(?!\d))/g
    return value.toString().replace(regExp, ",");
}

function iframeUrlChange(click_id){
	$(".pop-con").find('.inner').find('.lnb').find('a').each(function (){
		$(this).attr('href', $(this).attr('href') + "?click_id=" + click_id);		// 클릭한 버튼의 id
	});
}



