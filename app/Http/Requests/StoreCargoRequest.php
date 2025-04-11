<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCargoRequest extends FormRequest
{
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
            // Cargos is an array of objects, so we validate each element of cargos.
            'cargos' => 'required|array|min:1',
            'cargos.*.weight' => 'required|numeric|min:0.1',  // Validate weight
            'cargos.*.portion_id' => 'required|exists:portions,id',  // Portion ID should exist in the 'portions' table
            'cargos.*.description' => 'required|string|max:1000',  // Description should be a string with max length
            'cargos.*.owner' => 'required|string|max:255',  // Owner should be a string with max length
            'cargos.*.receiver' => 'required|string|max:255',  // Receiver should be a string with max length
            'cargos.*.type' => 'required|string|in:perishable,hazardous,fragile,live,oversized,general',  // Type should be one of the allowed values
        ];
    }
}
