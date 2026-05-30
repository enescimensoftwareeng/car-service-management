<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;

class CustomerPanelController extends Controller
{
    public function index()
    {
        // 1. Sisteme giriş yapan kullanıcının ID'sini al
        $userId = Auth::id();

        // 2. Sadece bu kullanıcıya ait araçları bul
        // Eager Loading (with) kullanarak o aracın servis geçmişini de aynı anda çekiyoruz
        $vehicles = Vehicle::with(['services'])->where('owner_id', $userId)->get();        // 3. Verileri React (Ön yüz) tarafına gönder
        return Inertia::render('Customer/Dashboard', [
            'vehicles' => $vehicles,
            'customerName' => Auth::user()->name,
        ]);
    }
}
