FROM node:18 as builder

WORKDIR /myapp
COPY package.json .
RUN npm install


COPY . .
RUN npm run build
# RUN npm run uninstallDevDependencies

# Etapa 2:

FROM node:18-alpine

WORKDIR /myapp

COPY --from=builder /myapp/dist ./dist
COPY --from=builder /myapp/node_modules ./node_modules
COPY --from=builder /myapp/package*.json ./
RUN npm install -g nodemon

EXPOSE 4000

# CMD ["npm", "start"]
CMD ["nodemon", "dist/main.js"]
# CMD ["npm", "run", "start:dev"]