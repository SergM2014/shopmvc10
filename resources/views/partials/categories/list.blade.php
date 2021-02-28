<?php

    $newChildIds = [];

    if(!isset($childIds)){
        $childIds = []; $childIds[]= 0;
    }

?>

<div class="childrenGroup  <?= $counter > 0 ? 'hidden  ': ''  ?>  md:w-40 " data-level = "<?= $counter ?>" >

    @foreach($childIds as $parentId)
{{-- in this div the children of one parent are present--}}
        <div class=" <?= $counter > 0 ? 'hidden parentIdItems origin': ''  ?>" data-parent-id = "<?= $parentId ?>" data-level = "<?= $counter ?>" >

            @foreach($categories as $category)
                @if($category['parent_id'] == $parentId)


                    <div class="border  rounded-l px-3 py-3 my-1  break-all z-<?= ($counter+1)*50 +50 ?>
                        bg-blue-<?= ($counter+1)*100 +100 ?> hover:bg-red-600 cursor-pointer"
                         x-on:mouseover="openChild(<?= $counter.','.$category['id'].','.$category['id']  ?>)" data-id="<?= $category['id'] ?>" >
                        <?=  $category['title'] .'/'.$category['parent_id'] .'/'.$category['id'] ?>
                    </div>
                            @foreach ($categories as $subCategory)
                                <?php if($subCategory['parent_id'] == $category['id'])  $newChildIds [] = $category['id'];  ?>
                            @endforeach


                @endif

            @endforeach

        </div>
    @endforeach

</div>


@if($newChildIds)

    <?php  $childIds = array_unique($newChildIds); $counter++ ?>

    @include('partials.categories.list', compact('childIds', 'counter'))

@endif






