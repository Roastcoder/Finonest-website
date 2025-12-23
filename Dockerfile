FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV DB_HOST=10.0.1.8
ENV DB_PORT=3306
ENV DB_USER=admin
ENV DB_PASSWORD=Finonest@admin@root
ENV DB_NAME=Fino
ENV JWT_SECRET=finonest-production-secret
ENV PORT=5000

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "server"]