# Везде, где есть два middleware

Там где есть middleware `checkLogin` и `checkAuth` обязательно в куках должно быть поле `token` из таблицы `sessions`, а также в теле запроса должен быть `nickname` юзера
