

## Сервисы и порты
- **Frontend (node):** http://localhost:3000  
- **Frontend + API через Nginx:** http://localhost:8080  
  - `/api` → Laravel (php-fpm)  
  - `/` →  (node:3000)  




1. **Запустите контейнеры:**
   ```bash
   docker compose up -d --build
   ```

2. **Установите зависимости Laravel и создайте `.env`:**
   ```bash
   docker compose exec php bash -lc "cd /var/www/html && composer install && cp -n .env.example .env || true && php artisan key:generate && php artisan storage:link"
   ```




---

## Проверка работы

Проверьте, что сервисы отвечают:

```bash
curl -I http://localhost:3000       # js напрямую
curl -I http://localhost:8080       # js через Nginx
curl -I http://localhost:8080/api   # Laravel API
```

---

## Полезные команды

- Список контейнеров:
  ```bash
  docker compose ps
  ```

- Просмотр логов:
  ```bash
  docker logs app-node --tail=100
  docker logs app-nginx --tail=100
  docker logs app-php  --tail=100
  ```

- Проверка конфигурации Nginx:
  ```bash
  docker compose exec app-nginx nginx -t
  ```

- Перезапуск Nginx:
  ```bash
  docker compose restart app-nginx
  ```

---

## Что есть в стеке
- **Laravel (PHP-FPM)** — backend API.  
- **( Node.js)** — frontend приложение.  
- **Nginx** — реверс-прокси и балансировщик между фронтом и API.  


---

## Полезно знать
- Фронтенд можно запускать как напрямую на `:3000`, так и через Nginx на `:8080`.  
- API всегда доступен по `/api`.  
- Все данные  сохраняются в файле, путь storage_path('app/tasks.json')
