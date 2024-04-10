# Dockerfile
FROM python:3.11-bookworm

WORKDIR /app

COPY API.py .

RUN pip install requirements.txt

CMD ["python", "API.py"]