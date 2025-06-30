CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    numero_telefono VARCHAR(20) NOT NULL,
    numero_identificacion VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    
);

CREATE TABLE IF NOT EXISTS departamentos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE  
);



CREATE TABLE IF NOT EXISTS ciudades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    departamento_id INTEGER NOT NULL,
    CONSTRAINT ciudades_departamento_id_fkey FOREIGN KEY (departamento_id) 
    REFERENCES departamentos (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS tarifas (
    id SERIAL PRIMARY KEY,
    id_ciudad_origen INTEGER NOT NULL,
    id_ciudad_destino INTEGER NOT NULL,
    peso_minimo INTEGER NOT NULL,
    peso_maximo INTEGER NOT NULL,
    precio INTEGER NOT NULL,
    CONSTRAINT tarifas_ciudad_destino_id_fkey FOREIGN KEY (id_ciudad_destino)
    REFERENCES ciudades (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    CONSTRAINT tarifas_ciudad_origen_id_fkey FOREIGN KEY (id_ciudad_origen)
    REFERENCES ciudades (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
    CONSTRAINT chk_peso_rango CHECK (peso_minimo <= peso_maximo)
);



INSERT INTO departamentos (nombre) VALUES
    ('Valle del Cauca'),
    ('Cundinamarca'),
    ('Antioquia'),
    ('Santander'),
    ('Atlantico');

-- Ciudades para Valle del Cauca
INSERT INTO ciudades (nombre, departamento_id) VALUES
    ('Cali', (SELECT id FROM departamentos WHERE nombre = 'Valle del Cauca')),
    ('Yumbo', (SELECT id FROM departamentos WHERE nombre = 'Valle del Cauca'))
ON CONFLICT DO NOTHING;

-- Ciudades para Cundinamarca
INSERT INTO ciudades (nombre, departamento_id) VALUES
    ('Bogotá', (SELECT id FROM departamentos WHERE nombre = 'Cundinamarca')),
    ('Soacha', (SELECT id FROM departamentos WHERE nombre = 'Cundinamarca'))
ON CONFLICT DO NOTHING;

-- Ciudades para Antioquia
INSERT INTO ciudades (nombre, departamento_id) VALUES
    ('Medellín', (SELECT id FROM departamentos WHERE nombre = 'Antioquia')),
    ('Envigado', (SELECT id FROM departamentos WHERE nombre = 'Antioquia'))
ON CONFLICT DO NOTHING;

-- Ciudades para Santander
INSERT INTO ciudades (nombre, departamento_id) VALUES
    ('Bucaramanga', (SELECT id FROM departamentos WHERE nombre = 'Santander')),
    ('Floridablanca', (SELECT id FROM departamentos WHERE nombre = 'Santander'))
ON CONFLICT DO NOTHING;

-- Ciudades para Atlántico
INSERT INTO ciudades (nombre, departamento_id) VALUES
    ('Barranquilla', (SELECT id FROM departamentos WHERE nombre = 'Atlantico')),
    ('Soledad', (SELECT id FROM departamentos WHERE nombre = 'Atlantico'))
ON CONFLICT DO NOTHING;


TRUNCATE TABLE tarifas RESTART IDENTITY CASCADE;

INSERT INTO tarifas (id_ciudad_origen, id_ciudad_destino, peso_minimo, peso_maximo, precio)
SELECT
    c_origen.id AS id_ciudad_origen,
    c_destino.id AS id_ciudad_destino,
    0 AS peso_minimo,
    5 AS peso_maximo,
    CASE
        WHEN c_origen.id = c_destino.id THEN 10000 -- Precio para tarifas locales
        ELSE 20000 + (ABS(c_origen.id - c_destino.id) * 1000) -- Precio variable para tarifas inter-ciudades
    END AS precio
FROM
    ciudades c_origen
CROSS JOIN
    ciudades c_destino
ON CONFLICT DO NOTHING;