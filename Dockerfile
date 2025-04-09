FROM php:8.3-fpm

# Установка необходимых библиотек для работы с SQL Server
RUN apt-get update && apt-get install -y \
    unixodbc unixodbc-dev tdsodbc \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    libicu-dev \
    libxml2-dev \
    unzip \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && rm -rf /var/lib/apt/lists/*  # Очистка кэша apt для уменьшения размера образа

# Устанавливаем расширения PHP для работы с SQL Server
RUN docker-php-ext-install pdo pdo_mysql mysqli opcache intl xml \
    && docker-php-ext-enable pdo_sqlsrv pdo_odbc \
    && pecl install sqlsrv \
    && docker-php-ext-enable sqlsrv

# Установка Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs


# Устанавливаем Composer (для PHP)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Настроим рабочую директорию
WORKDIR /var/www/html

# Копируем файлы проекта
COPY . .

# Устанавливаем зависимости с помощью Composer (для PHP)
RUN composer install --no-interaction --prefer-dist

# Устанавливаем зависимости с помощью npm (для Node.js)
RUN npm install

# Открываем порт 9000 для PHP-FPM
EXPOSE 9000

# Запускаем PHP-FPM
CMD ["php-fpm"]