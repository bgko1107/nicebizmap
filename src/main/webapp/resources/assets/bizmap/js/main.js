// main
$(function() {
    Main.load();
    //gun20130507 skipNavi ��� �߰�
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
    endFocus99 = null;    //�������� var ������
    
    $('a, span', document.body).click(function(){    
        //ifame ������ ȣ���� �����ܰ� ������ �̵� Ŭ�� �̺�Ʈ�� �߻��Ǿ endFocus�� �����. div,li ��Ҵ� �̽����� ������.
        endFocus99 = this;
    });
*/
});

var Main = {
    userId : '',
    ssKey : '',
    ssChkStart : false,
    loadTime : +new Date(),

    // �ʱ� �ε�
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
                    case 'top_home' : { // Ȩ
                        location.href = '/index.jsp';
                    } break;
                    case 'top_analy' : { // ��Ǻм�
                        location.href = '/analysis/analysis.jsp';
                    } break;
                    case 'top_help' : { // ���񽺾ȳ�
                        location.href = '/purchase/service_guide.jsp';
                    } break;
                    case 'top_login' : { // �α���
                        location.href = '/login.jsp';
                    } break;
                    case 'top_mypage' : { // ����������
                        location.href = '/mypage/usage.jsp';
                    } break;
                    case 'top_logout' : { // �α׾ƿ�
                        location.href = '/logout.jsp';
                    } break;
                    case 'top_faq' : { // FAQ
                        location.href = '/customer/note.jsp';
                    } break;
                    case 'top_coupon' : { // ������� â ����
                        Main.couponWin();
                    }
                }
            }).css({'cursor':'pointer'});
        } catch(e) { alert('Main.load()\n' + e.message); }
    },

    // Ÿ�Ӿƿ� üũ
    chkTimeout : function() {
        window._chkTime_ = setInterval(function() {
            try  {
                var nowTime = +new Date();
                if (Main.loadTime + (1000 * 60 * 1000000000) < nowTime) { // 10��
                    location.href = '/timeout.jsp';
                }
            } catch(e) {}
        }, 59000);
    },

    // Ÿ�Ӿƿ� ����
    resetTimeout : function() {
        Main.loadTime = +new Date();
    },

    // �ߺ� �α��� üũ
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
                            alert('�ٸ������� �α��� �Ͽ����ϴ�.');
                            location.href = '/logout.jsp?chk=dup';
                        }
                    }
                }, 'json');
            } catch(e) {}
        }, 10000);
    },

    couponWin : function() {
        /** IE7, IE8���� paging ��ư�κ��� �����ؼ� �� ����� ����. ó������� ���� �˾��� �ΰ����. **
        nullWin = new EWin({id:'nullEWin'});
        nullWin.setSrc('/payment/coupon_list.jsp?inflow=white');
        nullWin.setRect(216, ($(document).width() / 2) - (790 / 2), 768, 410);//130717 height�� ����
        nullWin.show();
        /** �� **/
        
        couponWin = new EWin({id:'couponEWin', title:'���� �������� �˾�'});
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

            //Fade in the Popup and add close button//130607 <a href="#">�� <a href="javascript:;" >�� (�����û)
            var html = '<a href="javascript:;" class="close">'
                     + '  <img src="/images/navi_png/navi_layer_close.png" class="navi_close" alt="�ݱ�"/>'
                     + '</a>';
            $('#' + popID).fadeIn().css({ 'width': Number( popWidth ) }).append(html);//20130528gun �ݱ��ư ��������

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
            $('div[id*=popup]').removeAttr('tabindex');//20130528gun close�� ���ε��� �Ӽ� ����
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
        //�̺�Ʈ �غ��� �˾�
        prepareWin = new EWin({id:'prepareWin', title:'�̺�Ʈ �غ��� �˾�'});
        prepareWin.setSrc('/event/event_pop.jsp');
        prepareWin.setRect(($(document).height() / 2) - (300 / 2) - 80, ($(document).width() / 2) - (400 / 2), 370, 228);
        prepareWin.show();
        prepareWin.tabIndex = 0;
//        prepareWin.focus();
    },

    gnbPrepareWin : function() {
        //�̺�Ʈ �غ��� �˾�
        prepareWin = new EWin({id:'prepareWin', title:'�̺�Ʈ �غ��� �˾�'});
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

// ���� ������ ��ũ
var mainLink = function(url) {
    switch (url) {
        case '0' : { // �⺻ ����
            Main.prepareWin();
        } break;
        case '00' : { // �⺻ ����
            Main.gnbPrepareWin();
        } break;
        case '1' : { // �⺻ ����
            location.href = '/analysis/analysisFree.jsp';
        } break;
        case '2' : { // ��� ���� - ���X
            location.href = '/analysis/analysis.jsp?report=summary';
        } break;
        case '3' : { // ���� ����
            location.href = '/analysis/analysis.jsp';
        } break;
        case '4' : { // ��ȣ ���� - ���X
            location.href = '/analysis/analysis.jsp?soho=true&report=soho';
        } break;
        case '5' : { // ������õ ����
            location.href = '/analysis/analysisRecom.jsp?type=upjong';
        } break;
        case '6' : { // ������õ ����
            location.href = '/analysis/analysisRecom.jsp?type=zone';
        } break;
        case '7' : { // FRAN ����
            location.href = '/fran/analysis.jsp';
        } break;
        case '8' : { // ������ ����
            location.href = '/statsInfo/jobReport2.jsp?rpt_type_id=83&eq=0';
        } break;
        case '9' : { // ������ Į��
            location.href = '/statsInfo/jobReport2.jsp?rpt_type_id=84&eq=1';
        } break;
        case '10' : { // �ε��� ����
            location.href = '/statsInfo/jobReport.jsp?rpt_type_id=82&eq=2';
        } break;
        case '11' : { // â�� ���̵�
            location.href = '/customer/contents/busiGuide.jsp';
        } break;
        case '12' : { // â�� �̷���
            location.href = '/customer/contents/busiEdu.jsp';
        } break;
        case '13' : { // �� �Ӵ�ü�
            location.href = '/customer/marketprice.jsp';
        } break;
        case '14' : { // �һ���� ��⵿��
            location.href = '/customer/economy_list.jsp';
        } break;
        case '15' : { // ���������� ����������
            window.open('http://www.seda.or.kr/info/franchise/info.sbdc', 'seda', '');
        } break;
        case '16' : { // �̿밡�̵�
            location.href = '/rules/guide_1.jsp';
        } break;
        case '17' : { // ����Ŭ������
            location.href = '/cluster/intro/guide_home.jsp';
        } break;
        case '18' : { // ���������� ��õ����
            location.href = '/suggest/introduce.jsp';
        } break;
        case '19' : { // Nswer ���� �Ұ�
            location.href = '/nswer/guide.jsp';
        } break;
    }
};

// �ϴ� ��ũ
var bottomLink = function(url) {

    switch (url) {
        case '1' : { // ȸ��Ұ�
            window.open('http://www.nicezinidata.co.kr', 'nicezinidata', '');
        } break;
        case '2' : { // ���񽺾��
            location.href = '/rules/service.jsp';
        } break;
        case '3' : {  // ����������޹�ħ
            location.href = '/rules/privacy.jsp';
        } break;
        case '4' : { // â������
            location.href = '/customer/contents/busiNews.jsp';
        } break;
        case '5' : { // ������
            location.href = '/customer/note.jsp';
        } break;
        case '6' : { // ���񽺾ȳ�
            location.href = '/purchase/service_guide.jsp';
        } break;
        case '7' : { // �̿�Ǳ���
            location.href = '/payment/ticket_purchase.jsp';
        } break;
        case '8' : { //
            location.href = '/proposal.jsp';
        } break;
    }

};

// �������� �ٷΰ���
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

// ���̾� �˾�//gun20130507  ȸ��Ұ��� �Ǿ��ִ� �ּ� �˾����뿡 �´� �ּ����� ����
var gotoAnalysis = function(url) {

    switch (url) {
        case 1 : { // �⺻�м� ����
            $('a[name=initP1]').trigger('click');

            if (jQuery.browser.msie && jQuery.browser.version == "7.0")/*130812 �߰�*/
            {
                $('#popup1').children('a').eq(0).focus();
            }else{
                $('#popup1').attr('tabindex', '0');//20130528gun ����
                $('#popup1').focus();
            }

        } break;
        case 2 : { // ����,���� ��õ����
            $('a[name=initP2]').trigger('click');
            $('#popup2').attr('tabindex', '0');//20130528gun ����
            $('#popup2').focus();
        } break;
        case 3 : { // â������
            $('a[name=initP3]').trigger('click');
            $('#popup3').find('a.close').focus();
        } break;
        case 4 : { //���� �̿�ȳ�-20160317
             $('a[name=initP4]').trigger('click');      
                $('#popup4').attr('tabindex', '0');
                $('#popup4').focus();
                
        } break;
    }

};

var infoView = function(infoNo) {
    switch (infoNo) {
        case 1 : { // FRAN �ȳ�����
            Main.infoFran();
        } break;
        case 2 : { // ����Ư������ �ȳ�����
            Main.prepareWin();
        } break;
        case 3 : { // ������DB �ȳ�����
            Main.prepareWin();
        } break;
    }
};

// ���� �ٿ�ε�
var fnViewservice = function(fno) {
    $('form[name=sampleDown]').form().each(function() {
        this.set("fno", fno);
    }).submit();
};

// ������ ���� or ������ Į�� �ٷΰ���
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

// ��Ű ����
var setCookie = function( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
};

//�������
var coupon_reg = function() {
    Main.couponWin();
};

/*$(document).ready(function(){

  //�����̵� ���
  $('.title').mouseover(function() {
      var no = $(this).attr('no');    //-- Ŭ���� ���� index

      $('.title').each(function(index) {
          var name = '.contents' + index;    //-- Ŭ���� ������ ���� class��

            if( no == index ) {    //mouseover�� �༮
                $(this).hide();
                $(name).show();
            } else {            //mouseover���� ���� �༮
                $(this).show();
                $(name).hide();
            }
        });
  }).css({'cursor':'pointer'});

  //-- ����޴� ����
  $('.cn-images > img').click(function() {
      var no = parseInt($(this).attr('no')) + 1;
      $('a[name=initP'+no+']').trigger('click');
  }).css({'cursor':'pointer'});

  //-- �ݱ� Ŭ��
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
