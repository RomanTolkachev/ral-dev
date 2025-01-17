Для установки проекта локально, требуется PHP 8.3, composer, laraver и node.js. Также требуется рабочая база данных. На моем ПК работала версия mySQL 8.2. Верссия sql настраивается в файле .env, об этом далее.

    - скачиваем репозиторий

    - переименовваем файл env-example в <.env> и настраиваем его под локальное окружение. Переменные, которые нужно настроить:
        - DB_CONNECTION - тут система управления БД (mysql, mssql, postgre и т.д)
        - DB_HOST - айпи на котором хостится БД. Это нужно смотерть в настройках сервера БД. Например,в OSPanel 6 mySQL 8.2 хостится на 127.127.126.50
        - DB_PORT - стандартный порт это 3306, если БД не отвечает, то лучше проверить.
        DB_DATABASE=имя БД

    - устанавливаем зависимости командами
        composer install
        npm install

    - далее нужно создать тиблицы командой php artisam migrate

    - заполняем БД начальными данными, которые находятся в файле database\seeders\fsa_scan_dbo_ral_short_info.sql

    - кэшируем конфигурацию, сбрасываем роуты..  и т.д. командой 
        php artisan optimize

    - запускаем серверы для БЭК и фронт командами
        php artisan serve
        npm run dev

    проект будет работать по адресу: http://127.0.0.1:8000/

    Если не запустить сервер для фронта, то фронт будет отдан статично из папки build