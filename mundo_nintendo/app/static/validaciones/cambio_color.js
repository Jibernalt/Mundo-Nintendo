document.addEventListener('DOMContentLoaded', function () {
    const modoOscuroSwitch = document.getElementById('modoOscuroSwitch');
    const body = document.body;
    const luna = document.querySelector('.luna');
    const sol = document.querySelector('.sol');

    const modoActual = localStorage.getItem('modo');
    if (modoActual === 'oscuro') {
        activarModoOscuro();
    }

    modoOscuroSwitch.addEventListener('change', function () {
        if (modoOscuroSwitch.checked) {
            activarModoOscuro();
        } else {
            desactivarModoOscuro();
        }
    });

    function activarModoOscuro() {
        body.classList.add('modo-oscuro');
        localStorage.setItem('modo', 'oscuro');
        actualizarIconosModo();
    }

    function desactivarModoOscuro() {
        body.classList.remove('modo-oscuro');
        localStorage.setItem('modo', 'claro');
        actualizarIconosModo();
    }

    function actualizarIconosModo() {
        if (modoOscuroSwitch.checked) {
            luna.style.display = 'inline';
            sol.style.display = 'none';
        } else {
            luna.style.display = 'none';
            sol.style.display = 'inline';
        }
    }
});