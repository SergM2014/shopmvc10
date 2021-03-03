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
       \App\Models\Category::factory(1)->create();

       //create first level of subcategories
       Category::factory()->count(5)->childCategory()->create();

       //create second Level of subcategories
        Category::factory()->count(10)->childCategory()->create();

        //create third Level of subcategories
        Category::factory()->count(30)->childCategory()->create();

        //Create forth level 0f subcategories
        Category::factory()->count(60)->childCategory()->create();

        Category::factory()->count(120)->childCategory()->create();
        Category::factory()->count(200)->childCategory()->create();
        Category::factory()->count(400)->childCategory()->create();

    }
}
