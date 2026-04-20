<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'technician_id',
        'km_entry',
        'complaint',
        'status',
    ];

    /**
     * Servisin hangi araca yapıldığını getirir.
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Sorumlu ustayı getirir.
     */
    public function technician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'technician_id');
    }

    /**
     * Serviste kullanılan kalemleri (parça/işçilik) getirir.
     */
    public function items(): HasMany
    {
        return $this->hasMany(ServiceItem::class);
    }
}
