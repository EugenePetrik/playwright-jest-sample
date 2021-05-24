FROM mcr.microsoft.com/playwright:v1.11.0-focal

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm" ]

CMD [ "test" ]
