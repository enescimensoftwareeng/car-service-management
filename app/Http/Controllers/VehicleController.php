<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest; // Güncelleme için yeni kapımız
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(): Response
    {
        $vehicles = Vehicle::with(['owner', 'brand'])->latest()->get();

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Vehicles/Create');
    }

    public function store(StoreVehicleRequest $request)
    {
        $validated = $request->validated();
        $validated['owner_id'] = auth()->id();

        Vehicle::create($validated);

        // Başarı mesajını buraya ekledik!
        return redirect()->route('vehicles.index')->with('success', 'Araç başarıyla eklendi! 🚀');
    }

    public function show(Vehicle $vehicle)
    {
        // Şimdilik boş kalabilir, araca özel detay sayfası yaparsak kullanacağız.
    }

    public function edit(Vehicle $vehicle): Response
    {
        // Düzenleme formunu aç ve seçilen aracın bilgilerini forma gönder
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle
        ]);
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle)
    {
        // Yeni kurallardan geçen verilerle aracı güncelle
        $vehicle->update($request->validated());

        return redirect()->route('vehicles.index')->with('success', 'Araç başarıyla güncellendi!');
    }

    public function destroy(Vehicle $vehicle)
    {
        // Aracı veritabanından sil
        $vehicle->delete();

        return redirect()->route('vehicles.index')->with('success', 'Araç sistemden silindi.');
    }
}
