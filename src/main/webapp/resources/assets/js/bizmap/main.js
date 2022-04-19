// main
$(function() {
    Main.load();
    //gun20130507 skipNavi 기능 추가
    //skipNavi
    $('#skipNavi').find('dd a').focus(function(){
        $(this).css({
            'position' : 'absolute',
            'width' : '100%',
            'top' : '0',
            'left' : '0'
        });
    });
    $('#skipNavi').find('dd a').blur(function(){
        $(this).css({'top' : '-99999px'});
        $(this).css({'left' : '-99999px'});
    });
/*
    endFocus99 = null;    //전역변수 var 사용안함
    
    $('a, span', document.body).click(function(){    
        //ifame 페이지 호출전 다음단계 페이지 이동 클릭 이벤트가 발생되어서 endFocus가 변경됨. div,li 요소는 이슈에서 제거함.
        endFocus99 = this;
    });
*/
});

var Main = {
    userId : '',
    ssKey : '',
    ssChkStart : false,
    loadTime : +new Date(),

    // 초기 로딩
    load : function() {
        try {
            if (!!Main.userId && !!Main.ssKey && !Main.ssChkStart) {
                Main.ssChkStart = true;
                Main.chkTimeout();
                Main.chkDuplication();
            }

            $('img[id*=top]').bind('click', function() {
                var nm = $(this).attr('id'),
                    alt = $(this).attr('alt');

                switch(nm) {
                    case 'top_home' : { // 홈
                        location.href = '/index.jsp';
                    } break;
                    case 'top_analy' : { // 상권분석
                        location.href = '/analysis/analysis.jsp';
                    } break;
                    case 'top_help' : { // 서비스안내
                        location.href = '/purchase/service_guide.jsp';
                    } break;
                    case 'top_login' : { // 로그인
                        location.href = '/login.jsp';
                    } break;
                    case 'top_mypage' : { // 마이페이지
                        location.href = '/mypage/usage.jsp';
                    } break;
                    case 'top_logout' : { // 로그아웃
                        location.href = '/logout.jsp';
                    } break;
                    case 'top_faq' : { // FAQ
                        location.href = '/customer/note.jsp';
                    } break;
                    case 'top_coupon' : { // 쿠폰등록 창 열기
                        Main.couponWin();
                    }
                }
            }).css({'cursor':'pointer'});
        } catch(e) { alert('Main.load()\n' + e.message); }
    },

    // 타임아웃 체크
    chkTimeout : function() {
        window._chkTime_ = setInterval(function() {
            try  {
                var nowTime = +new Date();
                if (Main.loadTime + (1000 * 60 * 1000000000) < nowTime) { // 10분
                    location.href = '/timeout.jsp';
                }
            } catch(e) {}
        }, 59000);
    },

    // 타임아웃 리셋
    resetTimeout : function() {
        Main.loadTime = +new Date();
    },

    // 중복 로그인 체크
    chkDuplication : function() {
        window._chkDup_ = setInterval(function() {
            try {
                var param = {
                    'LF'       : 'nice.mypage',
                    'LID'      : 'getMember',
                    'readType' : 'json',
                    'sql_type' : 'chkID',
                    'check_id' : Main.userId,
                    'check_session' : Main.ssKey
                };

                $(this).ajaxError(function(event, XMLHttpRequest, ajaxOptions, thrownError) {
                    //alert('Ajax!\n\nstatus number : ' + XMLHttpRequest.status + '\n\n' + XMLHttpRequest.responseText);
                });

                $.post('/util/readData.jsp', param, function(data, status) {
                    if (status != 'success') return;

                    if (data.error) {
                        alert('Ajax!! : ' + data.error);
                    } else {
                        if (!data.rMemberInfo.length) {
                            alert('다른곳에서 로그인 하였습니다.');
                            location.href = '/logout.jsp?chk=dup';
                        }
                    }
                }, 'json');
            } catch(e) {}
        }, 10000);
    },

    couponWin : function() {
        /** IE7, IE8에서 paging 버튼부분이 투명해서 뒷 배경이 보임. 처리방법을 몰라 팝업을 두개띄움. **
        nullWin = new EWin({id:'nullEWin'});
        nullWin.setSrc('/payment/coupon_list.jsp?inflow=white');
        nullWin.setRect(216, ($(document).width() / 2) - (790 / 2), 768, 410);//130717 height값 수정
        nullWin.show();
        /** 끝 **/
        
        couponWin = new EWin({id:'couponEWin', title:'쿠폰 보유내역 팝업'});
        couponWin.setSrc('/payment/coupon_list.jsp?inflow=top');
        couponWin.setRect(100, ($(document).width() / 2) - (790 / 2), 772, 551);
        couponWin.show();
        couponWin.focus();
    },

    bizPop : function() {
        //When you click on a link with class of poplight and the href starts with a #
        $('a.poplight[href^=#]').click(function() {
            var popID = $(this).attr('rel'); //Get Popup Name
            var popURL = $(this).attr('href'); //Get Popup href to define size

            //Pull Query & Variables from href URL
            var query= popURL.split('?');
            var dim= query[1].split('&');
            var popWidth = dim[0].split('=')[1]; //Gets the first query string value

            //Fade in the Popup and add close button//130607 <a href="#">을 <a href="javascript:;" >로 (고객사요청)
            var html = '<a href="javascript:;" class="close">'
                     + '  <img src="/images/navi_png/navi_layer_close.png" class="navi_close" alt="닫기"/>'
                     + '</a>';
            $('#' + popID).fadeIn().css({ 'width': Number( popWidth ) }).append(html);//20130528gun 닫기버튼 순서변경

            //Define margin for center alignment (vertical + horizontal) - we add 80 to the height/width to accomodate for the padding + border width defined in the css
            var popMargTop = ($('#' + popID).height() + 100) / 2;
            var popMargLeft = ($('#' + popID).width()) / 2;

            //Apply Margin to Popup
            $('#' + popID).css({
                'margin-top' : -popMargTop,
                'margin-left' : -popMargLeft
            });

            //Fade in Background
            $('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.

            if (jQuery.browser.msie && jQuery.browser.version == "7.0")
            {
                $('#contents').css({
                    'position':'relative',
                    'z-index':'10000'
                }).append('<div id="fade"></div>');    

            }

            var bodyHeight = document.body.clientHeight;
            $('#fade').css({'height':bodyHeight, 'filter' : 'alpha(opacity=80)'}).fadeIn(); //Fade in the fade layer

            return false;
        });

        // Close Popups and Fade Layer
        $('a.close, #fade').live('click', function() { // When clicking on the close or fade layer...
            Main.closeBizPop();
            $('div[id*=popup]').removeAttr('tabindex');//20130528gun close시 텝인덱스 속성 삭제
        });
    },

    closeBizPop : function() {
        $('#fade, #popup1').fadeOut();
        $('#fade, #popup2').fadeOut();
        $('#fade, #popup3').fadeOut();
        $('#fade, #popup4').fadeOut();
        return false;
    },

    prepareWin : function() {
        //이벤트 준비중 팝업
        prepareWin = new EWin({id:'prepareWin', title:'이벤트 준비중 팝업'});
        prepareWin.setSrc('/event/event_pop.jsp');
        prepareWin.setRect(($(document).height() / 2) - (300 / 2) - 80, ($(document).width() / 2) - (400 / 2), 370, 228);
        prepareWin.show();
        prepareWin.tabIndex = 0;
//        prepareWin.focus();
    },

    gnbPrepareWin : function() {
        //이벤트 준비중 팝업
        prepareWin = new EWin({id:'prepareWin', title:'이벤트 준비중 팝업'});
        prepareWin.setSrc('/event/event_pop.jsp');
        prepareWin.setRect(150, ($(document).width() / 2) - (400 / 2), 370, 240);
        prepareWin.show();
        prepareWin.focus();
    },

    infoFran : function() {
        var w = 800, h = 670, t = (screen.availHeight / 2) - (h / 2) - 15, l = (screen.availWidth / 2) - (w / 2);

        var infoFran = window.open('/fran/info_pop.jsp', 'infoFran', 'top=' + t/2 + ',left=' + l + ',width=' + w + ',height=' + h + ',toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=no');

        infoFran.focus();
    },

    event : function() {
        location.href='/suggest/introduce.jsp';
    }
};

// 메인 페이지 링크
var mainLink = function(url) {
    switch (url) {
        case '0' : { // 기본 보고서
            Main.prepareWin();
        } break;
        case '00' : { // 기본 보고서
            Main.gnbPrepareWin();
        } break;
        case '1' : { // 기본 보고서
            location.href = '/analysis/analysisFree.jsp';
        } break;
        case '2' : { // 요약 보고서 - 사용X
            location.href = '/analysis/analysis.jsp?report=summary';
        } break;
        case '3' : { // 종합 보고서
            location.href = '/analysis/analysis.jsp';
        } break;
        case '4' : { // 소호 보고서 - 사용X
            location.href = '/analysis/analysis.jsp?soho=true&report=soho';
        } break;
        case '5' : { // 업종추천 보고서
            location.href = '/analysis/analysisRecom.jsp?type=upjong';
        } break;
        case '6' : { // 입지추천 보고서
            location.href = '/analysis/analysisRecom.jsp?type=zone';
        } break;
        case '7' : { // FRAN 서비스
            location.href = '/fran/analysis.jsp';
        } break;
        case '8' : { // 역세권 보고서
            location.href = '/statsInfo/jobReport2.jsp?rpt_type_id=83&eq=0';
        } break;
        case '9' : { // 전문가 칼럼
            location.href = '/statsInfo/jobReport2.jsp?rpt_type_id=84&eq=1';
        } break;
        case '10' : { // 부동산 보고서
            location.href = '/statsInfo/jobReport.jsp?rpt_type_id=82&eq=2';
        } break;
        case '11' : { // 창업 가이드
            location.href = '/customer/contents/busiGuide.jsp';
        } break;
        case '12' : { // 창업 이러닝
            location.href = '/customer/contents/busiEdu.jsp';
        } break;
        case '13' : { // 상가 임대시세
            location.href = '/customer/marketprice.jsp';
        } break;
        case '14' : { // 소상공인 경기동향
            location.href = '/customer/economy_list.jsp';
        } break;
        case '15' : { // 프랜차이즈 정보공개서
            window.open('http://www.seda.or.kr/info/franchise/info.sbdc', 'seda', '');
        } break;
        case '16' : { // 이용가이드
            location.href = '/rules/guide_1.jsp';
        } break;
        case '17' : { // 지오클러스터
            location.href = '/cluster/intro/guide_home.jsp';
        } break;
        case '18' : { // 프랜차이즈 추천서비스
            location.href = '/suggest/introduce.jsp';
        } break;
        case '19' : { // Nswer 서비스 소개
            location.href = '/nswer/guide.jsp';
        } break;
    }
};

// 하단 링크
var bottomLink = function(url) {

    switch (url) {
        case '1' : { // 회사소개
            window.open('http://www.nicezinidata.co.kr', 'nicezinidata', '');
        } break;
        case '2' : { // 서비스약관
            location.href = '/rules/service.jsp';
        } break;
        case '3' : {  // 개인정보취급방침
            location.href = '/rules/privacy.jsp';
        } break;
        case '4' : { // 창업정보
            location.href = '/customer/contents/busiNews.jsp';
        } break;
        case '5' : { // 고객지원
            location.href = '/customer/note.jsp';
        } break;
        case '6' : { // 서비스안내
            location.href = '/purchase/service_guide.jsp';
        } break;
        case '7' : { // 이용권구매
            location.href = '/payment/ticket_purchase.jsp';
        } break;
        case '8' : { //
            location.href = '/proposal.jsp';
        } break;
    }

};

// 공지사항 바로가기
var gotoNote = function() {
    var obj = event.srcElement || event.target,
        board_dtl_no = $(obj).attr('board_dtl_no');

    $('form[name=loginForm]').attr({
        'action' : 'customer/note_detail.jsp',
        'target' : '_self'
    });

    $('form[name=loginForm]').form().each(function() {
        this.set('board_dtl_no', board_dtl_no);
        this.set('board_no', '2');
    }).submit();
};

// 레이어 팝업//gun20130507  회사소개로 되어있는 주석 팝업내용에 맞는 주석으로 변경
var gotoAnalysis = function(url) {

    switch (url) {
        case 1 : { // 기본분석 보고서
            $('a[name=initP1]').trigger('click');

            if (jQuery.browser.msie && jQuery.browser.version == "7.0")/*130812 추가*/
            {
                $('#popup1').children('a').eq(0).focus();
            }else{
                $('#popup1').attr('tabindex', '0');//20130528gun 수정
                $('#popup1').focus();
            }

        } break;
        case 2 : { // 업종,입지 추천보고서
            $('a[name=initP2]').trigger('click');
            $('#popup2').attr('tabindex', '0');//20130528gun 수정
            $('#popup2').focus();
        } break;
        case 3 : { // 창업정보
            $('a[name=initP3]').trigger('click');
            $('#popup3').find('a.close').focus();
        } break;
        case 4 : { //서비스 이용안내-20160317
             $('a[name=initP4]').trigger('click');      
                $('#popup4').attr('tabindex', '0');
                $('#popup4').focus();
                
        } break;
    }

};

var infoView = function(infoNo) {
    switch (infoNo) {
        case 1 : { // FRAN 안내보기
            Main.infoFran();
        } break;
        case 2 : { // 시장특성정보 안내보기
            Main.prepareWin();
        } break;
        case 3 : { // 마케팅DB 안내보기
            Main.prepareWin();
        } break;
    }
};

// 파일 다운로드
var fnViewservice = function(fno) {
    $('form[name=sampleDown]').form().each(function() {
        this.set("fno", fno);
    }).submit();
};

// 역세권 보고서 or 전문가 칼럼 바로가기
var gotoReport = function() {
    var obj = event.srcElement || event.target,
        rpt_type_id = $(obj).attr('rpt_type_id') || $(obj).parent().attr('rpt_type_id'),
        rpt_id = $(obj).attr('rpt_id') || $(obj).parent().attr('rpt_id'),
        eq = '';

    if (rpt_type_id == '83') {
        eq = '0';
    }
    else if (rpt_type_id == '84') {
        eq = '0';
    }

    $('form[name=loginForm]').attr({
        'action' : '/statsInfo/jobReport2_view.jsp',
        'target' : '_self'
    });

    $('form[name=loginForm]').form().each(function() {
        this.set('rpt_type_id', rpt_type_id);
        this.set('rpt_id', rpt_id);
        this.set('eq', eq);
        this.set('cPage', 1);
    }).submit();
};

// 쿠키 저장
var setCookie = function( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
};

//쿠폰등록
var coupon_reg = function() {
    Main.couponWin();
};

/*$(document).ready(function(){

  //슬라이드 배너
  $('.title').mouseover(function() {
      var no = $(this).attr('no');    //-- 클릭한 제목 index

      $('.title').each(function(index) {
          var name = '.contents' + index;    //-- 클릭한 제목의 내용 class명

            if( no == index ) {    //mouseover된 녀석
                $(this).hide();
                $(name).show();
            } else {            //mouseover되지 않은 녀석
                $(this).show();
                $(name).hide();
            }
        });
  }).css({'cursor':'pointer'});

  //-- 서브메뉴 띄우기
  $('.cn-images > img').click(function() {
      var no = parseInt($(this).attr('no')) + 1;
      $('a[name=initP'+no+']').trigger('click');
  }).css({'cursor':'pointer'});

  //-- 닫기 클릭
  $('div[name=closeBtn]').click(function() {
      $('.cn-sub').hide();
      $('div[name=closeBtn]').hide();
  }).css({'cursor':'pointer'});
  
});*/

window.document.onclick = Main.resetTimeout;

var EchoID = "bizmap";
var EchoGoodNm = "";
var EchoAmount = "";
var EchoUIP = "";
var EchoTarget = "";
var EchoLogSend = "Y";
var EchoCV = "";
var EchoPN = "";
