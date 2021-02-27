<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // these are initial start category
       \App\Models\Category::factory(2)->create();

       //create first level of subcategories
       Category::factory()->count(20)->childCategory()->create();

       //create second Level of subcategories
        Category::factory()->count(20)->childCategory()->create();

        //create third Level of subcategories
        Category::factory()->count(30)->childCategory()->create();

        //Create forth level 0f subcategories
        Category::factory()->count(50)->childCategory()->create();

        Category::factory()->count(200)->childCategory()->create();
        //Category::factory()->count(300)->childCategory()->create();
       // Category::factory()->count(500)->childCategory()->create();
    }
}
