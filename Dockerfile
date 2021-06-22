FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

ENV REACT_APP_BASE_URL=https://video2audio.herokuapp.com/

RUN npm install
RUN npm run build


FROM python:3.8


ENV FLASK_APP=back
ENV FLASK_ENV=production

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

RUN pip install -r requirements.txt
RUN pip install psycopg2

CMD gunicorn back:app
