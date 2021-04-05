

<img src="<?=  asset('storage/swiper/left.png'); ?>" @click = "swiperLeft()"
     class="absolute h-12 left-0.5 top-5  opacity-50 swiper-left cursor-pointer hover:bg-red-600 rounded-lg hover:opacity-100">
<img src="<?= asset('storage/swiper/right.png'); ?>" @click = "swiperRight()"
     class="absolute h-12 right-0.5 top-5 cursor-pointer opacity-50 swiper-right cursor-pointer hover:bg-red-600 rounded-lg hover:opacity-100">


            <?php $pictures = range(1,16);
            shuffle($pictures);
            foreach( $pictures as $picture): ?>

            <div class="inline element p-5  w-20 h-14 hidden" data-marker = <?= $picture ?> >
                <a href="">
                    <img src="/storage/swiper/<?= $picture ?>.png" class="inline w-20 h-14 m-1">
                </a>
            </div>

            <?php endforeach; ?>







