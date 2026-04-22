<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    /**
     * Araç listesini getirir.
     */
    public function index(): Response
    {
        // Araçları, sahibi (owner) ve markası (brand) ile birlikte en yeniler üstte olacak şekilde çekiyoruz
        $vehicles = Vehicle::with(['owner', 'brand'])->latest()->get();

        // Veriyi React tarafına gönderiyoruz
        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles
        ]);
    }

    /**
     * Yeni araç ekleme formunu (React sayfasını) gösterir.
     */
    public function create(): Response
    {
        // Formdaki dropdown (seçim) kutuları için Markaları ve Müşterileri çekiyoruz
        return Inertia::render('Vehicles/Create', [
            'brands' => \App\Models\Brand::orderBy('name')->get(),
            'customers' => \App\Models\User::where('role_id', 3)->get() // Sadece müşteriler
        ]);
    }

    /**
     * Formdan gelen verileri veritabanına kaydeder.
     */
    public function store(Request $request)
    {
        // 1. Gelen verileri doğrula (Validation)
        $validated = $request->validate([
            'plate' => 'required|string|max:20|unique:vehicles,plate', // Plaka benzersiz olmalı
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string|max:100',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'owner_id' => 'required|exists:users,id',
            'chassis_no' => 'nullable|string|max:50|unique:vehicles,chassis_no',
        ]);

        // 2. Doğrulanan veriyi veritabanına kaydet
        Vehicle::create($validated);

        // 3. Kullanıcıyı listeye geri gönder ve başarılı mesajı ver
        return redirect()->route('vehicles.index')->with('success', 'Araç sisteme başarıyla eklendi.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
