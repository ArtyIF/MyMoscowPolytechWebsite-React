#! /bin/bash
cd server
npm start &
cd ..

cd client
npm start &
cd ..

wait $(jobs -p)