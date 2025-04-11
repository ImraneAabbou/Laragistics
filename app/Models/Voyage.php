<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Voyage extends Model
{
    use HasFactory;

    protected $fillable = [
        'boat_id',
        'voyage_number',
        'departure_port_id',
        'arrival_port_id',
        'departure_date',
        'arrival_date',
        'status',
    ];

    /**
     * @return HasMany<Portion,Voyage>
     */
    public function portions(): HasMany
    {
        return $this->hasMany(Portion::class);
    }

    /**
     * @return BelongsTo<Boat,Voyage>
     */
    public function boat(): BelongsTo
    {
        return $this->belongsTo(Boat::class);
    }

    /**
     * @return BelongsTo<Port,Voyage>
     */
    public function departurePort(): BelongsTo
    {
        return $this->belongsTo(Port::class, 'departure_port_id');
    }

    /**
     * @return BelongsTo<Port,Voyage>
     */
    public function arrivalPort(): BelongsTo
    {
        return $this->belongsTo(Port::class, 'arrival_port_id');
    }

    /**
     * @return HasMany<Cargo,Voyage>
     */
    public function cargos(): HasMany
    {
        return $this->hasMany(Cargo::class);
    }
}
