<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Brand;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function create()
    {
        return Inertia::render('Vehicles/Create', [
            'brands' => Brand::all(),
            'customers' => User::where('role_id', 3)->get(),
        ]);
    }

    public function index()
    {
        $user = auth()->user();

        // EĞER MÜŞTERİ İSE (Role 3), SADECE KENDİ ARAÇLARINI GETİR
        if ($user->role_id == 3) {
            $vehicles = Vehicle::with('brand', 'owner')
                ->where('owner_id', $user->id) // FİLTRE BURADA!
                ->latest()
                ->paginate(5)
                ->withQueryString();
        }
        // EĞER USTA VEYA ADMİN İSE (Role 1 veya 2), TÜM ARAÇLARI GETİR
        else {
            $vehicles = Vehicle::with('brand', 'owner')
                ->latest()
                ->paginate(5)
                ->withQueryString();
        }

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'brands' => Brand::all(),
            'customers' => User::where('role_id', 3)->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'plate' => $this->normalizePlate($request->input('plate')),
            'chassis_no' => $request->filled('chassis_no') ? strtoupper(trim((string) $request->input('chassis_no'))) : null,
        ]);

        $validated = $request->validate([
            'plate' => ['required', 'regex:/^\d{2}\s?[A-Z]{1,3}\s?\d{2,4}$/', 'unique:vehicles,plate'],
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'chassis_no' => 'nullable|string|size:17|unique:vehicles,chassis_no',
            'owner_id' => 'required|exists:users,id',
        ]);

        Vehicle::create($validated);

        return redirect()->route('vehicles.index')->with('success', 'Arac basariyla kaydedildi.');
    }

    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle,
        ]);
    }

    public function show(Vehicle $vehicle)
    {
        return redirect()->route('vehicles.edit', $vehicle);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $request->merge([
            'plate' => $this->normalizePlate($request->input('plate')),
            'chassis_no' => $request->filled('chassis_no') ? strtoupper(trim((string) $request->input('chassis_no'))) : null,
        ]);

        $validated = $request->validate([
            'plate' => ['required', 'regex:/^\d{2}\s?[A-Z]{1,3}\s?\d{2,4}$/', 'unique:vehicles,plate,' . $vehicle->id],
            'model' => 'required|string|max:255',
            'chassis_no' => 'nullable|string|size:17|unique:vehicles,chassis_no,' . $vehicle->id,
        ]);

        $vehicle->update($validated);

        return redirect()->route('vehicles.index')->with('success', 'Arac bilgileri guncellendi.');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()->route('vehicles.index')->with('success', 'Arac kaydi silindi.');
    }

    private function normalizePlate(?string $plate): string
    {
        $compactPlate = strtoupper(preg_replace('/\s+/', '', trim((string) $plate)));

        if (preg_match('/^(\d{2})([A-Z]{1,3})(\d{2,4})$/', $compactPlate, $matches)) {
            return $matches[1] . ' ' . $matches[2] . ' ' . $matches[3];
        }

        return strtoupper(trim((string) $plate));
    }
}
