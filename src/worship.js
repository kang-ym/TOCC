document.addEventListener('DOMContentLoaded', () => {
    const worshipItems = document.querySelectorAll('.worship-schedule li');
    const descBox = document.getElementById('descText');
    const slider = document.getElementById('imageSlider');
    const slides = document.querySelectorAll('.slide');

    let currentSlide = 0;
    let sliderInterval = null;

    // ✅ 모바일 여부 함수 (한 번만 정의)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // ✅ 슬라이더 실행 (PC 전용)
    function startSlider() {
        if (isMobile()) return;
        sliderInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    // ✅ 이벤트 등록
    worshipItems.forEach((item) => {
        const desc = item.querySelector('.desc');
        const descText = desc?.textContent || '';

        // ✅ PC: hover → 설명 텍스트 표시
        item.addEventListener('mouseenter', () => {
            if (isMobile()) return;
            descBox.textContent = descText;
            slider.classList.add('hidden');
            descBox.classList.add('visible');
            stopSlider();
        });

        item.addEventListener('mouseleave', () => {
            if (isMobile()) return;
            descBox.textContent = '';
            slider.classList.remove('hidden');
            descBox.classList.remove('visible');
            startSlider();
        });

        // ✅ 모바일: 클릭 → 아코디언 열기
        item.addEventListener('click', () => {
            if (!isMobile()) return;

            const isActive = item.classList.contains('active');

            // 모든 항목 닫기
            worshipItems.forEach((el) => el.classList.remove('active'));

            // 본인이 닫힌 상태였다면 다시 열기
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ✅ 초기 슬라이더 시작 (PC만)
    startSlider();
});
