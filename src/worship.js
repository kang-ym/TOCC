"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const worshipItems = document.querySelectorAll(".worship-schedule li");
  const descBox = document.getElementById("descText");
  const slider = document.getElementById("imageSlider");
  const slides = document.querySelectorAll(".slide");

  let currentSlide = 0;
  let sliderInterval;

  const isMobile = window.innerWidth <= 767;

  function startSlider() {
    sliderInterval = setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 4000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  function showDesc(text) {
    descBox.textContent = text;
    descBox.classList.add("visible");
    slider.classList.add("hidden");
  }

  function hideDesc() {
    descBox.textContent = "";
    descBox.classList.remove("visible");
    slider.classList.remove("hidden");
  }

  if (!isMobile) {
    // ✅ PC용: Hover 시 설명
    worshipItems.forEach((item) => {
      const desc = item.querySelector(".desc")?.textContent || "";

      item.addEventListener("mouseenter", () => {
        showDesc(desc);
        stopSlider();
      });

      item.addEventListener("mouseleave", () => {
        hideDesc();
        startSlider();
      });
    });

    startSlider();
  } else {
    // ✅ 모바일용: 아코디언 효과 (자연스러운 transition)
    worshipItems.forEach((item) => {
      const desc = item.querySelector(".desc");

      item.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        // 다른 아이템 모두 닫기
        worshipItems.forEach((el) => {
          el.classList.remove("active");
          const elDesc = el.querySelector(".desc");
          elDesc.style.maxHeight = null;
          elDesc.style.paddingTop = "0";
          elDesc.style.paddingBottom = "0";
        });

        if (!isOpen) {
          item.classList.add("active");
          const padding = 16;
          desc.style.maxHeight = desc.scrollHeight + padding + "px";
          desc.style.paddingTop = "8px";
          desc.style.paddingBottom = "8px";
        }
      });
    });

    // ✅ 모바일: 진입 시 랜덤 이미지 보여주기
    const randomIndex = Math.floor(Math.random() * slides.length);
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === randomIndex);
    });
  }
});

// =============================
// Lightbox for worship slider
// =============================
(function () {
  const slider = document.getElementById("imageSlider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll("img.slide"));
  if (!slides.length) return;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox || !lightboxImg || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function render(index) {
    currentIndex = index;
    const src = slides[currentIndex].getAttribute("src");
    const alt = slides[currentIndex].getAttribute("alt") || "";
    lightboxImg.setAttribute("src", src);
    lightboxImg.setAttribute("alt", alt);
  }

  function openLightbox(index) {
    render(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.removeAttribute("src");
    document.body.style.overflow = "";
  }

  function showPrev() {
    const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    render(nextIndex);
  }

  function showNext() {
    const nextIndex = (currentIndex + 1) % slides.length;
    render(nextIndex);
  }

  // Click image -> open
  slides.forEach((img, i) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(i));
  });

  // Buttons
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });

  // Close (X / backdrop)
  lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
})();
