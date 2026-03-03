# GapsiECommerce

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 21.2.0.

## Estructura del proyecto (Atomic Design + buenas prácticas)

El código sigue un enfoque por capas (`core`/`components`/`pages`/`shared`) y una organización de UI orientada a Atomic Design dentro de `components`.

```
src/
  app/
    core/
      graphql/
      services/
      utils/
    shared/
      models/
      mocks/
    components/
      atoms/
      molecules/
      organisms/
      templates/
    pages/
      welcome/
      products/
      cart/
    app.ts
    app.routes.ts
    app.config.ts
```

- **core/**
  - Singletons y configuración a nivel app (por ejemplo: clientes API, interceptores, servicios globales).
- **shared/**
  - Tipos y utilidades transversales reutilizadas por varias pantallas/funcionalidades (models, mocks, utilidades).
- **components/**
  - Componentes reutilizables de presentación siguiendo Atomic Design (atoms/molecules/organisms/templates).
- **pages/**
  - Páginas/flujo principal de la aplicación (welcome/products/cart).

## Servidor de desarrollo

Este proyecto genera `src/environments/environment.generated.ts` a partir de `.env`.

Para iniciar el servidor de desarrollo local (y generar el env), ejecuta:

```bash
npm start
```

Si ejecutas `ng serve` directamente, primero debes generar el archivo de env:

```bash
node scripts/generate-env.mjs
ng serve
```

Cuando el servidor esté corriendo, abre el navegador y entra a `http://localhost:4200/`. La aplicación se recargará automáticamente cuando modifiques cualquier archivo del código fuente.

## Generación de código (scaffolding)

Angular CLI incluye herramientas potentes para generar código. Para crear un nuevo componente, ejecuta:

```bash
ng generate component component-name
```

Para ver la lista completa de esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta:

```bash
ng generate --help
```

## Build

Para compilar el proyecto ejecuta:

```bash
npm run build
```

Esto compilará tu proyecto y guardará los artefactos en el directorio `dist/`. Por defecto, el build de producción optimiza la aplicación para rendimiento y velocidad.

## Ejecutar pruebas unitarias

Para ejecutar las pruebas unitarias con [Vitest](https://vitest.dev/), usa el siguiente comando:

```bash
npm test
```

## Ejecutar pruebas end-to-end

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no incluye un framework de e2e por defecto. Puedes elegir el que mejor se adapte a tu necesidad.

## Recursos adicionales

Para más información sobre Angular CLI, incluyendo referencias detalladas de comandos, visita la página de [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
