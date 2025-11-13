<template>
    <footer class="footer">
        <div class="footer-contenido">
            <!-- Sección Logo y Descripción -->
            <div class="footer-seccion logo-seccion">
                <img src="../../assets/imagenesHome/logo.png" alt="Logo Autolavado CBN" class="footer-logo">
                <p class="footer-descripcion">
                    Tu mejor opción para el cuidado y limpieza de tu vehículo. 
                    Servicio profesional con productos de alta calidad.
                </p>
            </div>

            <!-- Sección Enlaces Rápidos -->
            <div class="footer-seccion">
                <h3 class="footer-titulo">Enlaces Rápidos</h3>
                <ul class="footer-lista">
                    <li><a href="/inicio">Inicio</a></li>
                    <li><a href="#" @click.prevent="desplazarATienda">Tienda</a></li>
                    <li><a href="/cart">Carrito</a></li>
                    <li><a href="/ordenes">Mis Órdenes</a></li>
                </ul>
            </div>

            <!-- Sección Productos -->
            <div class="footer-seccion">
                <h3 class="footer-titulo">Productos</h3>
                <ul class="footer-lista">
                    <li><a href="/hidrobombas">Hidrobombas</a></li>
                    <li><a href="/pulidoras">Pulidoras</a></li>
                    <li><a href="/pinturas">Pinturas</a></li>
                    <li><a href="/shampoos">Shampoos</a></li>
                </ul>
            </div>

            <!-- Sección Contacto y Legal -->
            <div class="footer-seccion">
                <h3 class="footer-titulo">Información</h3>
                <ul class="footer-lista">
                    <li><a href="#">Contacto</a></li>
                    <li><a href="#">Trabaja con nosotros</a></li>
                    <li><a href="#">Acuerdo legal</a></li>
                    <li><a href="#">Política de privacidad</a></li>
                </ul>
            </div>
        </div>

        <!-- Línea divisoria -->
        <div class="footer-divisor"></div>

        <!-- Copyright -->
        <div class="footer-copyright">
            <p>&copy; 2025 Autolavado CBN. Todos los derechos reservados.</p>
        </div>
    </footer>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'MiFooter',
    setup() {
        const router = useRouter();

        function desplazarATienda() {
            if (router.currentRoute.value.path === '/inicio' || router.currentRoute.value.path === '/') {
                const seccionProductos = document.getElementById('tienda-productos');
                if (seccionProductos) {
                    seccionProductos.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                router.push('/inicio').then(() => {
                    setTimeout(() => {
                        const seccionProductos = document.getElementById('tienda-productos');
                        if (seccionProductos) {
                            seccionProductos.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                });
            }
        }

        return { desplazarATienda };
    }
}
</script>

<style scoped>
.footer {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #ffffff;
    padding: 60px 40px 30px;
    margin-top: 80px;
    position: relative;
    overflow: hidden;
}

.footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #c00a0a 0%, #920909 50%, #c00a0a 100%);
}

.footer-contenido {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 50px;
    margin-bottom: 40px;
}

.footer-seccion {
    display: flex;
    flex-direction: column;
}

.logo-seccion {
    max-width: 300px;
}

.footer-logo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 20px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.footer-logo:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(192, 10, 10, 0.3);
}

.footer-descripcion {
    color: #b0b0b0;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 25px;
}

.footer-titulo {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    padding-bottom: 10px;
}

.footer-titulo::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #c00a0a, #920909);
    border-radius: 2px;
}

.footer-lista {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-lista li {
    margin-bottom: 12px;
}

.footer-lista a {
    color: #b0b0b0;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
}

.footer-lista a::before {
    content: '→';
    position: absolute;
    left: -20px;
    opacity: 0;
    transition: all 0.3s ease;
    color: #c00a0a;
}

.footer-lista a:hover {
    color: #ffffff;
    padding-left: 20px;
    transform: translateX(5px);
}

.footer-lista a:hover::before {
    opacity: 1;
    left: 0;
}

.footer-divisor {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    margin: 30px 0;
}

.footer-copyright {
    text-align: center;
    padding-top: 20px;
}

.footer-copyright p {
    color: #808080;
    font-size: 13px;
    margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .footer-contenido {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
    }

    .logo-seccion {
        max-width: 100%;
        grid-column: 1 / -1;
    }
}

@media (max-width: 768px) {
    .footer {
        padding: 40px 20px 20px;
    }

    .footer-contenido {
        grid-template-columns: 1fr;
        gap: 35px;
    }

    .logo-seccion {
        text-align: center;
        align-items: center;
    }

    .footer-logo {
        width: 100px;
        height: 100px;
    }

    .footer-titulo {
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .footer {
        padding: 30px 15px 15px;
    }

    .footer-logo {
        width: 80px;
        height: 80px;
    }

    .footer-descripcion {
        font-size: 13px;
    }

    .footer-titulo {
        font-size: 15px;
    }

    .footer-lista a {
        font-size: 13px;
    }

    .footer-copyright p {
        font-size: 12px;
    }
}
</style>