FROM php:8.3-fpm

# Установка необходимых библиотек для работы с SQL Server и других зависимостей
RUN apt-get update && apt-get install -y \
    unixodbc unixodbc-dev tdsodbc \
    curl \
    gnupg2 \
    ca-certificates \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libicu-dev \
    libxml2-dev \
    unzip \
    zip \
    bash \
    telnet \
    git \
    wget \
    libx11-dev \
    libxext-dev \
    libfreetype-dev \
    libjpeg-dev \
    libpng-dev \
    libicu-dev \
    libxml2-dev \
    && curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | tee /etc/apt/trusted.gpg.d/microsoft.asc \
    && curl -fsSL https://packages.microsoft.com/config/debian/10/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17 \
    && rm -rf /var/lib/apt/lists/*  # Очистка кэша apt для уменьшения размера образа

# Установка расширений PHP для работы с SQL Server
RUN pecl install sqlsrv pdo_sqlsrv \
    && docker-php-ext-enable sqlsrv pdo_sqlsrv

# Установка Node.js и npm
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

# Открываем порт 8000 для PHP-FPM
EXPOSE 8000

# Запускаем PHP-FPM
CMD ["php-fpm", "composer install", "php artisan serve"]
