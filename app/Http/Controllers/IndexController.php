<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class IndexController extends Controller
{
    public function index()
    {

        $categories = Category::all();
       //dd($categories);
        return view('welcome', compact('categories'));
    }
}
