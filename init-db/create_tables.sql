CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    numero_telefono VARCHAR(20) NOT NULL,
    numero_identificacion VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    
);


CREATE TABLE IF NOT EXISTS ciudades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL    
);


CREATE TABLE IF NOT EXISTS tarifas (
    id SERIAL PRIMARY KEY,
    id_ciudad_origen INTEGER NOT NULL,
    id_ciudad_destino INTEGER NOT NULL,
    peso_minimo INTEGER NOT NULL,
    peso_maximo INTEGER NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    CONSTRAINT tarifas_ciudad_destino_id_fkey FOREIGN KEY (id_ciudad_destino)
    REFERENCES ciudades (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    CONSTRAINT tarifas_ciudad_origen_id_fkey FOREIGN KEY (id_ciudad_origen)
    REFERENCES ciudades (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    CONSTRAINT chk_peso_rango CHECK (peso_minimo <= peso_maximo),
    CONSTRAINT uk_tarifas_ciudades_peso UNIQUE (id_ciudad_origen, id_ciudad_destino, peso_minimo, peso_maximo)
);


CREATE TABLE IF NOT EXISTS envios (
    id SERIAL PRIMARY KEY,
    guia VARCHAR(50) NOT NULL UNIQUE,
    id_usuario INTEGER NOT NULL,
    id_ciudad_origen INTEGER NOT NULL,
    id_ciudad_destino INTEGER NOT NULL,
    articulo VARCHAR(50) NOT NULL,
    peso  NUMERIC(10, 2) NOT NULL,
    alto INTEGER NOT NULL,
    ancho INTEGER NOT NULL,
    largo INTEGER NOT NULL,
    precio_cotizacion NUMERIC(10, 2) NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT chk_dimensiones CHECK (alto > 0 AND ancho > 0 AND largo > 0),
    CONSTRAINT usuarios_id_fkey FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    CONSTRAINT ciudades_origen_id_fkey FOREIGN KEY (id_ciudad_origen)
    REFERENCES ciudades (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    CONSTRAINT ciudades_destino_id_fkey FOREIGN KEY (id_ciudad_destino)
    REFERENCES ciudades (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS detalles_envios (
    id SERIAL PRIMARY KEY,
    id_envio INTEGER NOT NULL,
    item INTEGER NOT NULL, -- Número de item es cada vez que se inserta un detalle del envío
    estado VARCHAR(15) NOT NULL DEFAULT 'En espera' CHECK (estado IN ('En espera', 'En transito', 'Entregado')),
    descripcion TEXT NOT NULL,
    fecha_detalle TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_detalles_envios_item_por_envio UNIQUE (id_envio, item),
    CONSTRAINT envios_cotizacion_id_fkey FOREIGN KEY (id_envio)
    REFERENCES envios (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


INSERT INTO ciudades (nombre) VALUES ('Bogotá');
INSERT INTO ciudades (nombre) VALUES ('Medellín');
INSERT INTO ciudades (nombre) VALUES ('Cali');
INSERT INTO ciudades (nombre) VALUES ('Barranquilla');
INSERT INTO ciudades (nombre) VALUES ('Cartagena');
INSERT INTO ciudades (nombre) VALUES ('Bucaramanga');
INSERT INTO ciudades (nombre) VALUES ('Pereira');
INSERT INTO ciudades (nombre) VALUES ('Manizales');
INSERT INTO ciudades (nombre) VALUES ('Santa Marta');
INSERT INTO ciudades (nombre) VALUES ('Cúcuta');

TRUNCATE TABLE tarifas RESTART IDENTITY CASCADE;

INSERT INTO tarifas (id_ciudad_origen, id_ciudad_destino, peso_minimo, peso_maximo, precio)
SELECT
    c_origen.id AS id_ciudad_origen,
    c_destino.id AS id_ciudad_destino,
    rangos.peso_minimo,
    rangos.peso_maximo,
    CASE WHEN c_origen.id = c_destino.id 
    THEN 10000 + (rangos.factor_precio * 500) 
    ELSE 20000 + (ABS(c_origen.id - c_destino.id) * 2000) + (rangos.factor_precio * 1500)
    END AS precio
FROM
    ciudades c_origen
CROSS JOIN
    ciudades c_destino
CROSS JOIN
    (VALUES
        (0, 5, 1),    -- Rango 1: peso_min=0, peso_max=5, factor_precio=1
        (6, 10, 2),   -- Rango 2: peso_min=6, peso_max=10, factor_precio=2
        (11, 20, 3),  -- Rango 3: peso_min=11, peso_max=20, factor_precio=3
        (21, 50, 4),  -- Rango 4: peso_min=21, peso_max=50, factor_precio=4
        (51, 100, 5)  -- Rango 5: peso_min=51, peso_max=100, factor_precio=5
    ) AS rangos(peso_minimo, peso_maximo, factor_precio)
ON CONFLICT (id_ciudad_origen, id_ciudad_destino, peso_minimo, peso_maximo) DO NOTHING;