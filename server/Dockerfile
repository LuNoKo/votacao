FROM node:20.11.0-alpine

COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-found --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]