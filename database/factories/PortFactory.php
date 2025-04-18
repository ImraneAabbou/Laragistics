<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Port>
 */
class PortFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'code' => $this->faker->randomLetter() . $this->faker->randomLetter() . $this->faker->randomLetter(),
            'name' => $this->faker->city(),
            'location' => $this->faker->address(),
        ];
    }
}
