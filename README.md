# hackatomsk2017-Jack_siberian

Карточная игра "Дурак" с возможностью делать ставки в фишках (купленные за e-money) и Bitcoin 


Разработка ведется в 4 направлениях:
 * Дизайн 
 * Алгоритм Игры (ветка cpp_serv)
 * Фрондэнд и Бэкенд (ветка m_sylack)
 * Биткоины 

ФУНКЦИОНАЛ ИГРЫ 
 * Клиент серверное приложение 
 * До 4ех игроков в одной игре 
 * Страницы авторизации, с привязкой Bitcoin-кошелька 
 * Игровая комната с возможность зайти в созданную игру или хостануть свою 
 * Сам игровой стол


Product manager: @Jack_siberian

# Design 
Scetch made with figma.com
Source: https://www.figma.com/file/OJVd6h5XlZpxZrHesLIOLu16/Untitled

Source for icons: freepic.com and flaticon.com 

# Frontend + Backend = one love
* Node.js v8
* Socket.IO
* ReactJS v16
* jQuery

BLOCKCHAIN.INFO
* https://blockchain.info/ru/api  
* https://blockchain.info/api/blockchain_wallet_api 


## Start
Step -1:
```
docker run -d -p 6379:6379 redis --port 6379
```

Step 0:
```
cd ./server
```

Step 1:
```
yarn install
```

Step 2:
* Node.JS v7.5
```
cd ../server-wallet
yarn install
yarn start:wallet
```

Step 3:
```
yarn start
```

Step 4 (for frontend):
```
yarn start:dev
```
# server for game 
  ZMQ (use socet) http://zeromq.org/bindings:cpp 
  
or

  node.js (js)

to send data will be create with Json

# game logic

Create on node.js server with use js.

Another realise:

hard version (it you can use like .h library): durak.cpp

more hard version - easy_game.cpp
