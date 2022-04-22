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
                                                    <label class="text-bold-600" for="id">아이디</label>
                                                    <input type="text" class="form-control" id="id"  placeholder="id"></div>
                                                <div class="form-group">
                                                    <label class="text-bold-600" for="password">비밀번호</label>
                                                    <input type="password" class="form-control" id="password" placeholder="Password">
                                                </div>
                                                <div class="form-group d-flex flex-md-row flex-column justify-content-between align-items-center">
<%--                                                        <div class="text-left">--%>
<%--                                                            <div class="checkbox checkbox-sm">--%>
<%--                                                                <input type="checkbox" class="form-check-input" id="exampleCheck1">--%>
<%--                                                                <label class="checkboxsmall" for="exampleCheck1"><small>Keep me logged--%>
<%--                                                                        in</small></label>--%>
<%--                                                            </div>--%>
<%--                                                        </div>--%>
                                                    <div class="text-right">
                                                        <a class="card-link" href="javascript:;" onclick="alert('관리자에게 문의')">
                                                            <small>Forgot Password?</small>
                                                        </a>
                                                    </div>
                                                    <div class="text-right">
                                                        <a class="card-link" href="javascript:;" onclick="fn_signUp();">
                                                            <small>sign up</small>
                                                        </a>
                                                    </div>
                                                </div>
                                                <button type="button" class="btn btn-primary glow w-100 position-relative" id="login" onclick="fn_loginProc();">
                                                    Login
                                                    <i id="icon-arrow" class="bx bx-right-arrow-alt"></i>
                                                </button>
                                                </div>
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
</body>
<!-- END: Body-->

</html>

<%@ include file="/WEB-INF/views/include/script.jsp" %>

<script type="text/javascript">

    $(function (){
        $('#id').on('keydown', function(e){
            if(e.keyCode == '13'){
                $("#password").focus();
            }
        });

        $('#password').on('keydown', function(e){
            if(e.keyCode == '13'){
                fn_loginProc();
            }
        });
    });

    function fn_loginProc(){

        if(isEmpty($("#id").val())){
            alert('id를 입력해주세요.');
            $("#id").focus();
            return;
        }
        if(isEmpty($("#password").val())){
            alert('password를 입력해주세요.');
            $("#password").focus();
            return;
        }

        let data = {
            id : $("#id").val()
            , password : $("#password").val()
        }

        getAjax("login", "/loginProc", data, fn_succ_login, fn_error);
    }
    function fn_succ_login(dst_id, response, param){
        //ajax response data는 공통 스크립트에 console.log 찍어둠 -> 필요한 데이터만 사용하기!
        console.log("fn_succ_login...");
        if(isEmpty(response)){
            alert("계정정보가 없습니다. 다시 입력해주세요.");
        }else{
            location.href = 'index_m';
        }
    }

    function fn_signUp(){
        alert('회원가입 하러가자');
        window.location = "signUp";
    }

    function fn_error(response){
        console.log(response);
        console.log('error');
    }
</script>