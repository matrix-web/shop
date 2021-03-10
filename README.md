# Учебный проект - интернет магазин недвижимости

## :hammer_and_wrench: Установка
* Скачайте проект себе на локальный компьютер командой ```git clone https://github.com/matrix-web/shop.git```
* После скачивания перейдите в папку с проектом и в консоли выполните установку зависимостей командой ```npm i```
* После установки зависимостей запустите сборку одной из команд:
    *  ```npm run start``` (режим разработки)
    *  ```npm run build``` (режим сборки)

Если вы всё сделали правильно, у вас должен открыться браузер с локальным сервером. Режим сборки предполагает оптимизацию проекта: сжатие изображений, минифицирование CSS и JS-файлов для загрузки на сервер.

Для просмотра Demo перейдите в ветку `shop-demo`.

## :open_file_folder: Файловая структура

```
shop
├── dist
├── tasks
├── src
│   ├── pug
│   ├── fonts
│   ├── img
│   ├── libs
│   ├── js
│   └── styles
├── gulpfile.esm.js
├── webpack.config.js
├── package.json
├── .browserlistrc
├── .babelrc
└── .gitignore
```

* Корень папки:
    * ```.babelrc``` — настройки Babel
    * ```.gitignore``` – запрет на отслеживание файлов Git'ом
    * ```webpack.config.js``` — настройки Webpack
    * ```package.json``` — список зависимостей
* Папка ```src``` - используется во время разработки:
    * шрифты: ```src/css```
    * изображения: ```src/img```
    * JS-файлы: ```src/js```
    * Главная страница: ```index.html```
* Папка ```_template``` - папка, из которой запускается локальный сервер для разработки (при запуске ```npm run start```)


### Что сделано
* Фронтенд для магазина на чистом JavaScript