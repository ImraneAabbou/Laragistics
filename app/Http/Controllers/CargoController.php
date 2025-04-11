<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreCargoRequest;
use App\Models\Cargo;
use App\Models\Portion;
use App\Models\Voyage;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\ResponseFactory;

class CargoController extends Controller
{
    /**
     * @return ResponseFactory|Response
     */
    public function create(Voyage $voyage): ResponseFactory|Response
    {
        $portions = Portion::all();
        return inertia('cargos/new', compact('voyage', 'portions'));
    }

    public function edit(Voyage $voyage): ResponseFactory|Response
    {
        $portions = Portion::all();
        $cargos = $portions->flatMap(function ($portion) use ($voyage) {
            return Cargo::getByVoyagePortionId($voyage->id, $portion->id)->get();
        });
        return inertia('cargos/edit', compact('voyage', 'portions', 'cargos'));
    }

    /**
     * @return ResponseFactory|Response
     */
    public function index(Voyage $voyage): ResponseFactory|Response
    {
        $portions = Portion::query()->get(['id', 'name']);

        $cargosByPortionName = $portions->mapWithKeys(function ($portion) use ($voyage) {
            return [$portion->name => Cargo::getByVoyagePortionId($voyage->id, $portion->id)->get()];
        });

        return inertia('cargos/index', compact('voyage', 'cargosByPortionName'));
    }

    /**
     * @return RedirectResponse
     */
    public function store(Voyage $voyage, StoreCargoRequest $request): RedirectResponse
    {
        collect($request->validated()['cargos'])->map(fn($c) => Cargo::create([...$c, 'voyage_id' => $voyage->id]));
        return to_route('cargos.index', ['voyage' => $voyage->id]);
    }

    public function destroy(Cargo $cargo)
    {
        $cargo->delete();
        return back();
    }

    public function update(StoreCargoRequest $request, Voyage $voyage)
    {
        $voyage->delete();
        collect($request->validated()['cargos'])->map(fn($c) => Cargo::create([...$c, 'voyage_id' => $voyage->id]));

        return to_route('cargos.index', ['voyage' => $voyage->id]);;
    }
}
