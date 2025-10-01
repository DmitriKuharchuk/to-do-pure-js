FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git unzip libpng-dev libonig-dev libzip-dev libpq-dev curl gnupg \
 && docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring zip gd \
 && rm -rf /var/lib/apt/lists/*


RUN docker-php-ext-install opcache


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
EXPOSE 9000


COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm", "-F"]
