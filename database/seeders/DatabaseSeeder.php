<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
/*use App\Models\Manufacturer;
use App\Models\Category;
use App\Models\Owner;
use App\Models\Product;*/

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
           ManufacturerSeeder::class,
            CategorySeeder::class,
            OwnerSeeder::class,
            ProductSeeder::class,
            CommentSeeder::class,



        ]);
    }
}
