<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'description',
        'quantity',
        'price',
    ];

    /**
     * Kalemin ait olduğu servis kaydını getirir.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
