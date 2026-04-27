<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    use HasFactory;

    protected $guarded = []; // Toplu veri ekleme kilidini açtık

    // Bu parçanın bağlı olduğu servisi (iş emrini) getirir
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
