# Establecemos la imagen base de Node.js
FROM node:20-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json (o yarn.lock) dentro del contenedor
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Agregamos permisos de ejecución al archivo binario 'nest' en node_modules
RUN chmod +x ./node_modules/.bin/nest

# Copiamos todo el contenido del proyecto al contenedor
COPY . .

# Ejecutamos el comando de compilación para generar la aplicación (si es necesario)
RUN npm run build

# Exponemos el puerto que usa la aplicación (por defecto NestJS usa el puerto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
