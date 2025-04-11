<?php

namespace Database\Seeders;

use App\Models\Boat;
use App\Models\Cargo;
use App\Models\Port;
use App\Models\Portion;
use App\Models\User;
use App\Models\Voyage;
use Illuminate\Database\Seeder;

class VoyageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a random number of boats and ports
        $boats = Boat::factory()->count(5)->create();  // Creates 5 random boats
        $ports = Port::factory()->count(3)->create();  // Creates 3 random ports

        $voyagesCount = 10;  // You can change this number as needed
        for ($i = 0; $i < $voyagesCount; $i++) {
            $boat = $boats->random();  // Randomly pick a boat
            $departurePort = $ports->random();  // Randomly pick a departure port
            $arrivalPort = $ports->except($departurePort->id)->random();  // Randomly pick an arrival port, different from departure port

            // Create the voyage
            $voyage = Voyage::factory()->create([
                'boat_id' => $boat->id,
                'departure_port_id' => $departurePort->id,
                'arrival_port_id' => $arrivalPort->id,
                'departure_date' => now()->addDays(rand(0, 7)),  // Random departure date within a week
                'arrival_date' => now()->addDays(rand(8, 15)),  // Random arrival date, at least a week after departure
                'status' => 'scheduled',
            ]);

            // Create a random number of portions for each voyage (let's say between 1 and 3 portions per voyage)
            $portionsCount = rand(1, 3);
            for ($j = 0; $j < $portionsCount; $j++) {
                $portion = Portion::factory()->create(['boat_id' => $boat->id]);
                Cargo::factory()->count(rand(5, 10))->create([
                    'voyage_id' => $voyage->id,
                    'portion_id' => $portion->id,
                ]);
            }
        }
        User::factory()->create([
            "email" => "someone@gmail.com",
            "password" => "idk"
        ]);
    }
}
