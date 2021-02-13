<?php

    $newChildIds = [];

    if(!isset($childIds)){
        $childIds = []; $childIds[]= 0;
    }

?>

<div class="w-40 border-2 border-red-700 inline-block h-full ">

    @foreach($childIds as $parentId)
        <div class=" border-2 border-green-700 inline-block w-40 ">

    @foreach($categories as $category)

        @if($category->parent_id == $parentId )


            <div class="border  rounded-l px-3 py-3 my-1 w-40 break-all">
                <?=  $category->title .'/'.$category->parent_id .'/'.$category->id ?>
            </div>
                    @foreach ($categories as $subCategory)
                        @if($subCategory->parent_id == $category->id)
                            <?php  $newChildIds [] = $category->id;  ?>
                        @endif
                    @endforeach

                @endif
            @endforeach
        </div>
    @endforeach

</div>


@if($newChildIds)

    <?php  $childIds = array_unique($newChildIds);  ?>

    @include('partials.categoriesList', compact('childIds'))

@endif





