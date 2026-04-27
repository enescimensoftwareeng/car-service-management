<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Tüm iş emirlerini (servisleri) listeler.
     */
    public function index(): Response
    {
        $services = Service::with(['vehicle.owner'])->latest()->get();
        return Inertia::render('Services/Index', [
            'services' => $services
        ]);
    }

    /**
     * Yeni iş emri oluşturma formunu gösterir.
     */
    public function create(): Response
    {
        $vehicles = Vehicle::with('owner')->get();
        return Inertia::render('Services/Create', [
            'vehicles' => $vehicles
        ]);
    }

    /**
     * Formdan gelen yeni iş emrini veritabanına kaydeder.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'current_km' => 'required|integer|min:0',
            'complaint' => 'required|string|max:1000',
        ]);

        Service::create([
            'vehicle_id' => $validated['vehicle_id'],
            'current_km' => $validated['current_km'],
            'complaint' => $validated['complaint'],
            'status' => 'pending',
        ]);

        return redirect()->route('services.index');
    }

    /**
     * İş emrinin detaylarını (ve eklenen parçaları) gösterir.
     */
    public function show(Service $service): Response
    {
        // Detay sayfasında aracın, müşterinin bilgilerine ve eklenen servis kalemlerine (items) ihtiyacımız var.
        $service->load(['vehicle.owner', 'items']);

        return Inertia::render('Services/Show', [
            'service' => $service
        ]);
    }

    /**
     * İş emrini düzenleme formunu gösterir.
     */
    public function edit(Service $service)
    {
        // Şimdilik boş bırakıyoruz.
    }

    /**
     * İş emrini günceller (Durum değiştirme).
     */
    public function update(Request $request, Service $service)
    {
        $service->update([
            'status' => $request->status
        ]);

        return back();
    }

    /**
     * İş emrini siler.
     */
    public function destroy(Service $service)
    {
        // Şimdilik boş bırakıyoruz.
    }

    /**
     * Servise yeni bir parça/işçilik kalemi ekler.
     */
    public function storeItem(Request $request, Service $service)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
        ]);

        // İlişki üzerinden yeni faturaya kalem ekliyoruz
        $service->items()->create($validated);

        return back(); // Sayfayı yenilemeden veriyi anında React'a gönderir
    }
}
