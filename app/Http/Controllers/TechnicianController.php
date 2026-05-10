<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class TechnicianController extends Controller
{
    /**
     * Display a listing of technicians.
     */
    public function index()
    {
        // Yalnızca admin erişebilmeli (Middleware ile web.php'de de kısıtlanacak)
        if (auth()->user()->role_id !== 1) {
            abort(403, 'Sadece yöneticiler bu sayfaya erişebilir.');
        }

        $technicians = User::where('role_id', 2)->latest()->get();

        return Inertia::render('Technicians/Index', [
            'technicians' => $technicians
        ]);
    }

    /**
     * Store a newly created technician in storage.
     */
    public function store(Request $request)
    {
        if (auth()->user()->role_id !== 1) {
            abort(403, 'Sadece yöneticiler usta ekleyebilir.');
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', Password::defaults()],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role_id' => 2, // 2 = Technician
        ]);

        return redirect()->back()->with('success', 'Usta başarıyla sisteme eklendi!');
    }

    /**
     * Update the specified technician in storage.
     */
    public function update(Request $request, User $user)
    {
        if (auth()->user()->role_id !== 1) {
            abort(403, 'Yetkisiz işlem.');
        }

        // Sadece ustaları güncelleyebilsin
        if ($user->role_id !== 2) {
            abort(403, 'Sadece ustaları güncelleyebilirsiniz.');
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'phone' => ['nullable', 'string', 'max:20'],
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        return redirect()->back()->with('success', 'Usta bilgileri güncellendi.');
    }

    /**
     * Remove the specified technician from storage.
     */
    public function destroy(User $user)
    {
        if (auth()->user()->role_id !== 1) {
            abort(403, 'Yetkisiz işlem.');
        }

        if ($user->role_id !== 2) {
            abort(403, 'Sadece ustaları silebilirsiniz.');
        }

        // İlgili ustanın servis işlemleri null'a düşebilir (veritabanı constraints ayarlıysa)
        $user->delete();

        return redirect()->back()->with('success', 'Usta kaydı silindi.');
    }

    /**
     * Reset the technician's password.
     */
    public function resetPassword(Request $request, User $user)
    {
        if (auth()->user()->role_id !== 1) {
            abort(403, 'Yetkisiz işlem.');
        }

        if ($user->role_id !== 2) {
            abort(403, 'Sadece ustaların şifresini sıfırlayabilirsiniz.');
        }

        $request->validate([
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'Ustanın şifresi başarıyla değiştirildi.');
    }
}
