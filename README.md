# Consulta Turismo — Emily & Janeth

Script SQL para PostgreSQL que restaura la base de datos `accommodations_tourism` (sistema de reservas de alojamientos turísticos) y contiene un conjunto de 20 consultas de práctica (DML, JOINs, funciones de agregación, subconsultas).

## Requisitos

- PostgreSQL 14 o superior (dump generado desde PG 18.3, formato custom v1.16)
- Acceso a `psql` con permisos para crear bases de datos

## Cómo restaurar la base de datos

```bash
psql -U postgres -c "CREATE DATABASE accommodations_tourism \
  WITH TEMPLATE=template0 ENCODING='UTF8' \
  LOCALE_PROVIDER=libc LOCALE='en_US.UTF-8';"

psql -U postgres -d accommodations_tourism -f Consulta_Turismo_Emily_Janeth_sql.SQL
```

## Estructura del script

1. **Configuración de sesión** — timeouts, encoding, `search_path`.
2. **Funciones** — `set_updated_at()` (trigger para actualizar `updated_at`).
3. **Secuencias** — una por cada tabla con clave autoincremental.
4. **Tablas (13)**:
   - `owners` — propietarios de alojamientos
   - `locations` — ubicaciones geográficas
   - `accommodation_types` — tipos de alojamiento (Hotel, Hostel, Villa, etc.)
   - `accommodations` — alojamientos publicados
   - `rooms` — habitaciones por alojamiento
   - `amenities` / `accommodation_amenities` — comodidades (tabla puente N:M)
   - `guests` — huéspedes
   - `bookings` — reservas
   - `booking_guests` — huéspedes asociados a una reserva
   - `booking_statuses` — catálogo de estados de reserva
   - `payments` — pagos de reservas
   - `reviews` — reseñas de alojamientos
   - `staff_users` — usuarios del staff/administración
5. **Defaults de secuencia y `OWNED BY`** — vincula cada secuencia a su columna.
6. **Datos (`INSERT`)** — carga inicial de catálogos (`accommodation_types`, `amenities`, etc.) y registros de ejemplo.
7. **Restricciones (`PRIMARY KEY`, `UNIQUE`, `FOREIGN KEY`)** — integridad referencial entre todas las tablas (ej. `bookings → guests`, `bookings → accommodations`, `payments → bookings`).
8. **Consultas de práctica (líneas finales, autoría Emily/Janeth)** — 20 ejercicios:

| # | Descripción | Tipo |
|---|---|---|
| 1 | Insertar propietario | INSERT |
| 2 | Insertar alojamiento | INSERT |
| 3 | Insertar huésped/reserva | INSERT |
| 4 | Insertar pago (reserva) | INSERT |
| 5 | Alojamientos activos | SELECT + WHERE + ORDER BY |
| 6 | Huéspedes por país | SELECT + WHERE |
| 7 | Reservas por rango de fechas | SELECT + BETWEEN |
| 8 | Actualizar precio | UPDATE |
| 9 | Actualizar estado de reserva | UPDATE |
| 10 | Eliminar reseña | DELETE |
| 11 | Reservas + huésped | INNER JOIN |
| 12 | Alojamiento completo | INNER JOIN |
| 13 | Pagos + reservas | INNER JOIN (doble) |
| 14 | Alojamientos sin reseñas | LEFT JOIN + IS NULL |
| 15 | Alojamientos sin reservas | LEFT JOIN + IS NULL |
| 16 | Total de ingresos | SUM |
| 17 | Promedio de rating | AVG + ROUND |
| 18 | Top 5 alojamientos por reservas | COUNT + LIMIT |
| 19 | Alojamientos con más de 3 reservas | GROUP BY + HAVING |
| 20 | Alojamiento más caro | Subconsulta |

