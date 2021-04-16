
<div class="inline-block  w-12 opacity-50 swiper-left m-2">
<img src="<?=  asset('storage/swiper/left.png'); ?>" @click = "swiperLeft()" x-show = "leftArrow"
     class="h-12
     cursor-pointer hover:bg-red-600 rounded-lg hover:opacity-100">
</div>

<div id = "carousel_inhalt" class="w-5/6 inline-block">
    <?php $pictures = range(1,16);
    shuffle($pictures);
    foreach( $pictures as $picture): ?>

    <div class="inline element p-5  w-20 h-14 hidden" data-marker = <?= $picture ?> >
        <a href="">
            <img src="/storage/swiper/<?= $picture ?>.png" class="inline w-20 h-14 m-1">
        </a>
    </div>

    <?php endforeach; ?>
</div>

<div class="inline-block  w-12 opacity-50 swiper-right m-2">
    <img src="<?= asset('storage/swiper/right.png'); ?>" @click = "swiperRight()" x-show = "rightArrow"
         class=" h-12 cursor-pointer hover:bg-red-600
         rounded-lg hover:opacity-100">
</div>









