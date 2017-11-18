# hackatomsk2017-Jack_siberian

Карточная игра "Дурак" с возможностью делать ставки на фантики или Биткоины

Разработка ведется в 4 направлениях:
 * Дизайн 
 * Алгоритм Игры (ветка cpp_serv)
 * Фрондэнд и Бэкенд (ветка m_sylack)
 * Биткоины 


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


## Start
Step 0:
```
docker run -d -p 6379:6379 redis --port 6379
```

Step 1:
```
yarn install
```

Step 2:
```
yarn start
```

Step 3 (for frontend):
```
yarn watch
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
