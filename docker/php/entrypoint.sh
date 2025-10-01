#!/bin/sh
set -e


mkdir -p storage/framework/{cache,data,sessions,testing,views} storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwX storage bootstrap/cache
find storage -type d -exec chmod 775 {} \; || true
find storage -type f -exec chmod 664 {} \; || true

exec "$@"
