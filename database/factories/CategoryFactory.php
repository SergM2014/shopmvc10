<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'parent_id' => 0,
            'title' => $this->faker-> word,
        ];
    }

    public function childCategory()
    {
        return $this->state(function () {
            $var0 = 0;
            $ids = Category::pluck('id')->toArray();

            array_unshift($ids, $var0);

            return [
                'parent_id' => $this->faker
                    -> randomElement($ids),
            ];
        });
    }
}
