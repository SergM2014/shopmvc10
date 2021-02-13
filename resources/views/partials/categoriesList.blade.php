<?php

    $newChildIds = [];

    if(!isset($childIds)){
        $childIds = []; $childIds[]= 0;
    }

?>

<div class="w-40   <?php if ($counter > 0) echo "hidden" ?>" >

    @foreach($childIds as $parentId)
        <div>

            @foreach($categories as $category)

                @if($category->parent_id == $parentId )


                    <div class="border  rounded-l px-3 py-3 my-1 w-40 break-all">
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





