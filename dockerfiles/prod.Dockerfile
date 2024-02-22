FROM node:slim as development
WORKDIR /usr/src/app
COPY --chown=node:node package.json ./
RUN npm install --force

USER node
FROM node:slim as build
WORKDIR /usr/src/app
COPY --chown=node:node src ./
COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig.build.json ./
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node nest-cli.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
RUN npm run build
ENV NODE_ENV production
RUN npm install --only=production --force
RUN npm cache clean --force

USER node
FROM node:slim as production
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3030

COPY dockerfiles/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

#CMD ["node", "dist/main"]
