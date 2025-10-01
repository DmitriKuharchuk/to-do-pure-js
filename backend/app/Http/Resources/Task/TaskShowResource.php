<?php

namespace App\Http\Resources\Task;

use App\Models\Task;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskShowResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'           => $this['id'],
            'title'        => $this['title'],
            'completed'    => Task::getName((int) $this['completed']),
        ];
    }
}
