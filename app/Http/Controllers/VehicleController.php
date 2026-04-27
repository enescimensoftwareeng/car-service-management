<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\Brand;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // EĞER MÜŞTERİ İSE (Role 3), SADECE KENDİ ARAÇLARINI GETİR
        if ($user->role_id == 3) {
            $vehicles = Vehicle::with('brand', 'owner')
                ->where('owner_id', $user->id) // FİLTRE BURADA!
                ->latest()
                ->get();
        }
        // EĞER USTA VEYA ADMİN İSE (Role 1 veya 2), TÜM ARAÇLARI GETİR
        else {
            $vehicles = Vehicle::with('brand', 'owner')->latest()->get();
        }

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'brands' => Brand::all(),
            'customers' => User::where('role_id', 3)->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plate' => 'required|string|max:20|unique:vehicles',
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:'.(date('Y')+1),
            'owner_id' => 'required|exists:users,id', // Burayı owner_id yaptık
        ]);

        Vehicle::create($validated);

        return back()->with('success', 'Araç başarıyla kaydedildi.');
    }
}
