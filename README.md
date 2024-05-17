# CS160ClassDependencies

## Structure  
- React Frontend Server with Nodejs (port 5002) 
- Flask python API middleware (port 5001)  
- Database with MariaDB
  - phpmyadmin (port 2000)

## Run Locally  
Clone the project  

~~~bash  
git clone https://github.com/NikoJokhadze/CS160ClassDependencies.git
~~~

Go to the project directory  

~~~bash  
cd CS160ClassDependencies
~~~

Run Docker (add -d for detached)

~~~bash  
docker compose up
~~~

In case restart is needed (code updates) (add -d for detached)

~~~bash  
docker compose up --force-recreate --build
~~~  

To stop

~~~bash  
docker compose down
~~~  
