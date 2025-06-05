'use strict';

const header = document.querySelector("header");
const heroText = document.querySelector(".hero-text");
const heroSection = document.querySelector("#home");
const frontLayer = document.querySelector(".layer-front");
const middleLayer = document.querySelector(".layer-middle");
const backLayer = document.querySelector(".layer-back");
const navBox = document.getElementById('navBox');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const hamburgerBtnMobile = document.getElementById('hamburgerBtnMobile');

const isMobile = () => window.innerWidth <= 767;
let isHeroVisible = true;

// ✅ hero 영역 기준 텍스트 표시/숨김
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            isHeroVisible = entry.isIntersecting;
            heroText.style.display = isHeroVisible ? "block" : "none";
        });
    },
    { threshold: 0.2 }
);
observer.observe(heroSection);

// ✅ hero 영역 기준 헤더 배경색 (모바일 제외)
const headerBgObserver = new IntersectionObserver(
    ([entry]) => {
        if (isMobile()) return;
        if (!entry.isIntersecting) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    },
    { threshold: 0.1 }
);
headerBgObserver.observe(heroSection);

// ✅ 스크롤 시 헤더 숨김/표시 (모바일 제외)
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (!isMobile()) {
        if (scrollY > lastScrollY && scrollY > 100) {
            header.classList.remove("show");
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
            header.classList.add("show");
        }
    }

    lastScrollY = scrollY;

    // ✅ Hero 애니메이션
    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight;

    let triggerStart, triggerEnd;
    if (isMobile()) {
        triggerStart = 0;
        triggerEnd = 150;
    } else {
        triggerStart = heroTop + heroHeight * 0.05;
        triggerEnd = heroTop + heroHeight * 0.55;
    }

    const scrollRange = triggerEnd - triggerStart;
    const inRange = scrollY >= triggerStart && scrollY <= triggerEnd;

    const offset = scrollY;
    const maxOffset = 300;
    const translateY = Math.min(offset * 0.8, maxOffset);
    if (!isHeroVisible || isMobile()) return;
    heroText.style.transform = `translateY(${translateY}px)`;

    const fadeOutStart = triggerEnd - 200;
    const fadeRatio = Math.min(Math.max((scrollY - fadeOutStart) / 200, 0), 1);
    heroText.style.zIndex = fadeRatio > 0.5 ? "0" : "10";
    heroText.style.opacity = `${1 - fadeRatio}`;
    heroText.style.filter = `blur(${fadeRatio * 2}px)`;

    if (inRange || isMobile()) {
        const ratio = isMobile()
            ? Math.min(scrollY / scrollRange, 1)
            : (scrollY - triggerStart) / scrollRange;

        frontLayer.style.transform = `translateX(-${ratio * 300}px)`;
        middleLayer.style.transform = `translateY(${-ratio * 30}px) scale(${1 + ratio * 0.2})`;
        backLayer.style.transform = `translateY(${ratio * 60}px)`;
        backLayer.style.opacity = `${1 - ratio * 0.4}`;
    }
});

// ✅ 마우스가 위로 올라오면 헤더 표시 (데스크탑만)
document.body.addEventListener("mousemove", (e) => {
    if (isMobile()) return;
    if (e.clientY < 80) {
        header.classList.add("show");
        header.classList.remove("hide");
    }
});

// ✅ 햄버거 버튼 (768 이하 nav 안)
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navBox.classList.toggle('mobile-nav-open');
    });
}

// ✅ 햄버거 버튼 (480 이하 nav 밖)
if (hamburgerBtnMobile) {
    hamburgerBtnMobile.addEventListener('click', () => {
        hamburgerBtnMobile.classList.toggle('active');
        navBox.classList.toggle('mobile-nav-open');
    });
}

// ✅ 모바일 a 태그 클릭 시 메뉴 닫기 + 버튼 상태 초기화
const navLinks = document.querySelectorAll('#navBox .nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMobile()) {
            navBox.classList.remove('mobile-nav-open');
            if (hamburgerBtnMobile) hamburgerBtnMobile.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        }
    });
});
