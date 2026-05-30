<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Appointment;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'plate' => 'required|string|max:20',
            'brand_id' => 'required|exists:brands,id',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        // Find or Create User
        $user = User::firstOrCreate(
            ['email' => $validated['email']],
            [
                'name' => $validated['name'],
                'phone' => $validated['phone'],
                'role_id' => 3, // Müşteri
                'password' => Hash::make('12345678'), // Default password
            ]
        );

        // Find or Create Vehicle
        $vehicle = Vehicle::firstOrCreate(
            ['plate' => strtoupper(str_replace(' ', '', $validated['plate']))],
            [
                'brand_id' => $validated['brand_id'],
                'model' => $validated['model'],
                'year' => $validated['year'],
                'owner_id' => $user->id,
            ]
        );

        // Create Appointment
        Appointment::create([
            'user_id' => $user->id,
            'vehicle_id' => $vehicle->id,
            'appointment_date' => $validated['appointment_date'],
            'appointment_time' => $validated['appointment_time'],
            'status' => 'Beklemede',
            'notes' => $validated['notes'],
        ]);

        $message = "Randevunuz başarıyla oluşturuldu.";
        if ($user->wasRecentlyCreated) {
            $message .= " Hesabınız oluşturuldu. Şifreniz: 12345678 (Lütfen giriş yaptıktan sonra değiştirin).";
        }

        return redirect()->back()->with('success', $message);
    }

    public function updateStatus(Request $request, Appointment $appointment)
    {
        // Admin only check is usually in routes/middleware, but we can double check
        if (auth()->user()->role_id !== 1) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:Beklemede,Onaylandı,Reddedildi',
        ]);

        $appointment->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Randevu durumu güncellendi.');
    }
}
