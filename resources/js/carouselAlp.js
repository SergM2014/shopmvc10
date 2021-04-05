window.carousel = function()
{
    return {

        minimised : true,
//the width of working area
        leftReserve: [],
        rightReserve:[],

        initCarousel()
        {
            this.leftReserve = [];
            this.rightReserve = [];
            this.$refs.carousel.querySelector('.swiper-left').classList.remove('hidden');
            this.$refs.carousel.querySelector('.swiper-right').classList.remove('hidden');

            let width = document.getElementById('carousel_container').clientWidth;
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

           nodeList.forEach( item => this.rightReserve.push(item.dataset.marker));


        },

        swiperLeft()
        {
            let visiableImages = this.$refs.carousel.querySelectorAll('.element:not(.hidden) ');

            let movedImage = visiableImages[0];
            if(this.rightReserve.length === 0 ) {
                this.$refs.carousel.querySelector('.swiper-left').classList.add('hidden');
                return;
            }
            movedImage.classList.add('hidden');

            let markerToHide = movedImage.dataset.marker;

            this.leftReserve.push(markerToHide);

            let markerToShow = this.rightReserve.shift();

            let imageToShow = this.$refs.carousel.querySelector(`[data-marker="${markerToShow}"]`)
            imageToShow.classList.remove('hidden');
            this.$refs.carousel.querySelector('.swiper-right').classList.remove('hidden');

        },

        swiperRight()
        {
            let visiableImages = this.$refs.carousel.querySelectorAll('.element:not(.hidden) ');

            let movedImage = visiableImages[visiableImages.length - 1];

            if(this.leftReserve.length === 0 ) {
                this.$refs.carousel.querySelector('.swiper-right').classList.add('hidden');
                return;
            }

            movedImage.classList.add('hidden');

            let markerToHide = movedImage.dataset.marker;

            this.rightReserve.unshift(markerToHide);

            let markerToShow = this.leftReserve.pop();

            let imageToShow = this.$refs.carousel.querySelector(`[data-marker="${markerToShow}"]`)
            imageToShow.classList.remove('hidden');
            this.$refs.carousel.querySelector('.swiper-left').classList.remove('hidden');
        }
































    }
}
