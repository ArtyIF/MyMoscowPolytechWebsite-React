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
npm start &
cd ..

# TODO: протестировать и исправить