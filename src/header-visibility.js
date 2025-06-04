const header = document.querySelector("header");
const heroText = document.querySelector(".hero-text");
const heroSection = document.querySelector("#home");
const frontLayer = document.querySelector(".layer-front");
const middleLayer = document.querySelector(".layer-middle");
const backLayer = document.querySelector(".layer-back");
const homeSection = document.querySelector("#home");
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navBox = document.getElementById('navBox');

// ✅ 모바일 여부 확인 함수
const isMobile = () => window.innerWidth <= 768;

let isHeroVisible = true;

// ✅ IntersectionObserver → hero 영역 벗어나면 텍스트 숨김
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

// ✅ IntersectionObserver → home 기준으로 header 배경색 제어 (모바일 제외)
const headerBgObserver = new IntersectionObserver(
    ([entry]) => {
        if (isMobile()) return; // 모바일에서는 배경색 변경 X
        if (!entry.isIntersecting) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    },
    { threshold: 0.1 }
);
headerBgObserver.observe(homeSection);

// ✅ 스크롤 시 헤더 숨김 (모바일 제외)
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight;
    const headerTriggerY = heroTop + heroHeight * 0.1;

    if (!isMobile()) {
        if (scrollY > headerTriggerY) {
            header.classList.remove("show");
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
            header.classList.add("show");
        }
    }

    // ✅ Hero 텍스트, Layer 애니메이션은 모든 화면에서 작동
    const triggerStart = heroTop + heroHeight * 0.05;
    const triggerEnd = heroTop + heroHeight * 0.55;
    const scrollRange = triggerEnd - triggerStart;
    const inRange = scrollY >= triggerStart && scrollY <= triggerEnd;

    if (isHeroVisible) {
        const offset = scrollY;
        const maxOffset = 300;
        const translateY = Math.min(offset * 0.9, maxOffset);
        heroText.style.transform = `translateY(${translateY}px)`;

        const fadeOutStart = triggerEnd - 350;
        const fadeRatio = Math.min(Math.max((scrollY - fadeOutStart) / 250, 0), 1);
        heroText.style.zIndex = fadeRatio > 0.5 ? "0" : "10";
        heroText.style.opacity = `${1 - fadeRatio}`;
        heroText.style.filter = `blur(${fadeRatio * 2}px)`;
    }

    if (inRange) {
        const ratio = (scrollY - triggerStart) / scrollRange;
        frontLayer.style.transform = `translateX(-${ratio * 300}px)`;
        const scale = 1 + ratio * 0.2;
        const middleY = ratio * -30;
        middleLayer.style.transform = `translateY(${middleY}px) scale(${scale})`;
        backLayer.style.transform = `translateY(${ratio * 60}px)`;
        backLayer.style.opacity = `${1 - ratio * 0.4}`;
    }

    if (scrollY > triggerEnd) {
        frontLayer.style.transform = `translateX(-250px)`;
        middleLayer.style.transform = `translateY(-30px) scale(1.2)`;
        backLayer.style.transform = `translateY(60px)`;
        backLayer.style.opacity = `0.6`;
    }

    if (scrollY < triggerStart) {
        frontLayer.style.transform = `translateX(0px)`;
        middleLayer.style.transform = `translateY(0px) scale(1)`;
        backLayer.style.transform = `translateY(0px)`;
        backLayer.style.opacity = `1`;
    }
});

// ✅ 마우스 위로 올리면 헤더 보임 (데스크탑 전용)
document.body.addEventListener("mousemove", (e) => {
    if (isMobile()) return;
    if (e.clientY < 80) {
        header.classList.add("show");
        header.classList.remove("hide");
    }
});

// ✅ 햄버거 버튼 클릭 시 메뉴 열기
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navBox.classList.toggle('mobile-nav-open');
});

// ✅ 모바일에서 메뉴 항목 클릭 시 메뉴 닫기
const navLinks = document.querySelectorAll('#navBox .nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMobile()) {
            navBox.classList.remove('mobile-nav-open');
            hamburgerBtn.classList.remove('active');
        }
    });
});

// 480px 모바일 전용
const hamburgerBtnMobile = document.getElementById('hamburgerBtnMobile');

hamburgerBtnMobile.addEventListener('click', () => {
    navBox.classList.toggle('mobile-nav-open');
    hamburgerBtnMobile.classList.toggle('active');
});
