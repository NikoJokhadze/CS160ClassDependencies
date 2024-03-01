# CS160ClassDependencies

## Structure  
- React Frontend Server with Nodejs (port 42069) 
- API middleware (port 5000)  
- Database with MySQL (port 3306 [unsure])
  - phpmyadmin (port 2000)

## Run Locally  
Clone the project  

~~~bash  
  git clone github.com/NikoJokhadze/CS160ClassDependencies
~~~

Go to the project directory  

~~~bash  
  cd CS160ClassDependencies
~~~

Run Docker (add -d for detached)

~~~bash  
docker compose up
~~~

In case restart is needed (code updates)

~~~bash  
docker compose up --force-recreate --build
~~~  

To stop

~~~bash  
docker compose down
~~~  
