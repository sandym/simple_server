FROM node:lts-iron

COPY server /server

EXPOSE 8000
WORKDIR /server
ENTRYPOINT [ "npm", "start" ]
