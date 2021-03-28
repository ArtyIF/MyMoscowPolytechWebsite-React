#! /bin/bash
echo '1/4 Обновление пакетов у клиента'
cd client
npm update
cd ..

echo '2/4 Обновление пакетов у сервера'
cd server
npm update
cd ..

echo '3/4 Сборка клиента'
cd client
npm run build
cd ..

echo '4/4 Запуск сервера'
cd server
npm start > ../server.log & disown
cd ..

echo 'Заметка: чтобы убить сервер, напишите "ps auxf", найдите "npm start", а потом напишите "kill <PID процесса npm start>"'

# TODO: протестировать и исправить