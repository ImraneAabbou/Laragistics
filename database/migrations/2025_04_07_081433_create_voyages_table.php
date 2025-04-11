<?php

use App\Models\Boat;
use App\Models\Port;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voyages', function (Blueprint $table) {
            $table->id();
            $table->dateTime('departure_date');
            $table->dateTime('arrival_date')->nullable();
            $table->string('status')->nullable();

            $table->foreignIdFor(Boat::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Port::class, 'departure_port_id')->constrained()->cascadeOnDelete('cascade');
            $table->foreignIdFor(Port::class, 'arrival_port_id')->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voyages');
    }
};
