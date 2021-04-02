<div class="gallery flex-grow relative mx-auto " x-data="gallery()" x-init="init()">
    <div class="gallery__item sm:rounded-lg overflow-hidden">
        <img src="<?= asset('storage/images/1p.jpg')?>" alt="Image" class="gallery__image object-cover object-center" title="Lorem ipsum">
    </div>
    <div class="gallery__item gallery__item--hidden sm:rounded-lg overflow-hidden">
        <img src="<?= asset('storage/images/2p.jpg')?>" alt="Image" class="gallery__image object-cover object-center" title="Lorem ipsum">
    </div>
    <div class="gallery__item gallery__item--hidden sm:rounded-lg overflow-hidden">
        <img src="<?= asset('storage/images/3p.jpg')?>" alt="Image" class="gallery__image object-cover object-center" title="Lorem ipsum">
    </div>
    <div class="gallery__item gallery__item--hidden sm:rounded-lg overflow-hidden">
        <img src="<?= asset('storage/images/4p.jpg')?>" alt="Image" class="gallery__image object-cover object-center" title="Lorem ipsum">
    </div>
    <div class="gallery__item gallery__item--hidden sm:rounded-lg overflow-hidden">
        <img src="<?= asset('storage/images/5p.jpg')?>" alt="Image" class="gallery__image object-cover object-center" title="Lorem ipsum">
    </div>
    <a class="gallery__nav gallery__nav--right text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer" x-on:click="next()">
        <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z">
            </path>
        </svg>
    </a>
    <a class="gallery__nav gallery__nav--left text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer" x-on:click="previous()">
        <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path
                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z">
            </path>
        </svg>
    </a>
</div>
