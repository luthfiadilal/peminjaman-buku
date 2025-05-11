<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::all();
        return Inertia::render('Author', [
            'authors' => $authors
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
        return response()->json(null, 204);
    }
}
