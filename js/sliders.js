document.addEventListener('DOMContentLoaded', function () {
    // Ensure Swiper styles are added
    if (!document.querySelector('#swiper-styles')) {
        const style = document.createElement('style');
        style.id = 'swiper-styles';
        style.textContent = `
            .animate-zoom-in {
                animation: zoomIn 0.8s ease forwards;
            }
            @keyframes zoomIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .lightbox.active {
                opacity: 1;
                display: flex;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                display: block;
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            }
            .lightbox.active .lightbox-content img {
                transform: scale(1);
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 30px;
                color: white;
                cursor: pointer;
            }
            .no-scroll {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }

    // Project Slider
    const projectSlider = document.querySelector('.project-slider');
    const projectThumbnails = document.querySelector('.project-thumbnails');
    if (projectSlider && projectThumbnails) {
        const thumbnailSlider = new Swiper('.project-thumbnails', {
            slidesPerView: 4,
            spaceBetween: 10,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                320: { slidesPerView: 3, spaceBetween: 5 },
                576: { slidesPerView: 4, spaceBetween: 10 },
                992: { slidesPerView: 5, spaceBetween: 10 }
            }
        });

        new Swiper('.project-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 800,
            grabCursor: true,
            keyboard: { enabled: true },
            thumbs: { swiper: thumbnailSlider },
            on: {
                init: function () {
                    const activeSlide = document.querySelector('.swiper-slide-active');
                    if (activeSlide) activeSlide.classList.add('animate-zoom-in');
                },
                slideChangeTransitionStart: function () {
                    document.querySelectorAll('.swiper-slide').forEach(slide => {
                        slide.classList.remove('animate-zoom-in');
                    });
                },
                slideChangeTransitionEnd: function () {
                      const activeSlide = document.querySelector('.swiper-slide-active');
    const img = activeSlide?.querySelector('img');
    if (img && !img.complete) {
        img.onload = () => activeSlide.classList.add('animate-zoom-in');
    } else {
        activeSlide?.classList.add('animate-zoom-in');
    }
                }
            }
        });
    } else if (projectSlider) {
        new Swiper('.project-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            effect: 'fade',
            fadeEffect: { crossFade: true },
            speed: 800,
            grabCursor: true,
            keyboard: { enabled: true },
            on: {
                init: function () {
                    const activeSlide = document.querySelector('.swiper-slide-active');
                    if (activeSlide) activeSlide.classList.add('animate-zoom-in');
                },
                slideChangeTransitionStart: function () {
                    document.querySelectorAll('.swiper-slide').forEach(slide => {
                        slide.classList.remove('animate-zoom-in');
                    });
                },
                slideChangeTransitionEnd: function () {
                        const activeSlide = document.querySelector('.swiper-slide-active');
                }
            }
        });
    }

    // Related Projects Slider
    const relatedSlider = document.querySelector('.related-slider');
    if (relatedSlider) {
        new Swiper('.related-slider', {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 10 },
                576: { slidesPerView: 2, spaceBetween: 15 },
                992: { slidesPerView: 3, spaceBetween: 20 }
            }
        });
    }

    // Lightbox
    let lightbox = null;
    const projectImages = document.querySelectorAll('.project-slide-img');
    if (projectImages.length > 0) {
        projectImages.forEach(image => {
            image.addEventListener('click', function (e) {
                e.stopPropagation();
                const src = this.getAttribute('src');

                if (!lightbox) {
                    lightbox = document.createElement('div');
                    lightbox.classList.add('lightbox');
                    const lightboxContent = document.createElement('div');
                    lightboxContent.classList.add('lightbox-content');
                    const lightboxImg = document.createElement('img');
                    lightboxImg.classList.add('lightbox-img');
                    const closeBtn = document.createElement('span');
                    closeBtn.classList.add('lightbox-close');
                    closeBtn.innerHTML = '×';
                    lightboxContent.appendChild(lightboxImg);
                    lightboxContent.appendChild(closeBtn);
                    lightbox.appendChild(lightboxContent);
                    document.body.appendChild(lightbox);

                    lightbox.addEventListener('click', function (e) {
                        if (e.target === lightbox || e.target === closeBtn) {
                            lightbox.classList.remove('active');
                            setTimeout(() => {
                                lightbox.style.display = 'none';
                                document.body.classList.remove('no-scroll');
                            }, 300);
                        }
                    });
                }

                lightbox.querySelector('.lightbox-img').setAttribute('src', src);
                lightbox.style.display = 'flex';
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                document.body.classList.add('no-scroll');
            });
        });
    }
});