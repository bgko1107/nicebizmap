package com.bizmap.controller;

import com.bizmap.service.MemberService;
import com.bizmap.vo.MemberVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("memberTest")
public class MemberController {
    // 기본형
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    MemberService memberService;

    // 모든 회원 조회
    @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<List<MemberVo>> getAllmembers() {
        List<MemberVo> member = memberService.findAll();
        return new ResponseEntity<List<MemberVo>>(member, HttpStatus.OK);
    }

    // 로그인 아이디로 한명의 회원 조회
    @GetMapping(value = "/{userId}", produces = { MediaType.APPLICATION_JSON_VALUE })
    public ResponseEntity<MemberVo> getMember(@PathVariable("userId") String userId) {
        List<MemberVo> member = memberService.findByUserId(userId);
        return new ResponseEntity<MemberVo>(member.get(0), HttpStatus.OK);
    }

    // 회원번호로 회원 삭제
//    @DeleteMapping(value = "/{userId}", produces = { MediaType.APPLICATION_JSON_VALUE })
//    public ResponseEntity<Void> deleteMember(@PathVariable("userId") Long userId) {
//        memberService.deleteByUserId(userId);
//        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//    }

    // 회원번호로 회원 수정(mbrNo로 회원을 찾아 Member 객체의 id, name로 수정함)
//    @PutMapping(value = "/{userId}", produces = { MediaType.APPLICATION_JSON_VALUE })
//    public ResponseEntity<MemberVo> updateMember(@PathVariable("userId") Long userId, MemberVo member) {
//        memberService.updateById(userId, member);
//        return new ResponseEntity<MemberVo>(member, HttpStatus.OK);
//    }

    // 회원 입력
//    @PostMapping
//    public ResponseEntity<MemberVo> save(MemberVo member) {
//        return new ResponseEntity<MemberVo>(memberService.save(member), HttpStatus.OK);
//    }

    // 회원 입력
//    @RequestMapping(value="/saveMember", method = RequestMethod.GET)
//    public ResponseEntity<MemberVo> save(HttpServletRequest req, MemberVo member){
//        return new ResponseEntity<MemberVo>(memberService.save(member), HttpStatus.OK);
//    }

}