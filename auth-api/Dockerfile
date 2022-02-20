FROM node:12.11.1
WORKDIR .
COPY package*.json ./
RUN npm config set "strict-ssl" false -g
RUN yarn 
COPY . .
EXPOSE 8080
CMD ["node", "app.js"]
