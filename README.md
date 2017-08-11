# Offline torrent browser 💾🌍🔎

Search 🔎 and download 💾 torrents with a local copy of a 🌍 database.

This piece of software contain some minial text specific for TMD. But you can easily fork and change all the relevant text to adapt to you needs.

## Main features:
* Search by name
* Realtime DHT peer display
* Magnet links
* No external daemons to install
* SQL oriented with SQLite
* Pure nodejs implementation

## Data models

There are only two main tables.

```SQL
create table torrents(
  id integer PRIMARY KEY,
  hash CHARACTER(32),
  name VARCHAR(255),
  filename VARCHAR(255),
  category TINYINT,
  size BIGINT,
  added DATE,
  comments MEDIUMINT,
  views MEDIUMINT,
  thanks MEDIUMINT
);

create table torrents_description(
  id integer PRIMARY KEY,
  description string
);

CREATE TABLE key_value(key VARCHAR(32), value string);
```

## SQLite
SQLite database doesn't require a running daemon. You can query and modify the database using the
SQLite command line tool.

## Import from TSV

```
.separator "\t"

.import /../torrents.tsv torrents

.import /../torrents_description.tsv torrents_description
```