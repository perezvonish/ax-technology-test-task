## Description

Medium Lite
Создать простой бекенд-аналог популярного сервиса Medium

Есть 2 сущности:

interface User {

id: number;

email: string;

password: number;

posts: Post[];

}

interface Post {

id: number;

title: string;

content: string;

author: User;

}


## Возможности бекенда:

▪️ Авторизация

▪️ Создание поста

▪️ Список постов пользователя (+ пагинация)

▪️ Список пользователей (+ пагинация)

▪️ Получение поста по айди


Каждый запрос подразумевает валидацию передаваемых параметров, обработку ошибок и понятный ответ в случае ошибок.

Так же, сделать расчет времени чтения поста как в одноименном сервисе (в минутах).

Дополнительное задание: Добавить рейтинг в постах + рейтинг пользователя (рассчитывается смотря на рейтинг его постов).

## Технические данные:

Фреймворк для бекенда: NestJS/  ExpressJS

База данных: SQLite

Предпочитаемый язык: Typescript (желательно)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```