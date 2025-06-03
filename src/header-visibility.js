const header = document.querySelector("header");
const heroText = document.querySelector(".hero-text");
const heroSection = document.querySelector("#home");
const frontLayer = document.querySelector(".layer-front");
const middleLayer = document.querySelector(".layer-middle");
const backLayer = document.querySelector(".layer-back");

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

// ✅ 스크롤 시 애니메이션
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight;

    // ✅ 헤더 트리거 기준 (home의 10% 넘어가면 hide)
    const headerTriggerY = heroTop + heroHeight * 0.1;
    if (scrollY > headerTriggerY) {
        header.classList.remove("show");
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
        header.classList.add("show");
    }

    // ✅ scroll range 계산 (5%~60%)
    const triggerStart = heroTop + heroHeight * 0.05;
    const triggerEnd = heroTop + heroHeight * 0.55;
    const scrollRange = triggerEnd - triggerStart;
    const inRange = scrollY >= triggerStart && scrollY <= triggerEnd;

    // ✅ .hero-text 이동 + 사라지는 효과
    if (isHeroVisible) {
        const offset = scrollY;
        const maxOffset = 200;
        const translateY = Math.min(offset * 0.7, maxOffset);
        heroText.style.transform = `translateY(${translateY}px)`;

        // 다음 섹션과 겹치기 전 자연스럽게 사라짐
        const fadeOutStart = triggerEnd - 350;
        const fadeRatio = Math.min(Math.max((scrollY - fadeOutStart) / 250, 0), 1);
        heroText.style.zIndex = fadeRatio > 0.5 ? "0" : "10";
        heroText.style.opacity = `${1 - fadeRatio}`;
        heroText.style.filter = `blur(${fadeRatio * 2}px)`;
    }

    // ✅ layer 애니메이션
    if (inRange) {
        const ratio = (scrollY - triggerStart) / scrollRange;

        // front: 왼쪽 이동
        frontLayer.style.transform = `translateX(-${ratio * 300}px)`;

        // middle: 확대 + 위로 이동
        const scale = 1 + ratio * 0.2;
        const middleY = ratio * -30;
        middleLayer.style.transform = `translateY(${middleY}px) scale(${scale})`;

        // back: 아래로 이동 + 흐려짐
        const backY = ratio * 60;
        const backOpacity = 1 - ratio * 0.4;
        backLayer.style.transform = `translateY(${backY}px)`;
        backLayer.style.opacity = `${backOpacity}`;
    }

    // ✅ 범위 초과 고정
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

// ✅ 마우스가 화면 위로 올라오면 헤더 표시
document.body.addEventListener("mousemove", (e) => {
    if (e.clientY < 80) {
        header.classList.add("show");
        header.classList.remove("hide");
    }
});
