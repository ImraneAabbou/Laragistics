<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoyageRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string,string>
     */
    public function rules(): array
    {
        return [
            'boat_id' => 'required|exists:boats,id',
            'departure_port_id' => 'required|exists:ports,id',
            'arrival_port_id' => 'required|exists:ports,id',
            'departure_date' => 'required|date',
            'arrival_date' => 'nullable|date',
            'status' => 'required|in:scheduled,completed,canceled',
        ];
    }
}
