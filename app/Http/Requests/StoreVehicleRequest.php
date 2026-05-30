<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Kullanıcının bu işlemi yapmaya yetkisi var mı?
     */
    public function authorize(): bool
    {
        return true; // Burası varsayılan olarak false gelir, mutlaka true yapmalıyız.
    }

    /**
     * Formdan gelen veriler için geçerlilik kuralları.
     */
    public function rules(): array
    {
        return [
            // Plaka zorunludur, metindir, en fazla 20 karakterdir ve vehicles tablosunda benzersiz (unique) olmalıdır.
            'plate' => ['required', 'string', 'max:20', 'unique:vehicles,plate'],

            // Model zorunludur, metindir.
            'model' => ['required', 'string', 'max:100'],

            // Şasi no zorunludur, tam olarak 17 karakter olmalıdır ve benzersiz olmalıdır.
            'chassis_no' => ['required', 'string', 'size:17', 'unique:vehicles,chassis_no'],
        ];
    }
}
