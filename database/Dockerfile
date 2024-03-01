# Dockerfile
FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=MYSQL_ROOT_PASSWORD
ENV MYSQL_DATABASE=MYSQL_DATABASE
ENV MYSQL_USER=MYSQL_USER
ENV MYSQL_PASSWORD=MYSQL_PASSWORD

COPY createtables.sql /docker-entrypoint-initdb.d/

CMD ["mysqld", "--lower_case_table_names=1"]