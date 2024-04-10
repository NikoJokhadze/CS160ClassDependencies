# Dockerfile
FROM python:3.11-bookworm

WORKDIR /app

COPY API.py .

COPY requirements.txt .

RUN pip install -r requirements.txt

CMD ["python", "API.py"]