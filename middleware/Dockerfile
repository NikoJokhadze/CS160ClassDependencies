# Dockerfile
FROM python:3.11-bookworm

WORKDIR /app

COPY API.py .

RUN pip install flask

RUN pip install flask_cors

RUN pip install mysql-connector-python

CMD ["python", "API.py"]