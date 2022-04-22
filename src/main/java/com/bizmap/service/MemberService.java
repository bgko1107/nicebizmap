package com.bizmap.service;


import com.bizmap.repository.MemberRepository;
import com.bizmap.vo.MemberVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public List<MemberVo> findAll() {
        List<MemberVo> members = new ArrayList<>();
        memberRepository.findAll().forEach(e -> members.add(e));
        return members;
    }

    public List<MemberVo> findByUserId(String userId) {
        List<MemberVo> member = memberRepository.findByUserId(userId);
        return member;
    }

    public List<MemberVo> findByUserName(String userId) {
        List<MemberVo> member = memberRepository.findByUserName(userId);
        return member;
    }

//    public void deleteByUserId(String userId) {
//        memberRepository.deleteByUserId(userId);
//    }
//
//    public MemberVo save(MemberVo member) {
//        memberRepository.save(member);
//        return member;
//    }

//    public void updateByUserId(String userId, MemberVo member) {
//        Optional<MemberVo> e = memberRepository.findById(userId);
//
//        if (e.isPresent()) {
//            e.get().setUserId(member.getUserId());
//            e.get().setUserName(member.getUserName());
//            memberRepository.save(member);
//        }
//    }
}
