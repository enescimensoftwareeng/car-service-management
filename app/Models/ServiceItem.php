<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    use HasFactory;

    // 'name' kelimesini 'description' olarak güncelledik!
    protected $fillable = [
        'service_id',
        'item_name',
        'quantity',
        'unit_price'
    ];

    // Bu kalem hangi servise (iş emrine) ait?
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
