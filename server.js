// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть
// гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть
// гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение
// счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http');
var fs = require('fs');

const server = http.createServer((req, res) => {
  console.log('запрос получен');

  const url = req.url;

  let viewCount = 0;

  if (fs.existsSync('viewCount.txt')) {
    viewCount = parseInt(fs.readFileSync('viewCount.txt', 'utf8'), 10);
  }

  viewCount++;

  fs.writeFileSync('viewCount.txt', viewCount.toString());

  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.write('<html><body>');

  if (url === '/') {
    res.write('<h1>Главная страница</h1>');
    res.write('<p>Просмотры: ' + viewCount + '</p>');
    res.write('<a href="/about">Перейти на страницу "О нас"</a>');
  } else if (url === '/about') {
    res.write('<h1>О нас</h1>');
    res.write('<p>Просмотры: ' + viewCount + '</p>');
    res.write('<a href="/">Вернуться на главную страницу</a>');
  } else {
    res.statusCode = 404;
    res.write('<h1>Страница не найдена</h1>');
    res.write('<a href="/">Вернуться на главную страницу</a>');
  }

  res.end('</body></html>');
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
