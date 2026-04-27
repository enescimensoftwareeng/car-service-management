<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    // $guarded = [] diyerek Laravel'in toplu veri ekleme engellemesini kaldırıyoruz
    protected $guarded = [];

    // Aracın sahibini (Müşteriyi) çekeceğimiz ilişki
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
