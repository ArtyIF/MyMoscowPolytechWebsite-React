#! /bin/bash
echo '1/4 Установка пакетов у клиента'
cd client
npm install
cd ..

echo '2/4 Установка пакетов у сервера'
cd server
npm install
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