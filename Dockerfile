FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000
ENV GEMINI_KEY=AIzaSyB_OJYmAF4VNVGlO8IRwYF2iVxed9VmGs8


EXPOSE 4000


CMD ["npm", "run", "dev"]
