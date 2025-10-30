<template>

    <footer class="footer">
        <div>
            <img src="../../assets/imagenesHome/logo.png" alt="logo">
        <li>Contacto</li>
        <li>Trabaja con nosotros</li>
        <li>Acuerdo legal</li>
        </div>
        <p>&copy; 2025 Autolavado CBN. Todos los derechos reservados.</p>
    </footer>

</template>

<script>

export default {
    name: 'MiFooter'
}

</script>

<style>

.footer {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgb(43, 43, 43);
    color: white;
    text-align: center;
    padding: 20px 0;
    position: relative;
    bottom: 0;
    height: 200px;
    width: 100%;
}
footer li {
    list-style: square;
    cursor: pointer;
    font-size: 20px;
    font-weight: bolder;
}

footer div {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 100px;
}

footer div img {
    height: 130px;
    margin-right: 100px;
    width: auto;
    border-radius: 50%;
}

@media (max-width: 1024px)
{
    .footer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
        height: auto;
    }
    footer div {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        justify-items: center;
    }
    footer div img {
        margin-right: 0;
        height: 100px;
    }
    footer li {
        font-size: 15px;
    }
}

@media (max-width: 600px)
{

    .footer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        height: auto;
    }
    footer div {
        display: grid;
        grid-template-columns: 1fr;
        gap: 15px;
        justify-items: center;
    }
    footer div img {
        margin-right: 0;
        height: 80px;
    }
    footer li {
        font-size: 12px;
    }

}

</style>