<?php

namespace App\Models;

use Illuminate\Support\Facades\File;

class Task
{
    protected string $file;
    protected array $data;

    public const STATUS_NOT_COMPLETED = 0;
    public const STATUS_COMPLETED = 1;

    public const STATUS_NOT_COMPLETED_TEXT = 'Не выполнен';
    public const STATUS_COMPLETED_TEXT = 'Выполнен';

    public function __construct()
    {
        $this->file = storage_path('app/tasks.json');
        $this->getCollection();
    }

    public static function getName(int $status): string  //не использую Enum
    {
        switch ($status) {
            case self::STATUS_NOT_COMPLETED:
                return self::STATUS_NOT_COMPLETED_TEXT;
            case self::STATUS_COMPLETED:
                return self::STATUS_COMPLETED_TEXT;
            default:
                return '';
        }
    }

    protected function getCollection(): void
    {
        if (!File::exists($this->file)) {
            File::put($this->file, json_encode([]));
        }
        $content = File::get($this->file);
        $this->data = json_decode($content, true) ?? [];
    }

    public function all(): array
    {
        return $this->data;
    }

    public function find(int $id): ?array
    {
        foreach ($this->data as $item) {
            if (($item['id'] ?? null) === $id) {
                return $item;
            }
        }
        return abort(404);
    }

    public function checkExists(int $id): bool
    {
        return $this->find($id) !== null;
    }

    public function save(array $data): void
    {
        $this->data = $data;
        File::put($this->file, json_encode($this->data, JSON_PRETTY_PRINT));
    }

}
