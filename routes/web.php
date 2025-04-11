<?php

use App\Http\Controllers\CargoController;
use App\Http\Controllers\VoyageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/voyages', [VoyageController::class, 'index'])->name('voyages.index');
    Route::get('/voyages/new', [VoyageController::class, 'create'])->name('voyages.create');
    Route::post('/voyages', [VoyageController::class, 'store'])->name('voyages.store');
    Route::get('/voyages/{voyage}/edit', [VoyageController::class, 'edit'])->name('voyages.edit');
    Route::put('/voyages/{voyage}', [VoyageController::class, 'update'])->name('voyages.update');
    Route::delete('/voyages/{voyage}', [VoyageController::class, 'destroy'])->name('voyages.destroy');

    Route::get('/cargos/{voyage}', [CargoController::class, 'index'])->name('cargos.index');
    Route::get('/cargos/{voyage}/new', [CargoController::class, 'create'])->name('cargos.create');
    Route::get('/cargos/{voyage}/edit', [CargoController::class, 'edit'])->name('cargos.edit');
    Route::put('/cargos/{voyage}', [CargoController::class, 'update'])->name('cargos.update');
    Route::post('/cargos/{voyage}', [CargoController::class, 'store'])->name('cargos.store');
    Route::delete('/cargos/{cargo}', [CargoController::class, 'destroy'])->name('cargos.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
