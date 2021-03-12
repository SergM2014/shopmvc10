<?php

    $newChildIds = [];

    if(!isset($childIds)){
        $childIds = []; $childIds[]= 0;
    }

?>

<div class="childrenGroup  <?= $counter > 0 ? 'hidden absolute top-0  ': ''  ?>  md:w-40 " data-level = "<?= $counter ?>" >

    @foreach($childIds as $parentId)
{{-- in this div the children of one parent are present--}}
        <div class=" <?= $counter > 0 ? 'hidden origin': ''  ?> parentIdItems" data-parent-id = "<?= $parentId ?>" data-level = "<?= $counter ?>" >

            @foreach($categories as $category)
                @if($category['parent_id'] == $parentId)


                    <div class="border border-gray-800 rounded-lg px-3 py-3 my-1  break-all stuff mx-1
                        hover:bg-red-600 cursor-pointer flex justify-between z-10"
                         x-on:mouseover="openChild(<?= $counter.','.$category['id'].','.$category['id']  ?>)" data-id="<?= $category['id'] ?>" >
                        <?=  $category['title'] .'/'.$category['parent_id'] .'/'.$category['id'] ?>

                            <?php $printedArrow = false; ?>
                            @foreach ($categories as $subCategory)
                                <?php if($subCategory['parent_id'] == $category['id'])
                                { $newChildIds [] = $category['id'];
                                if(!$printedArrow) {
                                $printedArrow = true; ?>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                         class="h-5 inline hidden arrow-left" >
                                        <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                                    </svg>


                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                             class="h-5 inline hidden arrow-right">
                                            <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                         class="h-5 inline hidden arrow-down" >
                                        <path fill-rule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>

                                    <?php } }
                                ?>
                            @endforeach
                    </div>


                @endif

            @endforeach

        </div>
    @endforeach

</div>


@if($newChildIds)

    <?php  $childIds = array_unique($newChildIds); $counter++ ?>

    @include('partials.categories.list', compact('childIds', 'counter'))

@endif






