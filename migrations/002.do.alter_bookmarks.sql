CREATE TYPE bookmarks_category AS ENUM (
    'Bookmarks list 1',
    'Bookmarks list 2',
    'Bookmarks list 3'
);

ALTER TABLE bookmarks 
    ADD COLUMN 
        style bookmarks_category;