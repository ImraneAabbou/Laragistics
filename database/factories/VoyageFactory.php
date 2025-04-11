<?php

namespace Database\Factories;

use App\Models\Boat;
use App\Models\Port;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voyage>
 */
class VoyageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'boat_id' => Boat::factory(),
            'departure_port_id' => Port::factory(),
            'arrival_port_id' => Port::factory(),
            'departure_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'arrival_date' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'canceled']),
        ];
    }
}
