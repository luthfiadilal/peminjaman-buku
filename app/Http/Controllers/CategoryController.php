<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {

        $query = Category::query();

        // Search
        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort
        $sortable = ['name', 'created_at']; // Field yang boleh disortir
        $sortBy = in_array($request->sortBy, $sortable) ? $request->sortBy : 'name';
        $sortDir = $request->sortDir === 'desc' ? 'desc' : 'asc';

        $category = $query->orderBy($sortBy, $sortDir)->get();

        return Inertia::render('Category', [
            'categories' => $category,
            'filters' => [
                'search' => $request->search,
                'sortBy' => $request->sortBy,
                'sortDir' => $request->sortDir,
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateCategory');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);

        $category = Category::create(['name' => $request->name]);

        return redirect()->route('category.create')->with('success', 'Category created.');
    }

    public function show(Category $category)
    {
        return Inertia::render('EditCategory', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate(['name' => 'required|string|max:255']);

        $category->update(['name' => $request->name]);

        return redirect()->route('category.index')->with('success', 'Category updated.');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('category.index')->with('success', 'Category deleted.');
    }
}
