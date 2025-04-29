FROM node:18

WORKDIR /var/www/html/itr-website

# WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install -g npm@3.0.0
# RUN npm install --force

RUN npm install --force

RUN npm -g i next@15.3.1

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["npm", "run", "deploy:docker"]

# CMD ["npm","run", "start"]

CMD ["next", "start"]