window.carousel = function()
{
    return {

        minimised : true,
        pictureReserve : [],
        leftArrow: true,
        rightArrow: true,

        initCarousel()
        {
            this.pictureReserve = [];

            let width = document.getElementById('carousel_inhalt').clientWidth;
            let firstImage = this.$refs.carousel.querySelector('.element');
            let images = this.$refs.carousel.querySelectorAll('.element');
            images.forEach(item => item.classList.add('hidden'))

            firstImage.classList.remove('hidden');

            let imageLength = firstImage.offsetWidth;

            let imageChunk = Math.floor(width/imageLength);

            for (let i = 0; i < imageChunk; i++) {
                images[i].classList.remove('hidden')
            }
            let nodeList = this.$refs.carousel.querySelectorAll('.element.hidden ');

            nodeList.forEach( item => this.pictureReserve.push(item.dataset.marker));


        },

        swiperLeft()
        {
            let visiableImages = this.$refs.carousel.querySelectorAll('.element:not(.hidden) ');

            let movedImage = visiableImages[0];

            movedImage.classList.add('hidden');

            let markerToHide = movedImage.dataset.marker;

            this.pictureReserve.unshift(markerToHide);

            let markerToShow = this.pictureReserve.pop();

            let imageToShow = this.$refs.carousel.querySelector(`[data-marker="${markerToShow}"]`)
            imageToShow.classList.remove('hidden');

            document.getElementById('carousel_inhalt').append(imageToShow)
        },

        swiperRight()
        {
            let visiableImages = this.$refs.carousel.querySelectorAll('.element:not(.hidden) ');

            let movedImage = visiableImages[visiableImages.length - 1];

            movedImage.classList.add('hidden');

            let markerToHide = movedImage.dataset.marker;

            this.pictureReserve.push(markerToHide);

            let markerToShow = this.pictureReserve.shift();

            let imageToShow = this.$refs.carousel.querySelector(`[data-marker="${markerToShow}"]`)
            imageToShow.classList.remove('hidden');

            document.getElementById('carousel_inhalt').prepend(imageToShow)
        }

    }
}




//gesture on screen are added



    let container = document.getElementById('carousel_container');

    let listener = SwipeListener(container);
    container.addEventListener('swipe', function (e) {
        let directions = e.detail.directions;


        if (directions.left) {
            window.dispatchEvent(new CustomEvent('swipe-left'));
        }

        if (directions.right) {
            window.dispatchEvent(new CustomEvent('swipe-right'));
        }

    });
