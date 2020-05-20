-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 20 2020 г., 17:18
-- Версия сервера: 10.1.32-MariaDB
-- Версия PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `metaforia`
--

-- --------------------------------------------------------

--
-- Структура таблицы `all-cards`
--

CREATE TABLE `all-cards` (
  `cards_id` smallint(2) NOT NULL,
  `cards_name` char(55) NOT NULL,
  `cards_author` char(55) NOT NULL,
  `cards_descr` text NOT NULL,
  `cards_img` tinytext NOT NULL,
  `cards_type` tinyint(1) NOT NULL,
  `cards_pay` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `all-cards`
--

INSERT INTO `all-cards` (`cards_id`, `cards_name`, `cards_author`, `cards_descr`, `cards_img`, `cards_type`, `cards_pay`) VALUES
(1, 'Лица', 'Татьяна Леонова', 'Просто так...\r\nИнформация', 'cards-pack-3.png', 1, 100),
(2, 'Пятна', 'Неизвестный автор', 'lorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum', 'cards-pack-4.png', 1, 1000),
(3, 'Нечто такое', 'Неизвестный автор', 'lorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum', 'cards-pack-5.png', 1, 999),
(4, 'Цветочки', 'Неизвестный автор', 'lorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum', 'cards-pack-6.png', 1, 999),
(5, 'Цветовые пятна', 'Татьяна Леонова', 'Просто так...\r\nИнформация', 'cards-pack-1.png', 0, 0),
(6, 'Да и Нет', 'Неизвестный автор', 'Просто так...\r\nИнформация', 'cards-pack-2.png', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `all-cards__items-1`
--

CREATE TABLE `all-cards__items-1` (
  `cards___id` tinyint(4) NOT NULL,
  `cards_box` smallint(2) NOT NULL,
  `cards_id` tinytext NOT NULL,
  `cards_name` tinytext NOT NULL,
  `cards_img` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `all-cards__items-1`
--

INSERT INTO `all-cards__items-1` (`cards___id`, `cards_box`, `cards_id`, `cards_name`, `cards_img`) VALUES
(1, 1, '1-1', 'Тестовая карта 1', 'card-1.png'),
(2, 1, '1-2', 'Тестовая карта 2', 'card-1.png'),
(3, 1, '1-3', 'Тестовая карта 3', 'card-1.png'),
(4, 1, '1-4', 'Тестовая карта 4', 'card-1.png'),
(5, 1, '1-5', 'Тестовая карта 5', 'card-1.png'),
(6, 1, '1-6', 'Тестовая карта 6', 'card-1.png'),
(7, 1, '1-7', 'Тестовая карта 7', 'card-1.png'),
(8, 1, '1-8', 'Тестовая карта 8', 'card-1.png'),
(9, 1, '1-9', 'Тестовая карта 9', 'card-1.png'),
(10, 1, '1-10', 'Тестовая карта 10', 'card-1.png'),
(11, 1, '1-11', 'Тестовая карта 11', 'card-1.png'),
(12, 1, '1-12', 'Тестовая карта 12', 'card-1.png'),
(13, 1, '1-13', 'Тестовая карта 13', 'card-1.png'),
(14, 1, '1-14', 'Тестовая карта 14', 'card-1.png'),
(15, 1, '1-15', 'Тестовая карта 15\r\n', 'card-1.png'),
(16, 1, '1-16', 'Тестовая карта 16', 'card-1.png'),
(17, 1, '1-17', 'Тестовая карта 17', 'card-1.png'),
(18, 1, '1-18', 'Тестовая карта 18', 'card-1.png');

-- --------------------------------------------------------

--
-- Структура таблицы `all-cards__items-3`
--

CREATE TABLE `all-cards__items-3` (
  `cards___id` tinyint(4) NOT NULL,
  `cards_box` smallint(2) NOT NULL,
  `cards_id` tinytext NOT NULL COMMENT 'for front-end',
  `cards_name` tinytext NOT NULL,
  `cards_img` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `all-cards__items-3`
--

INSERT INTO `all-cards__items-3` (`cards___id`, `cards_box`, `cards_id`, `cards_name`, `cards_img`) VALUES
(1, 3, '3-1', 'Тестовая карта 1', 'card-3.png'),
(2, 3, '3-2', 'Тестовая карта 2', 'card-3.png'),
(3, 3, '3-3', 'Тестовая карта 3', 'card-3.png'),
(4, 3, '3-4', 'Тестовая карта 4', 'card-3.png'),
(5, 3, '3-5', 'Тестовая карта 5', 'card-3.png'),
(6, 3, '3-6', 'Тестовая карта 6', 'card-3.png'),
(7, 3, '3-7', 'Тестовая карта 7', 'card-3.png'),
(8, 3, '3-8', 'Тестовая карта 8', 'card-3.png'),
(9, 3, '3-9', 'Тестовая карта 9', 'card-3.png'),
(10, 3, '3-10', 'Тестовая карта 10', 'card-3.png'),
(11, 3, '3-11', 'Тестовая карта 11', 'card-3.png'),
(12, 3, '3-12', 'Тестовая карта 12', 'card-3.png'),
(13, 3, '3-13', 'Тестовая карта 13', 'card-3.png'),
(14, 3, '3-14', 'Тестовая карта 14', 'card-3.png'),
(15, 3, '3-15', 'Тестовая карта 15\r\n', 'card-3.png'),
(16, 3, '3-16', 'Тестовая карта 16', 'card-3.png'),
(17, 3, '3-17', 'Тестовая карта 17', 'card-3.png'),
(18, 3, '3-18', 'Тестовая карта 18', 'card-3.png');

-- --------------------------------------------------------

--
-- Структура таблицы `free-cards`
--

CREATE TABLE `free-cards` (
  `freecards_id` smallint(2) NOT NULL,
  `freecards_name` char(55) NOT NULL,
  `freecards_author` char(55) NOT NULL,
  `freecards_descr` text NOT NULL,
  `freecards_img` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `free-cards`
--

INSERT INTO `free-cards` (`freecards_id`, `freecards_name`, `freecards_author`, `freecards_descr`, `freecards_img`) VALUES
(1, 'Цветовые пятна', 'Татьяна Леонова', 'Просто так...\r\nИнформация', 'cards-pack-1.png'),
(2, 'Да и Нет', 'Неизвестный автор', 'lorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum\r\nlorem ipsum', 'cards-pack-2.png');

-- --------------------------------------------------------

--
-- Структура таблицы `tanyaleo81@yandex.ru__cards`
--

CREATE TABLE `tanyaleo81@yandex.ru__cards` (
  `cards___id` mediumint(9) NOT NULL,
  `cards_id` smallint(6) NOT NULL,
  `cards_end_date` date NOT NULL,
  `cards_type` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tanyaleo81@yandex.ru__cards`
--

INSERT INTO `tanyaleo81@yandex.ru__cards` (`cards___id`, `cards_id`, `cards_end_date`, `cards_type`) VALUES
(1, 1, '2020-08-31', 'payment'),
(3, 3, '2020-10-31', 'payment'),
(4, 4, '2022-07-31', 'payment');

-- --------------------------------------------------------

--
-- Структура таблицы `tanyaleo81@yandex.ru__clients`
--

CREATE TABLE `tanyaleo81@yandex.ru__clients` (
  `client_id` smallint(3) NOT NULL,
  `client_name` tinytext NOT NULL,
  `client_surname` tinytext NOT NULL,
  `client_gender` tinytext NOT NULL,
  `client_email` tinytext NOT NULL,
  `client_descr` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tanyaleo81@yandex.ru__clients`
--

INSERT INTO `tanyaleo81@yandex.ru__clients` (`client_id`, `client_name`, `client_surname`, `client_gender`, `client_email`, `client_descr`) VALUES
(1, 'ALex', 'Leonov', 'M', 'leha38@inbox.ru', 'best of the best !'),
(2, 'Vasya', 'from Podolsk', 'ж', 'no-reply@psy-leonova.com', 'Здесь будет информация про нового клиента.\nОписание, Примечания, И т.д Здесь будет информация про нового клиента.\nОписание, Примечания, И т.д.Здесь будет информация про нового клиента.\nОписание, Примечания, И т.д. Здесь будет информация про нового клиента.\nОписание, Примечания, И т.д. Здесь будет\nXXX'),
(3, 'Cliento', 'Italiano', 'ж8800dg', '8800d', '8800erterter et e e ter e\nerg\naaaaa'),
(19, 'Алексей', 'Леонов', '', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `tanyaleo81@yandex.ru__sessions`
--

CREATE TABLE `tanyaleo81@yandex.ru__sessions` (
  `session_id` smallint(5) NOT NULL,
  `session_date` date NOT NULL,
  `session_client` smallint(3) NOT NULL,
  `session_descr` text NOT NULL,
  `session_closed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tanyaleo81@yandex.ru__sessions`
--

INSERT INTO `tanyaleo81@yandex.ru__sessions` (`session_id`, `session_date`, `session_client`, `session_descr`, `session_closed`) VALUES
(135, '2020-05-31', 1, ' --- ', 1),
(137, '2020-05-31', 1, ' --- ', 1),
(138, '2020-05-31', 1, ' --- ', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `tanyaleo81@yandex.ru__sessions-current-cards`
--

CREATE TABLE `tanyaleo81@yandex.ru__sessions-current-cards` (
  `table___id` smallint(5) NOT NULL,
  `session_id` smallint(5) NOT NULL COMMENT 'for front-end',
  `cards_id` tinytext NOT NULL,
  `cards_name` tinytext NOT NULL,
  `cards_img` tinytext NOT NULL,
  `position_left` smallint(6) NOT NULL,
  `position_top` smallint(6) NOT NULL,
  `scale` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tanyaleo81@yandex.ru__sessions-current-cards`
--

INSERT INTO `tanyaleo81@yandex.ru__sessions-current-cards` (`table___id`, `session_id`, `cards_id`, `cards_name`, `cards_img`, `position_left`, `position_top`, `scale`) VALUES
(226, 0, '1-1', 'Тестовая карта 1', 'card-1.png', 100, 100, 1.6),
(227, 0, '1-2', 'Тестовая карта 2', 'card-1.png', 433, 354, 1),
(228, 0, '1-3', 'Тестовая карта 3', 'card-1.png', 258, 525, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `all-cards`
--
ALTER TABLE `all-cards`
  ADD PRIMARY KEY (`cards_id`);

--
-- Индексы таблицы `all-cards__items-1`
--
ALTER TABLE `all-cards__items-1`
  ADD PRIMARY KEY (`cards___id`);

--
-- Индексы таблицы `all-cards__items-3`
--
ALTER TABLE `all-cards__items-3`
  ADD PRIMARY KEY (`cards___id`);

--
-- Индексы таблицы `free-cards`
--
ALTER TABLE `free-cards`
  ADD PRIMARY KEY (`freecards_id`);

--
-- Индексы таблицы `tanyaleo81@yandex.ru__cards`
--
ALTER TABLE `tanyaleo81@yandex.ru__cards`
  ADD PRIMARY KEY (`cards___id`);

--
-- Индексы таблицы `tanyaleo81@yandex.ru__clients`
--
ALTER TABLE `tanyaleo81@yandex.ru__clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Индексы таблицы `tanyaleo81@yandex.ru__sessions`
--
ALTER TABLE `tanyaleo81@yandex.ru__sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Индексы таблицы `tanyaleo81@yandex.ru__sessions-current-cards`
--
ALTER TABLE `tanyaleo81@yandex.ru__sessions-current-cards`
  ADD PRIMARY KEY (`table___id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `all-cards`
--
ALTER TABLE `all-cards`
  MODIFY `cards_id` smallint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `all-cards__items-1`
--
ALTER TABLE `all-cards__items-1`
  MODIFY `cards___id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `all-cards__items-3`
--
ALTER TABLE `all-cards__items-3`
  MODIFY `cards___id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `free-cards`
--
ALTER TABLE `free-cards`
  MODIFY `freecards_id` smallint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `tanyaleo81@yandex.ru__cards`
--
ALTER TABLE `tanyaleo81@yandex.ru__cards`
  MODIFY `cards___id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `tanyaleo81@yandex.ru__clients`
--
ALTER TABLE `tanyaleo81@yandex.ru__clients`
  MODIFY `client_id` smallint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `tanyaleo81@yandex.ru__sessions`
--
ALTER TABLE `tanyaleo81@yandex.ru__sessions`
  MODIFY `session_id` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT для таблицы `tanyaleo81@yandex.ru__sessions-current-cards`
--
ALTER TABLE `tanyaleo81@yandex.ru__sessions-current-cards`
  MODIFY `table___id` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
