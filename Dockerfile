
FROM node:15.13-alpine
WORKDIR /usr/app

# Install pm2 
# RUN yarn global add pm2

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --production


COPY ./ ./

RUN yarn build 

EXPOSE 3005

CMD [ "yarn", "start"]
