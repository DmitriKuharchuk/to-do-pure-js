export function ApiTask(cfg) {
    const API = cfg.apiBase.replace(/\/$/, "");
    const form = byId(cfg.formId);
    const title = byId(cfg.title);
    const completed = byId(cfg.completed);
    const bodyTable = byId(cfg.bodyTable);

    const STATUS_COMPLETED_TEXT = 'Выполнен';
    const STATUS_NOT_COMPLETED_TEXT = 'Не выполнен';

    let editingId = null;

    function normalizeTasks(response) {
        const response_array = Array.isArray(response) ? response : (Array.isArray(response?.data) ? response.data : []);

        return response_array.map(task => {
            return {
                id: task.id,
                title: task.title ?? '',
                completed: task.completed,
            };
        });
    }

    async function load() {
        bodyTable.innerHTML = `<tr><td colspan="4">Загрузка...</td></tr>`;
        try {
            const res = await fetch(API);
            if (!res.ok) throw new Error(`GET ${API} -> ${res.status}`);
            const json = await res.json();
            const items = normalizeTasks(json);
            render(items);
        } catch (e) {
            console.error(e);
            bodyTable.innerHTML = `<tr><td colspan="4" class="text-danger">Ошибка загрузки</td></tr>`;
        }
    }

    function render(items) {
        if (!Array.isArray(items) || !items.length) {
            bodyTable.innerHTML = `<tr><td colspan="4" class="text-muted">Пока задач нет</td></tr>`;
            return;
        }

        bodyTable.innerHTML = items
            .map((task, i) => {
                const statusText = task.completed === STATUS_COMPLETED_TEXT  ? STATUS_COMPLETED_TEXT : STATUS_NOT_COMPLETED_TEXT;
                const badgeClass = task.completed === STATUS_COMPLETED_TEXT ? "bg-success" : "bg-secondary";
                return `
          <tr data-id="${task.id}">
            <th scope="row">${i + 1}</th>
            <td>${escapeHtml(task.title ?? "")}</td>
            <td>
              <span class="badge ${badgeClass} toggle-status" role="button" title="Переключить статус">
                ${statusText}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-2 edit">Изменить</button>
              <button class="btn btn-sm btn-outline-danger delete">Удалить</button>
            </td>
          </tr>
        `;
            })
            .join("");
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const payload = {
            title: title.value.trim(),
            completed: Number(completed.value),
        };


        clearFieldError('task-title');

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };

            let res;
            if (editingId) {
                res = await fetch(`${API}/${editingId}`, {
                    method: 'PATCH',
                    headers,
                    body: JSON.stringify(payload),
                });
            } else {
                res = await fetch(API, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(payload),
                });
            }

            if (res.status === 422) {
                const data = await res.json().catch(() => ({}));
                const msg = data?.errors?.title?.[0] || data?.message || 'Ошибка валидации';
                showFieldError('task-title', msg);
                return;
            }

            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

            clearForm();
            await load();
        } catch (e) {
            console.error(e);
            alert('Ошибка сохранения');
        }
    });

    bodyTable.addEventListener("click", async (e) => {
        const tr = e.target.closest("tr[data-id]");
        if (!tr) return;
        const id = tr.getAttribute("data-id");

        if (e.target.classList.contains("delete")) {
            try {
                const res = await fetch(`${API}/${id}`, { method: "DELETE" });
                if (!res.ok) throw new Error(`DELETE ${id} -> ${res.status}`);
                await load();
            } catch (err) {
                console.error(err);
                alert("Ошибка удаления");
            }
            return;
        }

        if (e.target.classList.contains("edit")) {
            const current_title = tr.children[1].textContent.trim();
            const isCompleted = tr.querySelector(".badge").textContent.includes("Выполнен") ? 1 : 0;

            editingId = id;
            title.value = current_title;
            completed.value = String(isCompleted);
            title.focus();
            return;
        }

        if (e.target.classList.contains("toggle-status")) {
            const isCompleted = e.target.textContent.includes("Выполнен") ? 1 : 0;
            try {
                const res = await fetch(`${API}/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ completed: Number(!isCompleted) }),
                });
                if (!res.ok) throw new Error(`PATCH toggle ${id} -> ${res.status}`);
                await load();
            } catch (err) {
                console.error(err);
                alert("Ошибка смены статуса");
            }
        }
    });

    function clearForm() {
        editingId = null;
        form.reset();
        completed.value = "0";
    }

    function byId(id) {
        const el = document.getElementById(id);
        if (!el) throw new Error(`#${id} not found`);
        return el;
    }
    function escapeHtml(s) {
        return String(s)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    load();


    function showFieldError(inputId, message) {
        const input = document.getElementById(inputId);
        const box   = document.getElementById(`${inputId}-error`);
        if (input) input.classList.add('is-invalid');
        if (box) {
            box.textContent = message || '';
            box.classList.add('d-block');
        }
    }

    function clearFieldError(inputId) {
        const input = document.getElementById(inputId);
        const box   = document.getElementById(`${inputId}-error`);
        if (input) input.classList.remove('is-invalid');
        if (box) {
            box.textContent = '';
            box.classList.remove('d-block');
        }
    }

}



