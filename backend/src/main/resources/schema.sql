drop table if exists quote CASCADE;

CREATE TABLE quote (
    id bigint generated by default as identity,
    symbol varchar(255),
    open_value double,
    close_value double,
    timestamp timestamp,
    primary key (id)
);