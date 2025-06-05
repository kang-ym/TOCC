'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const worshipItems = document.querySelectorAll('.worship-schedule li');
    const descBox = document.getElementById('descText');
    const slider = document.getElementById('imageSlider');
    const slides = document.querySelectorAll('.slide');

    let currentSlide = 0;
    let sliderInterval;

    const isMobile = window.innerWidth <= 767;

    function startSlider() {
        sliderInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    function showDesc(text) {
        descBox.textContent = text;
        descBox.classList.add('visible');
        slider.classList.add('hidden');
    }

    function hideDesc() {
        descBox.textContent = '';
        descBox.classList.remove('visible');
        slider.classList.remove('hidden');
    }

    if (!isMobile) {
        // ✅ PC용: Hover 시 설명
        worshipItems.forEach(item => {
            const desc = item.querySelector('.desc')?.textContent || '';

            item.addEventListener('mouseenter', () => {
                showDesc(desc);
                stopSlider();
            });

            item.addEventListener('mouseleave', () => {
                hideDesc();
                startSlider();
            });
        });

        startSlider();
    } else {
        // ✅ 모바일용: 아코디언 효과 (자연스러운 transition)
        worshipItems.forEach(item => {
            const desc = item.querySelector('.desc');

            item.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // 다른 아이템 모두 닫기
                worshipItems.forEach(el => {
                    el.classList.remove('active');
                    const elDesc = el.querySelector('.desc');
                    elDesc.style.maxHeight = null;
                    elDesc.style.paddingTop = '0';
                    elDesc.style.paddingBottom = '0';
                });

                if (!isOpen) {
                    item.classList.add('active');
                    const padding = 16;
                    desc.style.maxHeight = (desc.scrollHeight + padding) + 'px';
                    desc.style.paddingTop = '8px';
                    desc.style.paddingBottom = '8px';
                }
            });
        });

        // ✅ 모바일: 진입 시 랜덤 이미지 보여주기
        const randomIndex = Math.floor(Math.random() * slides.length);
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === randomIndex);
        });
    }
});
