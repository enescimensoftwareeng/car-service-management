<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * 1. Tüm servis kayıtlarını (İş Emirlerini) listeler.
     */
    public function index(): Response
    {
        return Inertia::render('Services/Index', [
            // Araç ve Usta bilgileriyle birlikte en yenisi en üstte olacak şekilde getir
            'services' => Service::with(['vehicle', 'technician'])->latest()->get()
        ]);
    }

    /**
     * 2. Yeni iş emri açma formunu gösterir.
     */
    public function create(): Response
    {
        return Inertia::render('Services/Create', [
            'vehicles' => Vehicle::with('brand')->get(),
            // Sadece usta rolündeki (role_id: 2) kullanıcıları çekiyoruz
            'technicians' => User::where('role_id', 2)->get()
        ]);
    }

    /**
     * 3. Yeni iş emrini veritabanına kaydeder.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'technician_id' => 'required|exists:users,id',
            'km_entry' => 'required|integer|min:0',
            'complaint' => 'required|string|max:1000',
            'status' => 'required|in:Beklemede,İşlemde,Tamamlandı',
        ]);

        Service::create($validated);

        return redirect()->route('services.index')->with('success', 'İş emri başarıyla açıldı.');
    }

    /**
     * 4. Seçilen iş emrinin detay (Fatura ve Kalemler) sayfasını gösterir.
     */
    public function show(Service $service)
    {
        // Servise ait aracın, ustanın ve eklenen parçaların bilgilerini yükle
        $service->load(['vehicle.brand', 'technician', 'items']);

        return Inertia::render('Services/Show', [
            'service' => $service
        ]);
    }

    /**
     * 5. ÖZEL METOT: İlgili servise yeni bir parça veya işçilik kalemi ekler.
     */
    public function addItem(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
        ]);

        // İlişkisel model üzerinden parçayı kaydet (service_id otomatik eklenir)
        $service->items()->create($validated);

        return back()->with('success', 'Kalem başarıyla eklendi.');
    }

    /**
     * İleride eklenecek düzenleme ve silme işlemleri için hazır bekleyen fonksiyonlar
     */
    public function edit(string $id)
    {
        // İleride dolduracağız
    }

    public function update(Request $request, string $id)
    {
        // İleride dolduracağız
    }

    public function destroy(string $id)
    {
        // İleride dolduracağız
    }
}
