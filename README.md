
# Black & Orange - Prueba Técnica

Esta es una aplicación backend que actúa como middleware para comunicar peticiones http con la plataforma HubSpot. Tiene las siguientes funciones:

Para iniciar la aplicación, primero deben clonar el repositorio a uno local.

Una vez allí, para el inicio de la aplicación backend, deberá instalar las dependencias utilizadas.




## Instalación

Clonamos el repositorio

```bash
  git clone https://github.com/SebasPCDev/hubspot-test-full.git
```

### Instalación del Back

```bash
    cd hubspot-test-full
    cd back
    npm i
```

Luego de tener todas las dependencias instaladas, debe crear un archivo .env replicando el mismo formato de .env.example y agregar la API-KEY.

Luego, ejecutar 
```bash
    npm run dev
```

Con esto debería levantar el servidor en el puerto 3000.

### Instalación del Front

```bash
    cd hubspot-test-full
    cd front
    npm i
```

Ejecutar: 
 ```bash
    npm start
```

Si el puerto 3000 se encuentra ocupado, la terminal le indicará que deberá buscar otro puerto. OJO, esto lo hace automático, sin embargo, usted debe aceptar indicando la letra [y].
## Ejecuión de Test

Para correr los test del back, sólo debe ejecutar el comando

```bash
  npm test
```
Esto automáticamente correrá los test establecidos para la aplicación.

Si quiere correr un determinado test, deberá ejecutar

```bash
  npm test [nombredeltest].test.ts
```


## Soporte

Para soporte, escribir a sebpa.16@gmail.com




## Authors

- [@SebasPCDev](https://github.com/SebasPCDev)

