<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    // Veritabanına eklenmesine izin verilen sütunlar
    protected $fillable = [
        'plate',
        'brand_id',
        'model',
        'year',
        'chassis_no',
        'owner_id'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
