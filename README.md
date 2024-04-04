## Sport App
Sport App es una aplicación web desarrollada en React que proporciona a los usuarios una plataforma para gestionar y realizar seguimiento de sus actividades deportivas, planes de entrenamiento y alimentación.

### Características principales
- Registro de usuarios y selección de planes (gratuito, intermedio, premium)
- Registro de servicios de terceros (deportólogo, entrenador, alimentación)
- Creación y visualización de planes de entrenamiento en un calendario

### Configuración del proyecto
El proyecto está configurado con las siguientes herramientas y tecnologías:

- Webpack: Bundler de módulos para empaquetar y optimizar los assets de la aplicación.
- Babel: Transpilador de JavaScript que permite utilizar características modernas de ECMAScript.
- TypeScript: Superset de JavaScript que añade tipado estático y otras características al lenguaje.
- SCSS: Preprocesador de CSS que extiende su funcionalidad con variables, mixins, etc.

### Dependencias principales
- React: Biblioteca de JavaScript para construir interfaces de usuario.
- React Router: Biblioteca para el enrutamiento en aplicaciones React.
- Axios: Cliente HTTP basado en promesas para realizar solicitudes a APIs.
- Material-UI: Biblioteca de componentes de interfaz de usuario para React siguiendo las pautas de Material Design.
- Jest: Framework de pruebas para JavaScript.

Para ver la lista completa de dependencias, consulta el archivo package.json.

### Instalación
1. Clonar el repositorio:

```
git clone https://github.com/tu-usuario/sportapp-web.git
```

2. Navegar al directorio del proyecto:

```
cd sportapp-web
```

3. Instalar las dependencias:

```
npm install
```

### Scripts disponibles
`npm run prod`: Realiza el build de producción de la aplicación. Genera los archivos optimizados y minificados en el directorio dist/.

`npm run dev`: Inicia el servidor de desarrollo con hot-reloading. Permite visualizar la aplicación en el navegador y actualiza automáticamente los cambios realizados en el código.

`npm test`: Ejecuta las pruebas unitarias utilizando Jest. Las pruebas se encuentran en el directorio tests/.

### Contribución
Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama con la nueva funcionalidad o corrección de errores: git checkout -b nombre-de-la-rama.
3. Realiza los cambios necesarios y realiza commits descriptivos.
4. Envía tus cambios al repositorio remoto: git push origin nombre-de-la-rama.
5. Abre un pull request en GitHub para que tus cambios sean revisados e integrados.
