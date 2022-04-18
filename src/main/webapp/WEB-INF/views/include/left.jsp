<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- BEGIN: Main Menu-->
<div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
    <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
            <li class="nav-item mr-auto"><a class="navbar-brand" href="index">
                    <div class="brand-logo"><img class="logo" src="../resources/app-assets/images/logo/logo.png" /></div>
                    <h2 class="brand-text mb-0">Frest</h2>
                </a></li>
            <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="bx bx-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i class="toggle-icon bx bx-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary" data-ticon="bx-disc"></i></a></li>
        </ul>
    </div>
    <div class="shadow-bottom"></div>
    <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation" data-icon-style="">
            <li class=" navigation-header"><span>예약</span>
            </li>
            <li class=" nav-item"><a href="reservation_sel"><i class="bx bx-calendar"></i><span class="menu-title">조회</span></a>
            </li>
            <li class=" nav-item"><a href="reservation_add"><i class="bx bxs-add-to-queue"></i><span class="menu-title">등록</span></a>
            </li>

            <li class=" navigation-header"><span>드레스</span>
            </li>
            <li class=" nav-item"><a href="dress_sel"><i class="bx bx-list-ul"></i><span class="menu-title"></span>조회</a>
            </li>
            <li class=" nav-item"><a href="dress_add"><i class="bx bxs-t-shirt"></i><span class="menu-title">등록</span></a>
            </li>

            <li class=" navigation-header"><span>관리자</span>
            </li>
            <li class=" nav-item"><a href="notice"><i class="bx bx-error-circle"></i><span class="menu-title">공지사항</span></a>
            </li>
            <li class=" nav-item"><a href="admin"><i class="bx bx-user"></i><span class="menu-title">관리자</span></a>
            </li>
        </ul>
    </div>
</div>
<!-- END: Main Menu-->