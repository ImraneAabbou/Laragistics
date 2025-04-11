<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreVoyageRequest;
use App\Models\Boat;
use App\Models\Port;
use App\Models\Voyage;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;

class VoyageController extends Controller
{
    public function index(): ResponseFactory|Response
    {
        $voyages = Voyage::with(['boat', 'departurePort', 'arrivalPort'])->get();
        return inertia('voyages/index', compact('voyages'));
    }

    public function create(): ResponseFactory|Response
    {
        $boats = Boat::all();
        $ports = Port::all();
        $statuses = ['scheduled', 'completed', 'canceled'];

        return inertia('voyages/new', compact('boats', 'ports', 'statuses'));
    }

    public function store(StoreVoyageRequest $request): RedirectResponse
    {
        Voyage::create($request->validated());
        return to_route('voyages.index');
    }

    public function destroy(Voyage $voyage): RedirectResponse
    {
        $voyage->delete();
        return to_route('voyages.index');
    }

    public function edit(Voyage $voyage): ResponseFactory|Response
    {
        $boats = Boat::all();
        $ports = Port::all();
        $statuses = ['scheduled', 'completed', 'canceled'];

        return inertia('voyages/edit', compact('boats', 'ports', 'statuses', 'voyage'));
    }

    public function update(StoreVoyageRequest $request, Voyage $voyage): RedirectResponse
    {
        $voyage->update($request->validated());
        return to_route('voyages.index');
    }
}
