window.carousel = function()
{
    return {

        minimised : true,
//the width of working area
        width : document.getElementById('carousel_container').clientWidth,
        leftReserve: [],
        rightReserve:[],

        initCarousel()
        {
            let firstImage = this.$refs.carousel.querySelector('.element');
            let images = this.$refs.carousel.querySelectorAll('.element');

            firstImage.classList.remove('hidden');

            let imageLength = firstImage.offsetWidth;

            let imageSize = Math.floor(this.width/imageLength);

            for (let i = 0; i < imageSize; i++) {
                images[i].classList.remove('hidden')
            }
            let nodeList = this.$refs.carousel.querySelectorAll('.element.hidden ');

           nodeList.forEach( item => this.rightReserve.push(item.dataset.marker));
//console.log(this.rightReserve)

        },

        swiperLeft()
        {
            let visiableImages = this.$refs.carousel.querySelectorAll('.element:not(.hidden) ');

            let movedImage = visiableImages[0];
            if(this.rightReserve.length === 0 ) return;
            movedImage.classList.add('hidden');

            let markerToHide = movedImage.dataset.marker;

            this.leftReserve.push(markerToHide);

            let markerToShow = this.rightReserve.shift();

            let imageToShow = this.$refs.carousel.querySelector(`[data-marker="${markerToShow}"]`)
            imageToShow.classList.remove('hidden')

        },

        swiperRight()
        {
            let visiableImages = this.$refs.carousel.querySelectorAll('.element:not(.hidden) ');

            let movedImage = visiableImages[visiableImages.length - 1];
            if(this.leftReserve.length === 0 ) return;
            movedImage.classList.add('hidden');

            let markerToHide = movedImage.dataset.marker;

            this.rightReserve.unshift(markerToHide);

            let markerToShow = this.leftReserve.pop();

            let imageToShow = this.$refs.carousel.querySelector(`[data-marker="${markerToShow}"]`)
            imageToShow.classList.remove('hidden')
        }
































    }
}
