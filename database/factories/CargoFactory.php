<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CargoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => $this->faker->sentence(),
            'weight' => $this->faker->numberBetween(100, 10000),
            'owner' => $this->faker->name(),
            'receiver' => $this->faker->name(),
            'type' => $this->faker->randomElement(['conteneur', 'vrac', 'liquide', 'réfrigéré']),
        ];
    }
}
