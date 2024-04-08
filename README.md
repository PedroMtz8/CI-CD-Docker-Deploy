
## Guía de Clonación y Ejecución del Proyecto Blog-Test

Abre una terminal para ejecutar los siguientes comandos

### 1. Clonar el Repositorio
```bash
git clone https://github.com/PedroMtz8/Blog-Test.git
```

### 2. Entrar a la Carpeta Clonada
```bash
cd Blog-Test
```

### 3. Inicializar la Base de Datos en MySQL
Asegúrate de tener un servidor MySQL instalado y ejecuta los siguientes comandos en tu terminal o cliente MySQL:
```bash
CREATE DATABASE blogs;
```

### 4. Configurar Variables de Entorno del servidor
Entra a la carpeta server y crea un archivo .env con las siguientes variables, ajustándolas según tu configuración local:
```bash
cd server

PORT=3001

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=blogs

JWT_SECRET=tu_secreto
```
### 5. Instalar Dependencias del Servidor
En la carpeta server, ejecuta:
```bash
  npm install
```

### 6. Correr el Servidor en Modo Desarrollo
```bash
npm run start:dev
```

### 7. Entrar a la Carpeta del Cliente
Abrir otra terminal en la raiz del proyecto y entrar a la carpeta client
```bash
cd client
```

### 8. Instalar Dependencias del Cliente
```bash
npm install
```

### 10. Configurar Variable de Entorno del cliente
En la carpeta del cliente, generar un archivo .env y agregar la siguiente variable
```bash
VITE_API_URL=url_obtenida
```
Esta variable la puedes extraer del log del servidor cuando se ejecutó el paso 6

Deberías ver algo como: Application is running on http://localhost:puerto_configurado_en_paso_4

### 10. Correr el Cliente en Modo Desarrollo 
```bash
npm run dev
```

### 11. Abrir el Cliente en un Navegador
Abre tu navegador y visita http://localhost:5173 o clickea el mismo enlace para visualizar el cliente React con Vite.
