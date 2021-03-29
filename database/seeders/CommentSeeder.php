<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // these are initial start comment
        \App\Models\Comment::factory(20)->create();

        //create first level of subcomment
        Comment::factory()->count(100)->childComment()->create();

        //create sec9nd level of subcomment
        Comment::factory()->count(200)->childComment()->create();

        //create third level of subcomment
        Comment::factory()->count(300)->childComment()->create();
    }
}
