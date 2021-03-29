<?php

namespace App\Providers;

use App\Http\ViewComposers\CategoryTreeComposer;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\Category;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
//        View::composer('partials.categories.treeContainer', function($view) {
//            $view->with(['categories' => Category::all()->toArray()]);
//        });

        view()->composer('partials.categories.treeContainer', CategoryTreeComposer::class);
    }
}
