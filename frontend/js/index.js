import {ApiTask} from "./api/task.js";

document.addEventListener("DOMContentLoaded", () => {
    let apiTaskBase = "http://localhost:8080/api/tasks";

    ApiTask({
        apiBase: apiTaskBase,
        formId: "task-form",
        title: "task-title",
        completed: "task-completed",
        bodyTable: "tasks-body",
    });
});
