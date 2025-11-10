DROP DATABASE IF EXISTS autolavado;
CREATE DATABASE autolavado;
USE autolavado;

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE perfil (
  idPerfil INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nombrePerfil VARCHAR(45) NOT NULL
);

INSERT INTO perfil VALUES
(1,'ADMINISTRADOR'),
(2,'TRABAJADOR'),
(3,'CLIENTE');

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    usr VARCHAR(45) NOT NULL,
    pass VARCHAR(255) NOT NULL, -- Cambiar a 255 para hash
    gmail VARCHAR(128), -- Añadir campo para gmail
    idPerfil INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso DATETIME,
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (idPerfil) REFERENCES perfil (idPerfil)
);

INSERT INTO usuario (usr, pass, idPerfil) VALUES
('ADMIN', '1234', 1),
('SPEREZ', '5678', 2),
('YTSUNODA', '9012', 2),
('YAIR', '1234', 3),
('CHRIS', '5678', 3);

INSERT INTO categorias VALUES(1,"HIDROBOMBAS"),(2,"PINTURAS"),(3,"PULIDORAS"),(4,"SAMPOOS");

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion VARCHAR(300),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    id_categoria INT,
    CONSTRAINT fk_productos_categoria FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
);


CREATE TABLE carritos (
    id_carrito INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carritos_usuarios FOREIGN KEY (idUsuario)
	REFERENCES usuario(idUsuario)
);

CREATE TABLE carrito_detalle (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_carrito INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_detalle_carrito FOREIGN KEY (id_carrito)
	REFERENCES carritos(id_carrito),
    CONSTRAINT fk_detalle_producto FOREIGN KEY (id_producto)
	REFERENCES productos(id_producto)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    fecha_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente', 'enviado', 'entregado') DEFAULT 'pendiente',
    total DECIMAL(10,2),
    CONSTRAINT fk_pedidos_usuarios FOREIGN KEY (idUsuario)
	REFERENCES usuario(idUsuario)
);


DELIMITER //

CREATE PROCEDURE registrarUsuario(
    IN p_usuario VARCHAR(45),
    IN p_password VARCHAR(255),
    IN p_gmail VARCHAR(128),
    IN p_idPerfil INT
)
BEGIN
    DECLARE usuario_existe INT;

    -- Verificar si el usuario ya existe
    SELECT COUNT(*) INTO usuario_existe 
    FROM usuario 
    WHERE usr = p_usuario OR gmail = p_gmail;

    IF usuario_existe > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El usuario o correo ya existe';
    ELSE
        -- Insertar nuevo usuario
        INSERT INTO usuario (usr, pass, gmail, idPerfil, fecha_creacion)
        VALUES (
            p_usuario,
            p_password,  -- Idealmente la contraseña debería estar hasheada
            p_gmail,
            p_idPerfil,
            CURRENT_TIMESTAMP
        );
        
        SELECT LAST_INSERT_ID() as idUsuario, 'Usuario registrado exitosamente' as mensaje;
    END IF;
END;
//
-- LOGIN
CREATE PROCEDURE login(p_usuario VARCHAR(45), p_pass VARCHAR(45))
BEGIN
    DECLARE v_idUsuario INT;
    DECLARE v_idPerfil INT;
		
    SELECT idUsuario, idPerfil INTO v_idUsuario, v_idPerfil
    FROM usuario 
    WHERE usr = p_usuario AND pass = p_pass
    LIMIT 1;
		
    IF v_idUsuario IS NOT NULL THEN
        SELECT v_idUsuario AS idUsuario, v_idPerfil AS idPerfil;
    ELSE
        SELECT 0 AS idUsuario, 0 AS idPerfil;
    END IF;
END;
//


CREATE PROCEDURE registrarProductos(
    IN p_nombre VARCHAR(100),
    IN p_descripcion VARCHAR(200),
    IN p_precio DECIMAL(10,2),
    IN p_stock INT,
    IN p_imagen VARCHAR(255),
    IN p_rating DECIMAL(2,1),
    IN p_id_categoria INT
)
BEGIN
    INSERT INTO productos(nombre, descripcion, precio, stock, imagen, rating, id_categoria)
    VALUES (p_nombre, p_descripcion, p_precio, p_stock, p_imagen, p_rating, p_id_categoria);
END;
//

-- ACTUALIZAR PRODUCTO
CREATE PROCEDURE actualizarProductos(
    IN p_id_producto INT,
    IN p_editar VARCHAR(100),
    IN p_cambiar VARCHAR(300)
)
BEGIN
    IF p_editar = 'NOMBRE' THEN
        UPDATE productos SET nombre = p_cambiar WHERE id_producto = p_id_producto;
    ELSEIF p_editar = 'STOCK' THEN
        UPDATE productos SET stock = CAST(p_cambiar AS UNSIGNED) WHERE id_producto = p_id_producto;
    ELSEIF p_editar = 'PRECIO' THEN
        UPDATE productos SET precio = CAST(p_cambiar AS DECIMAL(10,2)) WHERE id_producto = p_id_producto;
    ELSEIF p_editar = 'DESCRIPCION' THEN
        UPDATE productos SET descripcion = p_cambiar WHERE id_producto = p_id_producto;
    ELSEIF p_editar = 'IMAGEN' THEN
        UPDATE productos SET imagen = p_cambiar WHERE id_producto = p_id_producto;
    ELSEIF p_editar = 'RATING' THEN
        UPDATE productos SET rating = CAST(p_cambiar AS DECIMAL(2,1)) WHERE id_producto = p_id_producto;
    ELSEIF p_editar = 'CATEGORIA' THEN
        UPDATE productos SET id_categoria = CAST(p_cambiar AS UNSIGNED) WHERE id_producto = p_id_producto;
    END IF;
END;
//


CREATE PROCEDURE eliminarProducto(IN p_id_producto INT)
BEGIN
    DELETE FROM productos WHERE id_producto = p_id_producto;
END;
//


CREATE PROCEDURE llenarCategoria()
BEGIN
    SELECT * FROM categorias;
END;
//

-- MOSTRAR PRODUCTOS
CREATE PROCEDURE mostrarProductos()
BEGIN
    SELECT 
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.rating,
        c.nombre AS categoria
    FROM productos p
    LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
    ORDER BY p.nombre;
END;
//
CREATE PROCEDURE agregarAlCarrito(
    IN p_idUsuario INT,
    IN p_id_producto INT,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_id_carrito INT;
    DECLARE v_stock INT;
    DECLARE v_exist INT;

    -- Buscar si ya existe un carrito del usuario
    SELECT id_carrito INTO v_id_carrito
    FROM carritos
    WHERE idUsuario = p_idUsuario
    ORDER BY fecha_creacion DESC
    LIMIT 1;

    -- Si no existe, crear uno nuevo
    IF v_id_carrito IS NULL THEN
        INSERT INTO carritos (idUsuario) VALUES (p_idUsuario);
        SET v_id_carrito = LAST_INSERT_ID();
    END IF;

    -- Verificar el stock
    SELECT stock INTO v_stock FROM productos WHERE id_producto = p_id_producto;
    IF v_stock < p_cantidad THEN
        SELECT 'Stock insuficiente para agregar este producto al carrito.' AS mensaje;
	ELSE 
     -- Verificar si ya está en el carrito
		 SELECT COUNT(*) INTO v_exist
		FROM carrito_detalle
		WHERE id_carrito = v_id_carrito AND id_producto = p_id_producto;

		IF v_exist > 0 THEN
			UPDATE carrito_detalle
			SET cantidad = cantidad + p_cantidad
			WHERE id_carrito = v_id_carrito AND id_producto = p_id_producto;
		ELSE
			INSERT INTO carrito_detalle (id_carrito, id_producto, cantidad)
			VALUES (v_id_carrito, p_id_producto, p_cantidad);
		END IF;

		-- Reducir el stock del producto
		UPDATE productos SET stock = stock - p_cantidad WHERE id_producto = p_id_producto;
    END IF;
END;
//

CREATE PROCEDURE eliminarProductoCarrito(
    IN p_idUsuario INT,
    IN p_id_producto INT
)
BEGIN
    DECLARE v_id_carrito INT;

    SELECT id_carrito INTO v_id_carrito
    FROM carritos
    WHERE idUsuario = p_idUsuario
    ORDER BY fecha_creacion DESC
    LIMIT 1;

        IF EXISTS (
            SELECT 1 FROM carrito_detalle 
            WHERE id_carrito = v_id_carrito AND id_producto = p_id_producto
        ) THEN
            DELETE FROM carrito_detalle 
            WHERE id_carrito = v_id_carrito AND id_producto = p_id_producto;

            UPDATE productos SET stock = stock + 1 WHERE id_producto = p_id_producto;
        
        END IF;
END;
//

CREATE PROCEDURE verCarrito(
    IN p_idUsuario INT
)
BEGIN
    DECLARE v_id_carrito INT;

    SELECT id_carrito INTO v_id_carrito
    FROM carritos 
    WHERE idUsuario = p_idUsuario
    ORDER BY fecha_creacion DESC
    LIMIT 1;

    IF v_id_carrito IS NULL OR 
       (SELECT COUNT(*) FROM carrito_detalle WHERE id_carrito = v_id_carrito) = 0 THEN
        INSERT INTO carritos (idUsuario) VALUES (p_idUsuario);
        SET v_id_carrito = LAST_INSERT_ID();
    END IF;

    SELECT  
        cd.id_detalle,
        p.nombre AS producto,
        cd.cantidad,
        p.precio,
        (p.precio * cd.cantidad) AS subtotal
    FROM carrito_detalle cd
    JOIN productos p ON cd.id_producto = p.id_producto
    WHERE cd.id_carrito = v_id_carrito;
END;
//

CREATE PROCEDURE finalizarCarrito(
    IN p_idUsuario INT
)
BEGIN
    DECLARE v_id_carrito INT;
    DECLARE v_total DECIMAL(10,2);

    SELECT id_carrito INTO v_id_carrito
    FROM carritos
    WHERE idUsuario = p_idUsuario
    ORDER BY fecha_creacion DESC
    LIMIT 1;

    IF v_id_carrito IS NOT NULL THEN
        SELECT IFNULL(SUM(cd.cantidad * p.precio), 0)
		INTO v_total
		FROM carrito_detalle cd
		JOIN productos p ON p.id_producto = cd.id_producto
		WHERE cd.id_carrito = v_id_carrito;

		INSERT INTO pedidos (idUsuario, total)
		VALUES (p_idUsuario, v_total);

		DELETE FROM carrito_detalle WHERE id_carrito = v_id_carrito;
    END IF;

    
END;
//

CREATE PROCEDURE verPedidos()
BEGIN
    SELECT 
        p.id_pedido,
        u.usr AS usuario,
        p.fecha_pedido,
        p.estado,
        p.total
    FROM pedidos p
    JOIN usuario u ON p.idUsuario = u.idUsuario
    ORDER BY p.fecha_pedido DESC;
END;
//

CREATE PROCEDURE actualizarEstadoPedido(
    IN p_id_pedido INT,
    IN p_nuevo_estado VARCHAR(20)
)
BEGIN
    IF p_nuevo_estado  IN ('pendiente','enviado','entregado') THEN
        UPDATE pedidos
		SET estado = p_nuevo_estado
		WHERE id_pedido = p_id_pedido;
    END IF;

    
END;
//


CREATE TRIGGER check_stock 
BEFORE UPDATE ON productos
FOR EACH ROW
BEGIN
    IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El stock no puede ser negativo';
    END IF;
END;
//
DELIMITER ;




