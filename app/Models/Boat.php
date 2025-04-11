<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Boat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'boat_number',
        'operator',
    ];

    /**
     * @return HasMany<Portion,Boat>
     */
    public function portions(): HasMany
    {
        return $this->hasMany(Portion::class);
    }

    /**
     * @return HasMany<Voyage,Boat>
     */
    public function voyages(): HasMany
    {
        return $this->hasMany(Voyage::class);
    }
}
