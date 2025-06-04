const worshipItems = document.querySelectorAll('.worship-schedule li');
const descBox = document.getElementById('descText');
const slider = document.getElementById('imageSlider');

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let sliderInterval;

// ✅ 슬라이더 자동 작동
function startSlider() {
    sliderInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);
}

// ✅ 슬라이더 정지
function stopSlider() {
    clearInterval(sliderInterval);
}

// ✅ 예배 항목 hover 시 이미지 → 설명 전환
worshipItems.forEach(item => {
    const desc = item.querySelector('.desc')?.textContent || '';

    item.addEventListener('mouseenter', () => {
        descBox.textContent = desc;
        slider.classList.add('hidden');     // 이미지 슬라이더 숨김
        descBox.classList.add('visible');   // 설명 표시
        stopSlider();
    });

    item.addEventListener('mouseleave', () => {
        descBox.textContent = '';
        slider.classList.remove('hidden');  // 이미지 다시 보이기
        descBox.classList.remove('visible');// 설명 숨김
        startSlider();
    });
});

// ✅ 시작 시 슬라이더 실행
startSlider();
