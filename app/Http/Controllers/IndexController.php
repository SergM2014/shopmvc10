<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\LazyCollection;

class IndexController extends Controller
{
    public function index()
    {
        return view('welcome');
    }
}
