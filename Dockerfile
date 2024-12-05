FROM node:18
WORKDIR /app
ENV PORT=8080
COPY package*.json ./
COPY . .
RUN npm install
ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm", "run", "start"]