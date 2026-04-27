<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $guarded = [];

    // İş emrinin hangi araca ait olduğunu çekeceğimiz ilişki
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    // Bir servisin (iş emrinin) birden fazla parçası/işlemi olabilir
    public function items()
    {
        return $this->hasMany(ServiceItem::class);
    }
} // BÜTÜN SINIFI KAPATAN EN SON PARANTEZ BURADA OLMALI!
