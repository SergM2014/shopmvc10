<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Manufacturer;
use App\Models\Category;
use App\Models\Owner;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker -> title,
            'description' => $this->faker -> sentence,
            'manufacturer_id' => $this->faker->randomElement(Manufacturer::pluck('id')->toArray()),
            'category_id' => $this->faker->randomElement(Category::pluck('id')->toArray()),
            'owner_id' => $this->faker->randomElement(Owner::pluck('id')->toArray()),
        ];
    }
}
