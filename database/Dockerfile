FROM mariadb:latest

ENV MARIADB_ROOT_PASSWORD=MYSQL_ROOT_PASSWORD
ENV MARIADB_DATABASE=ClassDependenciesDatabase
ENV MARIADB_USER=MYSQL_USER
ENV MARIADB_PASSWORD=MYSQL_PASSWORD

COPY createtables.sql /docker-entrypoint-initdb.d/
COPY importdata.sql /docker-entrypoint-initdb.d/
# These are run in ALPHABETICAL ORDER

COPY ./data/*.csv docker-entrypoint-initdb.d


# this issue took 4 hours to find, if going back to mysql remember these commands, also, it is ALWAYS Windows to blame
RUN for file in /docker-entrypoint-initdb.d/*.csv; do tr -d '\r' < "$file" > "/docker-entrypoint-initdb.d/fixed_$(basename "$file")" && rm "$file"; done

# ---------- END ---------- # 

# RUN tr -d '\r' < /docker-entrypoint-initdb.d/courses.csv > /docker-entrypoint-initdb.d/fixed_courses.csv
# RUN tr -d '\r' < /docker-entrypoint-initdb.d/prereq.csv > /docker-entrypoint-initdb.d/fixed_prereq.csv
# RUN tr -d '\r' < /docker-entrypoint-initdb.d/precoreq.csv > /docker-entrypoint-initdb.d/fixed_precoreq.csv
# RUN tr -d '\r' < /docker-entrypoint-initdb.d/coreq.csv > /docker-entrypoint-initdb.d/fixed_coreq.csv
# RUN tr -d '\r' < /docker-entrypoint-initdb.d/cross.csv > /docker-entrypoint-initdb.d/fixed_cross.csv
# should find a cleaner way when I have the time
#RUN rm /docker-entrypoint-initdb.d/courses.csv /docker-entrypoint-initdb.d/prereq.csv /docker-entrypoint-initdb.d/precoreq.csv /docker-entrypoint-initdb.d/cross.csv /docker-entrypoint-initdb.d/coreq.csv

# Legacy in case we want to go back
# # Dockerfile
# FROM mysql:latest

# ENV MYSQL_ROOT_PASSWORD=MYSQL_ROOT_PASSWORD
# ENV MYSQL_DATABASE=ClassDependenciesDatabase
# ENV MYSQL_USER=MYSQL_USER
# ENV MYSQL_PASSWORD=MYSQL_PASSWORD

# COPY createtables.sql /docker-entrypoint-initdb.d/
# COPY importdata.sql /docker-entrypoint-initdb.d/ 
# # These are run in ALPHABETICAL ORDER

# RUN printf '[mysqld]\nsecure-file-priv = ""\n' > /etc/mysql/my.cnf

# COPY courses.csv /var/lib/mysql-files
# # that is the file frolder from /etc/my.cnf specified for secure-file-priv

# CMD ["mysqld", "--lower_case_table_names=1"]