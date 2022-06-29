
FROM node:lts
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
