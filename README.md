# FRONTEND MEMORY-APP

Написан на Reactjs. Для store использовал Redux Toolkit. Чтобы удобнее обращаться к API, использовал RTK Query. 
В процессе понял, что RTK Query не самый удобный способ для запросов, т.к. мне нужно было хранить посты в общем store для функции сортировки и прочего.
Пришлось лепить костыль, который сразу после запроса сохранял некоторые данные с помощью отдельного редюсера. Чтобы не писать все стили с нуля
использовал Material UI, он понравился мне больше Ant Design тем, что у него более приятная документация и с ним проще создавать структуру.   

В приложении можно зарегистрироваться, либо войти через Google-Аккаунт. Доступ ко всем функциям пользователся осуществляется через токен. Токен хранится в localStorage. При каждом запросе он попадает в заголовки(прописал в baseQuery). Если вернётся ошибка 401, то выполнится запрос на обновление токенов   


