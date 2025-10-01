<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'completed' => 'required|integer|in:0,1', //можно boolean
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Поле "Название задачи" обязательно для заполнения.',
            'title.string' => 'Поле "Название задачи" должно быть строкой.',
            'title.max' => 'Поле "Название задачи" не может быть длиннее :max символов.',

            'completed.required' => 'Поле "Статус выполнения" обязательно для заполнения.',
            'completed.integer' => 'Поле "Статус выполнения" должно быть целым числом.',
            'completed.in' => 'Поле "Статус выполнения" должно иметь значение 0 или 1.',
        ];
    }
}
