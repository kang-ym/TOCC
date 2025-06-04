// scroll-anim.js
// 스크롤 위치에 따라 .scroll-fade 요소가 서서히 나타나고 사라지는 애니메이션 구현

document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".scroll-fade");

    const updateVisibility = () => {
        const viewportHeight = window.innerHeight;

        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const top = rect.top;       // 요소의 상단 위치 (화면 기준)
            const bottom = rect.bottom; // 요소의 하단 위치 (화면 기준)
            const height = rect.height;

            // ✅ 나타나기: 요소가 거의 다 들어왔을 때 (bottom이 화면 아래에서 10% 남았을 때)
            const visibleStart = viewportHeight - height * 0.1;

            // ✅ 사라지기: 요소 하단이 화면 위에서 10% 아래에 도달했을 때
            const fadeOutStart = 0 - height * 0.6;

            // ✅ fade 범위 안에 있으면 비율 계산하여 opacity 적용
            if (bottom > fadeOutStart && top < visibleStart) {
                // bottom이 fadeOutStart에 가까울수록 opacity가 줄어듬
                const fadeInRatio = Math.min((bottom - fadeOutStart) / (visibleStart - fadeOutStart), 1);
                el.style.opacity = fadeInRatio.toFixed(2);
                el.style.transform = `translateY(${(1 - fadeInRatio) * 30}px)`;
            } else {
                el.style.opacity = 0;
                el.style.transform = `translateY(30px)`;
            }
        });

        // ✅ 매 프레임마다 업데이트
        requestAnimationFrame(updateVisibility);
    };

    requestAnimationFrame(updateVisibility);
});




document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal-once");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target); // ✅ 한 번만 실행하고 해제
            }
        });
    }, {
        threshold: 0.2
    });

    revealElements.forEach(el => observer.observe(el));
});
