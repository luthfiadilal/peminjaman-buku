<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublisherController extends Controller
{
    public function index()
    {
        $publishers = Publisher::all();
        return Inertia::render('Publisher', ['publishers' => $publishers]);
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
        return response()->json($publisher);
    }

    public function update(Request $request, Publisher $publisher)
    {
        $request->validate(['name' => 'required|string|max:255']);

        $publisher->update([
            'name' => $request->name,
        ]);

        return response()->json($publisher);
    }

    public function destroy(Publisher $publisher)
    {
        $publisher->delete();
        return response()->json(null, 204);
    }
}
