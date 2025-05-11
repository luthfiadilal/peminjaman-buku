<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublisherController extends Controller
{
    public function index(Request $request)
    {
        $query = Publisher::query();

        // Search
        if ($request->has('search') && $request->search !== '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Sort
        $sortable = ['name', 'created_at']; // Field yang boleh disortir
        $sortBy = in_array($request->sortBy, $sortable) ? $request->sortBy : 'name';
        $sortDir = $request->sortDir === 'desc' ? 'desc' : 'asc';

        $publishers = $query->orderBy($sortBy, $sortDir)->get();

        return Inertia::render('Publisher', [
            'publishers' => $publishers,
            'filters' => [
                'search' => $request->search,
                'sortBy' => $request->sortBy,
                'sortDir' => $request->sortDir,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('CreatePublisher');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);

        $publisher = Publisher::create([
            'name' => $request->name,
        ]);

        return redirect()->route('publisher.create')->with('success', 'Publisher created.');
    }

    public function show(Publisher $publisher)
    {
        return Inertia::render('EditPublisher', ['publisher' => $publisher]);
    }

    public function update(Request $request, Publisher $publisher)
    {
        $request->validate(['name' => 'required|string|max:255']);

        $publisher->update([
            'name' => $request->name,
        ]);

        return redirect()->route('publisher.index')->with('success', 'Publisher created.');
    }

    public function destroy(Publisher $publisher)
    {
        $publisher->delete();
        return redirect()->route('publisher.index')->with('success', 'Publisher deleted.');
    }
}
