<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    use HasFactory;

    protected $fillable = [
        'voyage_id',
        'description',
        'portion_id',
        'weight',
        'owner',
        'receiver',
        'type',
    ];

    /**
     * @return BelongsTo<Voyage,Cargo>
     */
    public function voyage(): BelongsTo
    {
        return $this->belongsTo(Voyage::class);
    }

    /**
     * @return BelongsTo<Portion,Cargo>
     */
    public function portion(): BelongsTo
    {
        return $this->belongsTo(Portion::class);
    }

    public static function getByVoyagePortionId(int $voyageId, int $portionId)
    {
        return self::where('voyage_id', $voyageId)
            ->where('portion_id', $portionId);
    }
}
