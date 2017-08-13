## Data models

There are only two main tables.

```SQL
$ sqlite3 example.sqlite
SQLite version 3.8.5 2014-08-15 22:37:57
Enter ".help" for usage hints.
sqlite>

create table torrents(
  id integer PRIMARY KEY,
  hash CHARACTER(32),
  name VARCHAR(255),
  filename VARCHAR(255),
  category TINYINT,
  size BIGINT, /* Megabytes */
  added DATE,
  comments MEDIUMINT,
  views MEDIUMINT,
  thanks MEDIUMINT
);

create table torrents_description(
  id integer PRIMARY KEY,
  description string
);

create table key_value(key VARCHAR(32), value string);

insert into torrents(id, hash, name, filename, category, size, added, comments, views, thanks) values (
  1, "59066769B9AD42DA2E508611C33D7C4480B3857B", "Ubuntu", "ubuntu", 1, 1600, '2017-08-13', 0, 0, 0
);

insert into torrents_description(id, description)
values (1, "Ubuntu description");

insert into key_value(key, value)
values ("index", "This will appear on index page");
```


## Import from TSV
The column in tsv should follow the same order as the table.

```
.separator "\t"

.import /../torrents.tsv torrents

.import /../torrents_description.tsv torrents_description
```
Done!