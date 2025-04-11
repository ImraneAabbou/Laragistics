<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Portion extends Model
{
    use HasFactory;

    protected $fillable = [
        'boat_id',
        'name',
        'capacity',
    ];

    /**
     * @return BelongsTo<Boat,Portion>
     */
    public function boat(): BelongsTo
    {
        return $this->belongsTo(Boat::class);
    }

    public function cargos()
    {
        return $this->hasMany(Cargo::class);
    }
}
