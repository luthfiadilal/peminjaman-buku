<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index(Request $request)
    {
        $query = Author::query();

        // Search
        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort
        $sortable = ['name', 'created_at']; // Field yang boleh disortir
        $sortBy = in_array($request->sortBy, $sortable) ? $request->sortBy : 'name';
        $sortDir = $request->sortDir === 'desc' ? 'desc' : 'asc';

         $authors = $query->orderBy($sortBy, $sortDir)->paginate(10)->withQueryString();
        return Inertia::render('Author', [
            'authors' => $authors,
            'filters' => [
                'search' => $request->search,
                'sortBy' => $request->sortBy,
                'sortDir' => $request->sortDir,
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateAuthor');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);

        $author = Author::create(['name' => $request->name]);

        return redirect()->route('author.create')->with('success', 'Author created.');
    }

    public function show(Author $author)
    {
        return Inertia::render('EditAuthor', ['author' => $author]);
    }

    public function update(Request $request, Author $author)
    {
        $request->validate(['name' => 'required|string|max:255']);

        $author->update(['name' => $request->name]);

        return redirect()->route('author.index')->with('success', 'Author updated.');
    }

    public function destroy(Author $author)
    {
        $author->delete();
        return redirect()->route('author.index')->with('success', 'Author deleted.');
    }
}
