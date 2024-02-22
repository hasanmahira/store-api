FROM node:slim as development
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN apt-get update && apt-get install -y procps && rm -rf /var/lib/apt/lists/*
EXPOSE 3030
CMD ["npm", "run", "start:dev"]

