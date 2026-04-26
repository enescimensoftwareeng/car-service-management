<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Gelen isteği kontrol eder ve yetki yoksa kapıdan çevirir.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Kullanıcı giriş yapmamışsa login'e at
        if (!auth()->check()) {
            return redirect('login');
        }

        $userRoleId = auth()->user()->role_id;

        // Rolleri ID'lerle eşleştiriyoruz
        $roles = [
            'Admin' => 1,
            'Usta' => 2,
            'Musteri' => 3
        ];

        // Eğer istenen rol "Usta" ise, Admin'in (1) de girmeye yetkisi olmalı.
        // Yani Admin her yere girer.
        if ($role === 'Usta' && in_array($userRoleId, [1, 2])) {
            return $next($request);
        }

        // Birebir rol eşleşmesi (Örn: Sadece Müşteri)
        if (isset($roles[$role]) && $userRoleId === $roles[$role]) {
            return $next($request);
        }

        // Yetkisi yoksa 403 Yetkisiz Erişim hatası ver!
        abort(403, 'Güvenlik İhlali: Bu sayfaya erişim yetkiniz bulunmamaktadır.');
    }
}
