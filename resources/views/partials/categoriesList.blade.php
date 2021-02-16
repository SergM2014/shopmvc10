<?php

    $newChildIds = [];

    if(!isset($childIds)){
        $childIds = []; $childIds[]= 0;
    }

?>

<div class="w-40 <?= $counter > 0 ? 'hidden  childrenGroup': ''  ?>" data-level = "<?= $counter ?>" >

    @foreach($childIds as $parentId)
{{-- in this div the children of one parent are present--}}
        <div class=" <?= $counter > 0 ? 'hidden parentIdItems': ''  ?>" data-parent-id = "<?= $parentId ?>" data-level = "<?= $counter ?>" >

            @foreach($categories as $category)
                @if($category->parent_id == $parentId)


                    <div class="border  rounded-l px-3 py-3 my-1 w-40 break-all" x-on:click="openChild(<?= $counter.','.$category->id  ?>)" >
                        <?=  $category->title .'/'.$category->parent_id .'/'.$category->id ?>
                    </div>
                            @foreach ($categories as $subCategory)
                                <?php if($subCategory->parent_id == $category->id)  $newChildIds [] = $category->id;  ?>
                            @endforeach


                @endif

            @endforeach

        </div>
    @endforeach

</div>


@if($newChildIds)

    <?php  $childIds = array_unique($newChildIds); $counter++ ?>

    @include('partials.categoriesList', compact('childIds', 'counter'))

@endif





