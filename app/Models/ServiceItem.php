<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    use HasFactory;

    protected $fillable = ['service_id', 'name', 'quantity', 'price'];

    // Bu kalem hangi servise (iş emrine) ait?
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
