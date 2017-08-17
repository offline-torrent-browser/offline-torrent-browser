# Offline torrent browser 🔎💾🌍

Search 🔎 and download 💾 torrents with a local copy of a database 🌍.

Given the database this will start a local server that you can browse using your favorite browser.

## Main features:
* Search by name
* Realtime DHT peer display
* Magnet links
* No external daemons to install
* SQL oriented with SQLite
* Pure nodejs implementation

## Running
```
$ offline-torrent-browser example_db/example.sqlite
```

## Demo
![Demo](https://raw.githubusercontent.com/offline-torrent-browser/offline-torrent-browser/master/DEMO.gif)

## SQLite
SQLite database doesn't require a running daemon. You can query and modify the database using the
SQLite command line tool.

## Create the database
[Data model and creation of an example DB with sqlite](EXAMPLE_DB.md). 

For demo purpose you can use `example_db/example.sqlite` database.