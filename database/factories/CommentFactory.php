<?php

namespace Database\Factories;


use App\Models\Comment;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'product_id' => $this->faker->randomElement(Product::pluck('id')->toArray()),
            'parent_id' => 0,
            'avatar' => $this->faker->optional($weight = 0.6)->userName,

            'excerpt' => $this->faker-> sentence,
            'text' => $this->faker->paragraph,
        ];

    }

    public function childComment()
    {
        return $this->state(function () {
            $var0 = 0;
            $ids = Comment::pluck('id')->toArray();

            array_unshift($ids, $var0);

            return [
                'parent_id' => $this->faker
                    -> randomElement($ids),
            ];
        });
    }
}
