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

## Подготовка инфраструктуры



## Код

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


def generate_sessions(start_date, users_count, max_sessions_per_user, max_events_per_session):
    start_datetime = datetime.datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')

    logs = []
    for user in range(1, users_count + 1):
        user_id = f'UID-{user}'
        user_random_start_datetime = datetime.timedelta(days=random.randint(0, 30), hours=random.randint(0, 23), minutes=random.randint(0, 59), seconds=random.randint(1, 59))
        start_datetime = start_datetime + user_random_start_datetime
        for session in range(1, random.randint(1, max_sessions_per_user + 1)):
            session_id = f's-{str(uuid.uuid4())}'
            session_logs = generate_user_events(user_id, session_id, start_datetime, max_events_per_session)
            logs.extend(session_logs)
            session_random_start_datetime = datetime.timedelta(days=random.randint(0, 30), hours=random.randint(0, 23), minutes=random.randint(0, 59), seconds=random.randint(1, 59))
            start_datetime = start_datetime + session_random_start_datetime
    df = pd.DataFrame(logs)
    return df
``````