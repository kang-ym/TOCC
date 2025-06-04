const header = document.querySelector("header");
const heroText = document.querySelector(".hero-text");
const heroSection = document.querySelector("#home");
const frontLayer = document.querySelector(".layer-front");
const middleLayer = document.querySelector(".layer-middle");
const backLayer = document.querySelector(".layer-back");
const homeSection = document.querySelector("#home"); // ✅ 배경색 기준을 HOME으로 변경

let lastScrollY = window.scrollY;
let isHeroVisible = true;

// ✅ IntersectionObserver → home 영역 벗어나면 텍스트 숨김
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

// ✅ IntersectionObserver → home 섹션을 기준으로 header 배경색 제어
const headerBgObserver = new IntersectionObserver(
    ([entry]) => {
        if (!entry.isIntersecting) {
            header.classList.add("scrolled");   // ✅ 홈 벗어나면 배경 ON
        } else {
            header.classList.remove("scrolled"); // ✅ 홈 안에 있으면 배경 OFF
        }
    },
    { threshold: 0.1 }
);
headerBgObserver.observe(homeSection);

// ✅ 스크롤 시 애니메이션 동작 처리
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight;

    // ✅ 헤더 트리거 기준 (home의 10% 넘으면 hide)
    const headerTriggerY = heroTop + heroHeight * 0.1;
    if (scrollY > headerTriggerY) {
        header.classList.remove("show");
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
        header.classList.add("show");
    }

    // ✅ scroll range 계산 (5%~55%)
    const triggerStart = heroTop + heroHeight * 0.05;
    const triggerEnd = heroTop + heroHeight * 0.55;
    const scrollRange = triggerEnd - triggerStart;
    const inRange = scrollY >= triggerStart && scrollY <= triggerEnd;

    // ✅ .hero-text 이동 및 사라짐
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

    // ✅ layer 이동 애니메이션
    if (inRange) {
        const ratio = (scrollY - triggerStart) / scrollRange;

        // front: 왼쪽으로 이동
        frontLayer.style.transform = `translateX(-${ratio * 300}px)`;

        // middle: 확대 + 약간 위로
        const scale = 1 + ratio * 0.2;
        const middleY = ratio * -30;
        middleLayer.style.transform = `translateY(${middleY}px) scale(${scale})`;

        // back: 아래로 이동 + 흐려짐
        const backY = ratio * 60;
        const backOpacity = 1 - ratio * 0.4;
        backLayer.style.transform = `translateY(${backY}px)`;
        backLayer.style.opacity = `${backOpacity}`;
    }

    // ✅ 종료 후 고정 위치
    if (scrollY > triggerEnd) {
        frontLayer.style.transform = `translateX(-250px)`;
        middleLayer.style.transform = `translateY(-30px) scale(1.2)`;
        backLayer.style.transform = `translateY(60px)`;
        backLayer.style.opacity = `0.6`;
    }

    // ✅ 시작 전 초기화
    if (scrollY < triggerStart) {
        frontLayer.style.transform = `translateX(0px)`;
        middleLayer.style.transform = `translateY(0px) scale(1)`;
        backLayer.style.transform = `translateY(0px)`;
        backLayer.style.opacity = `1`;
    }
});

// ✅ 마우스가 화면 위로 올라오면 헤더 다시 보임
document.body.addEventListener("mousemove", (e) => {
    if (e.clientY < 80) {
        header.classList.add("show");
        header.classList.remove("hide");
    }
});
