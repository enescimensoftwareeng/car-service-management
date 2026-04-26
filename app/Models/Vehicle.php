<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    // Veritabanımızdaki sütunlara göre güncelledik (owner_id)
    protected $fillable = [
        'owner_id',
        'plate',
        'model',
        'chassis_no',
    ];

    /**
     * Aracın sahibini getirir.
     */
    public function owner(): BelongsTo
    {
        // Laravel'e "user_id yerine owner_id sütununa bak" talimatını verdik
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * Aracın markasını getirir.
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Aracın servis geçmişini getirir.
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }
}
