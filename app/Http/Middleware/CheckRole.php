<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Giriş yapan kullanıcının rolü, rotada istenen rolle eşleşiyor mu?
        // 1: Admin, 2: Usta, 3: Müşteri
        $userRole = $request->user()->role->name;

        if ($userRole !== $role && $userRole !== 'Admin') {
            // Yetkisi yoksa Dashboard'a geri gönder
            return redirect('/dashboard')->with('error', 'Bu alana erişim yetkiniz yok.');
        }

        return $next($request);
    }
}
