<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use App\Models\Author;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{

    public function index(Request $request)
    {
        $query = Book::with('authors', 'publisher', 'category');

        $categories = Category::all();
        // Search by title
        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        // Optional: Filter by category
        if ($category = $request->input('category')) {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', $category);
            });
        }

        if ($request->sort_by && in_array($request->sort_by, ['title', 'publication_year', 'stock'])) {
            $query->orderBy($request->sort_by, $request->sort_dir === 'desc' ? 'desc' : 'asc');
        }


        $books = $query->paginate(10)->withQueryString();

        return Inertia::render('DashboardAdmin', [
            'books' => $books->items(),
            'pagination' => [
                'total' => $books->total(),
                'current_page' => $books->currentPage(),
                'last_page' => $books->lastPage(),
                'per_page' => $books->perPage(),
            ],
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show(Book $book)
    {

        $book->load('authors', 'category', 'publisher');
        return Inertia::render('BookDetails', [
            'book' => $book,
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

    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('dashboard-admin')->with('success', 'Book deleted successfully!');
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'publisher_id' => 'nullable|exists:publishers,id',
            'category_id' => 'nullable|exists:categories,id',
            'author_id' => 'nullable|array',
            'author_id.*' => 'exists:authors,id',
            'publication_year' => 'nullable|digits:4',
            'isbn' => 'nullable|string|unique:books,isbn,' . $book->id,
            'stock' => 'nullable|integer',
            'is_available' => 'boolean',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        $book->update(array_filter([
            'title' => $request->title,
            'publisher_id' => $request->publisher_id,
            'category_id' => $request->category_id,
            'publication_year' => $request->publication_year,
            'isbn' => $request->isbn,
            'stock' => $request->stock,
            'is_available' => $request->is_available,
        ], fn ($v) => !is_null($v)));

        if ($request->hasFile('pdf_file')) {
            $file = $request->file('pdf_file');

            // Validasi manual ukuran (misalnya 100KB - 500KB)
            $sizeKB = $file->getSize() / 1024;
            if ($sizeKB < 100 || $sizeKB > 500) {
                return back()->withErrors(['pdf_file' => 'File size must be between 100KB and 500KB']);
            }

            // Hapus file lama
            if ($book->pdf_file) {
                Storage::disk('public')->delete($book->pdf_file);
            }

            // Simpan file baru
            $path = $file->store('pdfs', 'public');
            $book->pdf_file = $path;
            $book->save();


        }


        if ($request->filled('author_id')) {
            $book->authors()->sync($request->author_id);
        }

        return redirect()->route('dashboard-admin')->with('success', 'Book updated successfully!');
    }



    public function edit(Book $book)
    {

        $book->load('authors');

        return Inertia::render('EditBook', [
            'book' => $book,
            'authors' => Author::all(),
            'categories' => Category::all(),
            'publishers' => Publisher::all(),
        ]);
    }
}
