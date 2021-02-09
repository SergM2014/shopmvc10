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
       \App\Models\Category::factory(5)->create();

       //create first level of subcategories
       Category::factory()->count(20)->childCategory()->create();

       //create second Level of subcategories
        Category::factory()->count(20)->childCategory()->create();

        //create third Level of subcategories
        Category::factory()->count(20)->childCategory()->create();
    }
}
