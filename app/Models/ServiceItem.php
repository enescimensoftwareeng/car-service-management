<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceItem extends Model
{
    use HasFactory;

    // price yerine part_price ve labor_price geldi!
    protected $fillable = ['service_id', 'description', 'quantity', 'part_price', 'labor_price'];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
