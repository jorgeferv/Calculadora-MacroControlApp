# MACRO -- ARCHIVO MAESTRO DE DESARROLLO

## 1. Propósito

Este archivo centraliza la lógica, arquitectura y decisiones técnicas
del proyecto Macro. Debe actualizarse cada vez que haya cambios
estructurales importantes.

Sirve como memoria técnica permanente para evitar depender del historial
de chats.

------------------------------------------------------------------------

## 2. Arquitectura General (Completar tras análisis actual)

### Estructura de Archivos Actual

-   index.html:
-   styles.css:
-   app.js:
-   ui.js:
-   storage.js:
-   foods.json:

------------------------------------------------------------------------

## 3. Flujo de Funcionamiento

1.  Inicialización de la app
2.  Carga de localStorage
3.  Render inicial UI
4.  Sistema de cálculo de macros
5.  Sistema Macros OK
6.  Persistencia de datos
7.  Exportación / Importación JSON

------------------------------------------------------------------------

## 4. Sistema de Etapas

-   Déficit
-   Mantenimiento
-   Superávit

Restricciones: - Cambio de etapa bloqueado mínimo 30 días - Intensidad
modificable diariamente

Intensidades déficit: - Bajo (-250) - Medio (-350) - Agresivo (-430)

Botón Pánico: - -400 kcal hombres - -300 kcal mujeres

------------------------------------------------------------------------

## 5. Sistema Macros OK

Objetivo: Cuadrar automáticamente macros pendientes con alimentos
disponibles.

Estado actual del algoritmo: (Pendiente de documentar tras análisis del
último código)

------------------------------------------------------------------------

## 6. Persistencia (localStorage)

Claves utilizadas: (Pendiente de completar)

Formato de datos: (Pendiente de completar)

------------------------------------------------------------------------

## 7. Problemas Técnicos Detectados Históricamente

-   Assignment to constant variable
-   Render completo del DOM innecesario
-   Falta de debounce en búsquedas
-   JSON grande con búsqueda lineal
-   Problemas PWA en iOS

------------------------------------------------------------------------

## 8. Próximas Mejoras Planificadas

-   Historial déficit acumulado 7 / 15 / 30 días
-   Chip visual de adherencia
-   Optimización búsqueda alimentos
-   Separación completa de lógica y UI
-   Revisión rendimiento en móvil

------------------------------------------------------------------------

## 9. Registro de Cambios (Actualizar Manualmente)

### Versión 1.0

-   Documento maestro creado
