<?php

namespace App\Http\Controllers;

use App\Models\Part;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;

class PartController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            function ($request, $next) {
                if (auth()->check() && auth()->user()->role_id === 3) {
                    abort(403, 'Bu sayfaya erişim yetkiniz yok.');
                }
                return $next($request);
            }
        ];
    }

    public function index()
    {
        $parts = Part::latest()->get();
        return Inertia::render('Parts/Index', [
            'parts' => $parts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'purchase_price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        Part::create($validated);

        return redirect()->route('parts.index')->with('success', 'Parça başarıyla eklendi.');
    }

    public function update(Request $request, Part $part)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'purchase_price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $part->update($validated);

        return redirect()->route('parts.index')->with('success', 'Parça bilgileri güncellendi.');
    }

    public function destroy(Part $part)
    {
        $part->delete();

        return redirect()->route('parts.index')->with('success', 'Parça silindi.');
    }
}
