<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\PublisherController;

Route::get('/', function () {
    return Inertia::render('Home');
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard-user');



Route::middleware(['auth'])->group(function () {
    Route::get('dashboard/borrowings', [BorrowingController::class, 'index'])->name('borrow.index');
    Route::get('dashboard/book', [BorrowingController::class, 'create'])->name('borrow.create');
    Route::post('/borrowings', [BorrowingController::class, 'store'])->name('borrow.store');
    Route::get('dashboard/book/{book}', [BorrowingController::class, 'form'])->name('borrow.form');
    Route::post('dashboard/borrowings/{borrowing}', [BorrowingController::class, 'returnBook'])->name('borrow.return');

});



Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard-admin', [BookController::class, 'index'])->name('dashboard-admin');

    Route::get('dashboard-admin/publisher', [PublisherController::class, 'index'])->name('publisher.index');
    Route::get('dashboard-admin/publisher/create', [PublisherController::class, 'create'])->name('publisher.create');
    Route::post('/publisher', [PublisherController::class, 'store'])->name('publisher.store');

    Route::get('dashboard-admin/category', [CategoryController::class, 'index'])->name('category.index');
    Route::get('dashboard-admin/category/create', [CategoryController::class, 'create'])->name('category.create');
    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');

    Route::get('dashboard-admin/author', [AuthorController::class, 'index'])->name('author.index');
    Route::get('dashboard-admin/author/create', [AuthorController::class, 'create'])->name('author.create');
    Route::post('/author', [AuthorController::class, 'store'])->name('author.store');

    Route::get('dashboard-admin/book/create', [BookController::class, 'create'])->name('book.create');
    Route::get('dashboard-admin/book/{book}', [BookController::class, 'show'])->name('book.show');
    Route::get('/book/{book}/edit', [BookController::class, 'edit'])->name('book.edit');
    Route::put('/book/{book}', [BookController::class, 'update'])->name('book.update');
    Route::post('/book', [BookController::class, 'store'])->name('book.store');
    Route::delete('/book{book}', [BookController::class, 'destroy'])->name('book.destroy');

    Route::get('dashboard-admin/user', [UserController::class, 'index'])->name('user.index');
    Route::get('dashboard-admin/user/{user}', [UserController::class, 'show'])->name('user.show');
    Route::put('dashboard-admin/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('dashboard-admin/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');

});



Route::post('/upload-image', function (Request $request) {

 $file = $request->file('file');
    $ext = $file->getClientOriginalExtension();
    $filename = 'image.' . $ext;

    // simpan di disk public
    $path = $file->storeAs('images', $filename, 'public');

    // kembalikan URL bisa diakses browser
    return response()->json([
        'url' => Storage::url($path) // hasilnya: /storage/images/image.png
    ]);
})->name('upload-image');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
