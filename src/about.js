const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.getAttribute("data-tab");

        tabButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        tabContents.forEach(content => {
            const isTarget = content.getAttribute("data-tab") === target;
            content.classList.toggle("show", isTarget);
        });
    });
});


// 키워드 설명 기능
const keywordSpans = document.querySelectorAll(".keywords span");
const descriptionBox = document.getElementById("keyword-description");

let lockedKeyword = null;

keywordSpans.forEach(span => {
    // hover 시 설명 표시
    span.addEventListener("mouseenter", () => {
        if (!lockedKeyword) {
            const text = span.getAttribute("data-description");
            descriptionBox.textContent = text;
            descriptionBox.classList.add("visible");
        }
    });

    // hover 해제 시 설명 초기화 (고정된 경우 제외)
    span.addEventListener("mouseleave", () => {
        if (!lockedKeyword) {
            descriptionBox.classList.remove("visible");
            setTimeout(() => {
                if (!descriptionBox.classList.contains("visible")) {
                    descriptionBox.textContent = "上のキーワードにマウスを合わせると、説明が表示されます。";
                }
            }, 400);
        }
    });

    // 클릭 시 고정
    span.addEventListener("click", () => {
        keywordSpans.forEach(s => s.classList.remove("selected"));
        span.classList.add("selected");
        lockedKeyword = span;

        const text = span.getAttribute("data-description");
        descriptionBox.textContent = text;
        descriptionBox.classList.add("visible");
    });
});
