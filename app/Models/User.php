<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'phone',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Kullanıcının rolünü getirir.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Müşterinin araçlarını getirir.
     */
    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    /**
     * Ustanın sorumlu olduğu servis işlerini getirir.
     */
    public function technicianJobs(): HasMany
    {
        return $this->hasMany(Service::class, 'technician_id');
    }
}
