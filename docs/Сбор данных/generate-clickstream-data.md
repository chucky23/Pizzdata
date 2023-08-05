---
id: generate-clickstream-data
title: Генерация фейковых данных о посетителях сайта
description:  Научись создавать датафреймы с искусственными данными с помощью Python. На полученных данных можно практиковаться в анализе и интерпретации информации.
tags:
  - python
slug: /generate-clickstream-data
sidebar_position: 1
sidebar_label: Генерация кликстрима
keywords: [генерация данных, создание датафрейма с искусственными данными]
draft: false
---

# Создание датафрейма с действиями пользователей сайта

Иногда приходится создавать «игрушечные» данные, чтобы тренироваться, либо чтобы не демонстрировать публично конфиденциальную информацию. Специально для этих целей я написал скрипт, который генерирует датафрейм с событиями пользователей на сайте.

## Подготовка инфраструктуры

Для начала создай папку проекта и установи там [виртуальное окружение](/docs/venv). Для работы тебе понадобится только одна внешняя библиотека — Pandas. Установи её в созданном окружении.

```shell
pip install pandas
```

## Пишем код

### Импорт библиотек

```python
import random
import datetime
import uuid

import pandas as pd
```

### Создание функций

```python
# Функция для генерации случайного действия пользователя
def generate_user_events(user_id, session_id, start_datetime, max_events_per_session):
    previous_event_date = start_datetime

    events = []
    for event in range(1, random.randint(1, max_events_per_session + 1)):
        event_id = f'e-{str(uuid.uuid4().hex)}'
        max_time_diff = datetime.timedelta(seconds=random.randint(5, 200))

        event_date = previous_event_date + max_time_diff
        url = random.choices(list(url_weight.keys()),
                            weights = list(url_weight.values()),
                            k = 1)
        event_name = random.choices(list(event_weight.keys()),
                                    weights = list(event_weight.values()),
                                    k = 1)

        event = {'user_id': user_id,
            'session_id': session_id,
            'event_id': event_id,
            'timestamp': event_date,
            'url': url[0],
            'event_type': event_name[0]}

        events.append(event)

        previous_event_date = event_date

    return events


# Функция для генерации датафрейма с кликстримом
def generate_clickstream(start_date, users_count, max_sessions_per_user, max_events_per_session):
    start_datetime = datetime.datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')

    logs = []
    for user in range(1, users_count + 1):
        user_id = f'UID-{user}'
        user_random_start_datetime = datetime.timedelta(days=random.randint(0, 30),
                                                        hours=random.randint(0, 23),
                                                        minutes=random.randint(0, 59),
                                                        seconds=random.randint(1, 59))
        start_datetime = start_datetime + user_random_start_datetime
        for session in range(1, random.randint(1, max_sessions_per_user + 1)):
            session_id = f's-{str(uuid.uuid4())}'
            session_logs = generate_user_events(user_id,
                                                session_id,
                                                start_datetime,
                                                max_events_per_session)
            logs.extend(session_logs)
            session_random_start_datetime = datetime.timedelta(days=random.randint(0, 30), 
                                                                hours=random.randint(0, 23),
                                                                minutes=random.randint(0, 59),
                                                                seconds=random.randint(1, 59))
            start_datetime = start_datetime + session_random_start_datetime

    df = pd.DataFrame(logs)
    
    return df
```

### Определение конфигурационных данных

```python
start_date = '2022-03-24 00:00:00'  # Дата с которой начнётся генерация событий

users_count = 100  # Количество пользователей
max_sessions_per_user = 10  # Максимальное количество сессий на каждого пользователя
max_events_per_session = 50  # Максимальное количество событий на каждую сессию

# Справочник URL и частоты их встречаемости в выборке относительно друг друга
url_weight = {
    '/product': 30,
    '/category': 10,
    '/home': 5,
    '/contact': 2,
    '/cart': 5,
    '/order': 1
}

# Справочник событий и частоты их встречаемости в выборке относительно друг друга
event_weight = {
    'page_view': 30, 
    'click': 15,
    'add_to_cart': 6,
    'submit': 2
}
```


### Генерация данных и сохранение их в переменную

```python
df = generate_clickstream(start_date, users_count, max_sessions_per_user, max_events_per_session)
```

## Результат

```python
print(df)
```

| user_id   | session_id                             | event_id                           | timestamp           | url       | event_type   |
|:----------|:---------------------------------------|:-----------------------------------|:--------------------|:----------|:-------------|
| UID-1     | s-3bd5e895-413b-4a70-8220-e250e394982a | e-e7ed20572f274e878cb926c53a6602e0 | 2022-04-20 01:18:37 | /product  | page_view    |
| UID-1     | s-3bd5e895-413b-4a70-8220-e250e394982a | e-8107f70a3fea4619a010e7705eeae392 | 2022-04-20 01:21:24 | /product  | click        |
| UID-1     | s-3bd5e895-413b-4a70-8220-e250e394982a | e-2d7c7519678f4bcba5350ebd17d01788 | 2022-04-20 01:23:11 | /cart     | page_view    |
| UID-1     | s-3bd5e895-413b-4a70-8220-e250e394982a | e-5c9a34481ede4fb19553cb3a410a3bd8 | 2022-04-20 01:25:03 | /product  | click        |
| UID-1     | s-3bd5e895-413b-4a70-8220-e250e394982a | e-2a4a9c8669104bf780a078a081e492cb | 2022-04-20 01:28:02 | /product  | click        |
| UID-1     | s-3bd5e895-413b-4a70-8220-e250e394982a | e-51a5c9931bb446e28a939a60c9fa427d | 2022-04-20 01:30:16 | /product  | add_to_cart  |
|    —      |     —                                  |     —                              |     —               |     —     |     —        |
| UID-100   | s-099aea71-0968-4d4e-a6c2-26e4e4fd6245 | e-1e681d3dbfdb46a1ad6521a284927e7b | 2024-05-09 09:40:38 | /product  | click        |
| UID-100   | s-099aea71-0968-4d4e-a6c2-26e4e4fd6245 | e-8763d0957df949e5b0ebd717ce496ca1 | 2024-05-09 09:42:13 | /order    | page_view    |
| UID-100   | s-099aea71-0968-4d4e-a6c2-26e4e4fd6245 | e-321cc38cee7c45e98821894181ed8607 | 2024-05-09 09:44:24 | /product  | add_to_cart  |
| UID-100   | s-099aea71-0968-4d4e-a6c2-26e4e4fd6245 | e-b48bc02fb54b42cfa6a56dfa4779c436 | 2024-05-09 09:47:17 | /product  | click        |
| UID-100   | s-099aea71-0968-4d4e-a6c2-26e4e4fd6245 | e-84172f9f3a5c4029b3d3136ae2edb316 | 2024-05-09 09:47:35 | /product  | page_view    |
| UID-100   | s-ec934299-5daa-42da-aced-71b78b2552b7 | e-e1f1acdd217a4fdb9e680961ce4b55fa | 2024-05-11 01:39:40 | /product  | page_view    |
| UID-100   | s-ec934299-5daa-42da-aced-71b78b2552b7 | e-adf5a67f58dc4a43bdcb998d019d69c8 | 2024-05-11 01:42:18 | /category | click        |
| UID-100   | s-ec934299-5daa-42da-aced-71b78b2552b7 | e-ea38c4bff2424da7b4ec9ce46c3c6f71 | 2024-05-11 01:45:33 | /category | page_view    |