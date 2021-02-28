<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\LazyCollection;

class IndexController extends Controller
{
    public function index()
    {
//in my case toArray is also for Generator
        $categories = Category::all()->toArray();

        return view('welcome', compact('categories'));
    }
}
