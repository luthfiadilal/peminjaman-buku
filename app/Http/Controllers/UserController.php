<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        // Search
        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort
        $sortable = ['name', 'email', 'created_at']; // Field yang boleh disortir
        $sortBy = in_array($request->sortBy, $sortable) ? $request->sortBy : 'name';
        $sortDir = $request->sortDir === 'desc' ? 'desc' : 'asc';


        // Ambil semua user yang rolenya USER
        $users = User::where('role', UserRole::USER)->orderBy($sortBy, $sortDir)->get();

        return Inertia::render('User', [
            'users' => $users,
            'filters' => [
                'search' => $request->search,
                'sortBy' => $request->sortBy,
                'sortDir' => $request->sortDir,
            ]
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('DetailUser', [
            'user' => $user,
        ]);
    }


    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['nullable', 'min:6'],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            // hanya update password jika diberikan
            'password' => $request->password ? Hash::make($request->password) : $user->password,
        ]);

        return redirect()->back()->with('success', 'User berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user.index')->with('success', 'User berhasil dihapus.');
    }
}
