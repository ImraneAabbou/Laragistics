<?php

use App\Models\Portion;
use App\Models\Voyage;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->id();
            $table->string('description')->nullable();
            $table->float('weight');
            $table->string('type')->nullable();
            $table->string('owner')->nullable();
            $table->string('receiver')->nullable();

            $table->foreignIdFor(Voyage::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Portion::class)->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargos');
    }
};
