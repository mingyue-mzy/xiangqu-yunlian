document.addEventListener('DOMContentLoaded', function() {

    // Banner 轮播功能
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const totalSlides = slides.length;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove('active');
            slide.style.display = 'none'; // 确保隐藏
        });
        if (slides[index]) {
            slides[index].style.display = 'block'; // 先显示再加 active 以触发动画
            setTimeout(() => { // 确保 display 生效后再加 active
                slides[index].classList.add('active');
            }, 20);
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // 自动播放
    function startSlideShow() {
        if (totalSlides > 1) {
            stopSlideShow(); // 清除已有的定时器
            slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
        }
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // 初始化 Banner
    if (slides.length > 0) {
        showSlide(currentSlide); // 显示第一张
        startSlideShow(); // 开始自动轮播

        // 为手动控制按钮绑定事件 (如果存在)
        const nextButton = document.querySelector('.banner-next');
        const prevButton = document.querySelector('.banner-prev');

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                stopSlideShow(); // 用户手动切换后可以停止自动播放，或重置计时器
                startSlideShow(); // 如果希望继续自动播放则取消注释上一行，并保留此行
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopSlideShow();
                startSlideShow();
            });
        }

        // 鼠标悬停时停止轮播 (可选)
        const bannerElement = document.querySelector('.banner');
        if (bannerElement) {
            bannerElement.addEventListener('mouseenter', stopSlideShow);
            bannerElement.addEventListener('mouseleave', startSlideShow);
        }
    }


    // 农旅服务 - 路线规划表单 (示例性，实际功能需后端配合)
    const routePlannerForm = document.getElementById('routePlannerForm');
    if (routePlannerForm) {
        routePlannerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const preference = document.getElementById('travelPreference').value;
            const duration = document.getElementById('duration').value;
            const generatedRouteDiv = document.getElementById('generatedRoute');

            if (generatedRouteDiv) {
                if (preference) {
                    generatedRouteDiv.innerHTML = `<p>根据您的偏好“<strong>${preference}</strong>”和时长“<strong>${duration}</strong>”，我们推荐以下行程：</p><ul><li>行程点A</li><li>行程点B</li><li>行程点C</li></ul><p><em>(这只是一个示例，实际路线将由系统生成)</em></p>`;
                } else {
                    generatedRouteDiv.innerHTML = `<p style="color:red;">请输入您的旅行偏好以生成路线。</p>`;
                }
            }
            console.log('路线规划提交:', { preference, duration });
        });
    }

    // 农产品商城 - 分类切换 (如果HTML中没有内联JS，则在此处实现)
    // 此功能已在 mall.html 中通过内联 onclick 实现，如果希望移到此处，可以这样做：
    /*
    const tabLinks = document.querySelectorAll('.tab-link');
    const categoryContents = document.querySelectorAll('.category-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const categoryName = this.getAttribute('data-category'); // 假设你在HTML中用 data-category 属性

            categoryContents.forEach(content => {
                content.style.display = 'none';
            });
            tabLinks.forEach(tl => {
                tl.classList.remove('active');
            });

            document.getElementById(categoryName).style.display = 'block';
            this.classList.add('active');
        });
    });
    */

    // 商家入驻表单提交 (示例性，实际功能需后端配合)
    const merchantForm = document.getElementById('merchantApplicationForm');
    if (merchantForm) {
        merchantForm.addEventListener('submit', function(event) {
            // 阻止默认提交，以便进行前端验证或AJAX提交
            // event.preventDefault();
            // console.log('商家入驻表单提交...');
            // alert('您的申请已提交！我们将尽快与您联系。 (此为前端提示，实际提交需后端处理)');
            // 在实际应用中，你可能会在这里进行AJAX请求
        });
    }

    // 平滑滚动到锚点 (可选)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // 确保不是仅有 "#" 的链接，并且目标元素存在
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                document.querySelector(hrefAttribute).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});