<?php

namespace App\Services\Task;

use App\Models\Task;

class TaskService
{
    public function __construct(public Task $model)
    {
    }

    public function index(): array
    {
        return $this->model->all();
    }

    public function getById(int $id): ?array
    {
        return $this->model->find($id);
    }

    public function create(array $attributes): array
    {
        $data = $this->model->all();
        $attributes['id'] = $this->getId($data);
        $data[] = $attributes;
        $this->model->save($data);
        return $attributes;
    }

    public function update(int $id, array $attributes): ?array
    {
        $data = $this->model->all();
        foreach ($data as $key => $item) {
            if (($item['id'] ?? null) === $id) {
                $data[$key] = array_merge($item, $attributes);
                $this->model->save($data);
                return $data[$key];
            }
        }
        return null;
    }

    public function delete(int $id): bool
    {
        $data = $this->model->all();
        foreach ($data as $key => $item) {
            if (($item['id'] ?? null) === $id) {
                array_splice($data, $key, 1);
                $this->model->save($data);
                return true;
            }
        }
        return false;
    }

    protected function getId(array $data): int
    {
        empty($data) ? $id = 1 : $id = max(array_column($data, 'id')) + 1;
        return $id;
    }

}
