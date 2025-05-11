<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use App\Models\Author;
use App\Models\Category;
use App\Models\Borrowing;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class BorrowingController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $borrowings = Borrowing::with('book')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return Inertia::render('Borrowings', [
            'active' => $borrowings->whereNull('returned_at')->values(),
            'returned' => $borrowings->whereNotNull('returned_at')->values(),
        ]);
    }




    public function create()
    {
        $authors = Author::all();
        $category = Category::all();
        $publisher = Publisher::all();

        $books = Book::with(['authors', 'category', 'publisher'])
            ->where('is_available', true)
            ->get();

        return Inertia::render('BookListBorrowing', [
            'books' => $books
        ]);
    }

    public function form(Book $book)
    {
        $book->load(['authors', 'category', 'publisher']);

        return Inertia::render('BorrowingBook', [
            'book' => $book
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'address' => 'required|string|max:255',
            'borrowed_at' => 'required|date|before_or_equal:due_at',
            'due_at' => 'required|date|after_or_equal:borrowed_at',
        ]);

        $book = Book::findOrFail($request->book_id);

        if ($book->stock < 1) {
            return redirect()
                ->back()
                ->withErrors(['book_id' => 'Stok buku habis, tidak bisa dipinjam.'])
                ->withInput();
        }


        $book->decrement('stock');


        Borrowing::create([
            'user_id' => Auth::id(),
            'book_id' => $book->id,
            'address' => $request->address,
            'borrowed_at' => $request->borrowed_at,
            'due_at' => $request->due_at,
        ]);

        return redirect()->route('borrow.index')->with('success', 'Buku berhasil dipinjam!');

    }

    public function returnBook(Borrowing $borrowing)
    {
        $borrowing->update([
            'returned_at' => now(),
        ]);


        $borrowing->book->increment('stock');

        return redirect()->route('borrow.index')->with('success', 'Buku berhasil dikembalikan!');
    }

}
