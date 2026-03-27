package com.example.demo.service;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendAutoReply(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom("support@safesignal.cloud");
        message.setSubject("[SafeSignal] 문의가 접수되었습니다");
        message.setText(
                "안녕하세요.\n" +
                        "SafeSignal 고객지원팀입니다.\n\n" +
                        "문의가 정상적으로 접수되었습니다.\n" +
                        "확인 후 답변드리겠습니다.\n\n" +
                        "감사합니다.\n" +
                        "SafeSignal 고객지원팀\n" +
                        "이메일: support@safesignal.cloud"
        );

        mailSender.send(message);
    }




}
