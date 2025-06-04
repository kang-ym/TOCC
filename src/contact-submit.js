// contact-submit.js

// ✅ EmailJS 초기화 (본인의 USER ID로 교체)
(function () {
    emailjs.init("demo_user_ABC123"); // 🟡 여기를 본인 ID로 바꿔주세요
})();

// ✅ 폼 제출 이벤트 리스너
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("すべての項目を入力してください。");
            return;
        }

        emailjs.send("service_demo123", "template_contact123", {
            name: name,
            email: email,
            message: message
        }).then(function (response) {
            alert("送信されました。ありがとうございます！");
            form.reset();
        }, function (error) {
            alert("エラーが発生しました。もう一度お試しください。");
            console.error("送信エラー:", error);
        });
    });
});
