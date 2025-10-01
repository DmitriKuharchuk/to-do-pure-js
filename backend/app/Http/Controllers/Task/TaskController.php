<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\TaskRequest;
use App\Http\Resources\Task\TaskIndexResource;
use App\Http\Resources\Task\TaskShowResource;
use App\Services\Task\TaskService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    public function __construct(protected TaskService $service)
    {
    }

    public function index() : AnonymousResourceCollection
    {
        return TaskIndexResource::collection($this->service->index());
    }

    public function store(TaskRequest $request) : AnonymousResourceCollection
    {
        $data = $request->validated();
        $task = $this->service->create($data);
        return TaskShowResource::collection([$task]);
    }

    public function update(TaskRequest $request, int $id) : AnonymousResourceCollection
    {
        $data = $request->validated();
        $this->service->update($id,$data);
        return TaskShowResource::collection([$this->service->getById($id)]);
    }

    public function delete(int $id) : AnonymousResourceCollection
    {
        $this->service->delete($id);
        return TaskIndexResource::collection($this->service->index());
    }


}
