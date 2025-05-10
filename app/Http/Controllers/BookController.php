<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use App\Models\Author;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function index()
    {

        $books = Book::with('authors', 'publisher', 'category')->get()->map(function ($book) {
            $book->formatted_created_at = $book->created_at_formatted;
            return $book;
        });

        return Inertia::render('DashboardAdmin', [

            'books' => $books,
        ]);
    }

    public function create()
    {
        // Pass necessary data like categories, authors, and publishers to the form view
        $authors = Author::all();
        $categories = Category::all();
        $publishers = Publisher::all();

        return Inertia::render('CreateBook', [
            'authors' => $authors,
            'categories' => $categories,
            'publishers' => $publishers,
        ]);
    }

    // Store the new book in the database
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'publisher_id' => 'required|exists:publishers,id',
            'category_id' => 'required|exists:categories,id',
            'author_id' => 'required|array',
            'author_id.*' => 'exists:authors,id',
            'publication_year' => 'required|digits:4',
            'isbn' => 'required|string|unique:books,isbn',
            'stock' => 'required|integer',
            'is_available' => 'boolean',
            'extra_data' => 'nullable|array',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240',  // Allow PDFs up to 10MB
        ]);

        $book = Book::create([
            'title' => $request->title,
            'publisher_id' => $request->publisher_id,
            'category_id' => $request->category_id,
            'publication_year' => $request->publication_year,
            'isbn' => $request->isbn,
            'stock' => $request->stock,
            'is_available' => $request->is_available ?? true, // Default to true if not provided
            'extra_data' => $request->extra_data,
            'pdf_file' => $request->file('pdf_file'), // Handle file upload
        ]);

        $book->authors()->sync($request->author_id); // Sync authors

        return redirect()->route('book.create')->with('success', 'Book created successfully!');
    }
}
