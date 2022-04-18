<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/head.jsp" %>

<!-- BEGIN: Body-->
<body class="vertical-layout vertical-menu-modern boxicon-layout no-card-shadow 1-column  navbar-sticky footer-static bg-full-screen-image  blank-page blank-page" data-open="click" data-menu="vertical-menu-modern" data-col="1-column">
    <!-- BEGIN: Content-->
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body">
                <!-- login page start -->
                <section id="auth-login" class="row flexbox-container">
                    <div class="col-xl-4 col-11">
                        <div class="card bg-authentication mb-0">
                            <div class="row m-0">
                                <!-- left section-login -->
                                <div class="col-md-12 col-12 px-0">
                                    <div class="card disable-rounded-right mb-0 p-2 h-100 d-flex justify-content-center">
                                        <div class="card-content">
                                            <div class="card-body">
                                                <div class="form-group mb-50">
                                                    <label class="text-bold-600" for="userId">아이디</label>
                                                    <div class="row">
                                                        <div class="col-md-7 col-sm-12">
                                                            <input type="text" class="form-control" id="userId" placeholder="id" >
                                                        </div>
                                                        <div class="col-md-5 col-sm-12">
                                                            <button type="button" class="btn btn-danger glow w-100 position-relative" id="check" onclick="fn_idCheck();">중복체크</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="text-bold-600" for="userPw">비밀번호</label>
                                                    <input type="password" class="form-control" id="userPw" placeholder="password">
                                                </div>
                                                <div class="form-group">
                                                    <label class="text-bold-600" for="userName">이름</label>
                                                    <input type="text" class="form-control" id="userName" placeholder="name">
                                                </div>
                                                <div class="form-group">
                                                    <label class="text-bold-600" for="userPhone">휴대폰번호</label>
                                                    <input type="number" class="form-control" id="userPhone" placeholder="phone number">
                                                </div>
                                                <div class="form-group">
                                                    <label class="text-bold-600" for="userEmail">이메일</label>
                                                    <input type="email" class="form-control" id="userEmail" placeholder="e-mail">
                                                </div>
                                                <button type="button" class="btn btn-primary glow w-100 position-relative" id="login" onclick="fn_signUpProc();">
                                                    sign up
                                                    <i id="icon-arrow" class="bx bx-right-arrow-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- login page ends -->

            </div>
        </div>
    </div>
    <!-- END: Content-->
    <%@ include file="/WEB-INF/views/include/script.jsp" %>
</body>
<!-- END: Body-->

</html>

<script type="text/javascript">

    var idCheck = false;
    $(function (){
        $('#userId').on('keydown', function(e){
            $("#check")
                .removeClass('btn-success')
                .addClass('btn-danger')
                .text('중복체크');
            idCheck = false;
            if(e.keyCode == '13'){
                $("#userPw").focus();
            }
        });

        $('#userPw').on('keydown', function(e){
            if(e.keyCode == '13'){
                $("#userName").focus();
            }
        });

        $('#userName').on('keydown', function(e){
            if(e.keyCode == '13'){
                $("#userPhone").focus();
            }
        });

        $('#userPhone').on('keydown', function(e){
            if(e.keyCode == '13'){
                $("#userEmail").focus();
            }
        });

        $('#userEmail').on('keydown', function(e){
            if(e.keyCode == '13'){
                fn_signUpProc();
            }
        });
    });

    // 아이디 중복체크
    function fn_idCheck(){
        let data = {
            userId : $("#userId").val()
        }

        getAjax("check", "/check", data, fn_succ_check, fn_error);
    }
    // 아이디 중복체크 결과
    function fn_succ_check(dst_id, response, param){
        if(!isEmpty(response)){
            alert("아이디가 있습니다.");
            return;
        }
        alert("사용가능한 아이디 입니다.");
        $("#check")
            .removeClass('btn-danger')
            .addClass('btn-success')
            .text('중복체크완료');
        idCheck = true;
    }
    // 회원가입
    function fn_signUpProc(){
        if(valid) {
            let data = {
                userId: $("#userId").val()
                , userPw: $("#userPw").val()
                , userName: $("#userName").val()
                , userPhone: $("#userPhone").val()
                , userEmail: $("#userEmail").val()
            }

            getAjax("signUp", "/signUpProc", data, fn_succ_signUp, fn_error);
        }
    }

    function valid(){
            if(!idCheck){
            alert('id 중복체크 필수!');
            return false;
        }
        if(isEmpty($("#userId").val())){
            alert('id를 입력해주세요.');
            $("#id").focus();
            return false;
        }

        if(isEmpty($("#userPw").val())){
            alert('password를 입력해주세요.');
            $("#userPw").focus();
            return false;
        }

        if(isEmpty($("#userName").val())){
            alert('이름을 입력해주세요.');
            $("#userName").focus();
            return false;
        }

        if(isEmpty($("#userPhone").val())){
            alert('휴대폰 번호를 입력해주세요.');
            $("#userPhone").focus();
            return false;
        }

        if(isEmpty($("#userEmail").val())){
            alert('email을 입력해주세요.');
            $("#userEmail").focus();
            return false;
        }
        return true;
    }

    function fn_succ_signUp(dst_id, response, param){
        //ajax response data는 공통 스크립트에 console.log 찍어둠 -> 필요한 데이터만 사용하기!
        // response null 넘어오는데 나중에 message 처리하기
        isEmpty(response) ?  alert("회원가입 실패[관리자에게 문의]") : alert(response.message);
        location.href = '/login';
    }

    function fn_error(response){
        console.log(response);
        console.log('error');
        location.href = '/login';
    }
</script>