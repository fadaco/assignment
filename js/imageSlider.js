var imageSlide = (function () {

    let imageArray = [];
    let slideIndex = 1;
    const BASE_URL = 'https://5e0df4b536b80000143db9ca.mockapi.io/etranzact/v1/article';


    function getImagesFromArticles() {
        fetch(`${BASE_URL}`)
            .then((res) => res.json())
            .then((data) => {
                displayImageInArray(data);
            })
            .catch((err) => console.log(err));
    }

    function displayImageInArray(data) {
        data.forEach((item) => {
            imageArray.push(item.avatar);
        })

        displaySlideShow(imageArray);
    }

    function displaySlideShow(images) {
        let parenChild = document.querySelector('#imageSlider');
        images.forEach((item) => {
            let imgHoder = document.createElement('div');
            imgHoder.classList.add('imgContainerSlide', 'fade');
            let imgCon = document.createElement('img');
         imgCon.src = item;
            imgHoder.appendChild(imgCon);
            parenChild.appendChild(imgHoder);

        });

        let controlPrev = document.createElement('a');
        controlPrev.classList.add('prevBtn');
        let controlPrevText = document.createTextNode('prev');
        controlPrev.appendChild(controlPrevText);
        parenChild.appendChild(controlPrev);

        let controlNext = document.createElement('a');
        controlNext.classList.add('nextBtn');
        let controlNextText = document.createTextNode('next');
        controlNext.appendChild(controlNextText);
        parenChild.appendChild(controlNext);



        showSlides(slideIndex);

    }

    function nextBtn() {
        window.addEventListener('click', function (e) {
            if (e.target.className === 'nextBtn') {
                showSlides(slideIndex += 1);
            } else if (e.target.className === 'prevBtn'){
                showSlides(slideIndex += -1);
            }
        })
    }

    
    function showSlides(n) {
        let i;
        let slide = document.querySelectorAll('.imgContainerSlide');
        let slides = Array.from(slide);
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {

            slides[i].style.display = "none";
        }

        slides[slideIndex-1].style.display = "block";
       /* for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        setTimeout(showSlides, 2000); */
    }



    function init() {
        getImagesFromArticles();
        nextBtn();
    }

    return {
        init: init
    }

}());