<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Hangi aracı güncellediğimizi URL'den (route) yakalıyoruz
        $vehicleId = $this->route('vehicle')->id;

        return [
            // Benzersizlik kuralına "Bu aracın kendi ID'si hariç" şartını ekledik!
            'plate' => ['required', 'string', 'max:20', 'unique:vehicles,plate,' . $vehicleId],
            'model' => ['required', 'string', 'max:100'],
            'chassis_no' => ['required', 'string', 'size:17', 'unique:vehicles,chassis_no,' . $vehicleId],
        ];
    }
}
