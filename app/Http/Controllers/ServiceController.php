<?php

namespace App\Http\Controllers;

use App\Models\Part;
use App\Models\Service;
use App\Models\ServiceItem; // Güncelleme için eklendi
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
        $service->load(['vehicle.brand', 'technician', 'items']);

        return Inertia::render('Services/Show', [
            'service' => $service,
            'parts' => \App\Models\Part::where('stock', '>', 0)->get() // Sadece stokta olan parçaları gönder
        ]);
    }

    public function storeItem(Request $request, Service $service)
    {
        $validated = $request->validate([
            'part_id' => 'nullable|exists:parts,id', // frontend'den part_id gelebilir
            'description' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'part_price' => 'required|numeric|min:0',
            'labor_price' => 'required|numeric|min:0',
        ]);

        $service->items()->create([
            'description' => $validated['description'],
            'quantity' => $validated['quantity'],
            'part_price' => $validated['part_price'],
            'labor_price' => $validated['labor_price'],
        ]);

        // Stok Düşme İşlemi
        $warningMessage = null;
        if (!empty($validated['part_id'])) {
            $part = Part::find($validated['part_id']);
            if ($part) {
                // Stoğu kullanılan adet kadar düşür (0'ın altına inmesini engelle)
                $part->stock = max(0, $part->stock - $validated['quantity']);
                $part->save();

                if ($part->stock < 20) {
                    $warningMessage = "{$part->name} adlı parçanın stoğu kritik seviyeye ({$part->stock} adet) düştü!";
                }
            }
        }

        if ($warningMessage) {
            return back()->with('success', 'Kalem başarıyla eklendi.')->with('warning', $warningMessage);
        }

        return back()->with('success', 'Kalem başarıyla eklendi.');
    }

    public function updateItem(Request $request, $itemId)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'part_price' => 'required|numeric|min:0',
            'labor_price' => 'required|numeric|min:0',
        ]);

        $item = ServiceItem::findOrFail($itemId);
        $item->update($validated);
        return back()->with('success', 'Fatura kalemi güncellendi.');
    }
    /**
     * 7. Servisin (İş emrinin) durumunu günceller.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:Beklemede,İşlemde,Tamamlandı'
        ]);

        $service = Service::findOrFail($id);
        $service->update($validated);

        return back()->with('success', 'Servis durumu güncellendi.');
    }

    public function edit(string $id)
    {
        // İleride dolduracağız
    }

    public function destroy(string $id)
    {
        // İleride dolduracağız
    }
}
