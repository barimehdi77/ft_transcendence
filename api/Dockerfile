FROM node:16

# Create app directory, this is in our container/in our image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./
COPY ./.env .
COPY prisma ./prisma/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npx prisma generate

# COPY tsconfig.json file
COPY tsconfig.json ./

# Bundle app source
ADD . .


RUN npm run build

EXPOSE 8080
# A command to start the server
CMD [ "npm", "run", "start:prod" ]

