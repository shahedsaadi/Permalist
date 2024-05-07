CREATE TABLE headers (
  id SERIAL PRIMARY KEY,
  list_name VARCHAR(15) NOT NULL
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  header_id INTEGER REFERENCES headers(id)
);

INSERT INTO headers (list_name) VALUES ('Today'), ('Week'), ('Month');
INSERT INTO items (title, header_id) VALUES ('Buy milk', 1), ('Finish homework',2), ('Go to the cinema', 3);

SELECT *
FROM items
JOIN headers
ON headers.id = header_id;