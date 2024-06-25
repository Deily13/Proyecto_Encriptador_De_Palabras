document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const resultadoDiv = document.getElementById('resultado');
    const textoResultado = document.getElementById('textoResultado');
    const copiarBtn = document.getElementById('copiarBtn');
    const imagenVacio = document.querySelector('.imagen_vacio');
    const mensajeVacio = document.querySelector('.posicionador_de_texto strong');
    const parrafoVacio = document.querySelector('.posicionador_de_texto p');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se recargue la página

        let palabra = document.getElementById('palabra').value.trim();
        let action = event.submitter.getAttribute('data-action');

        if (!esValida(palabra)) {
            console.log("El texto debe estar escrito con letras minúsculas, espacios y signos de puntuación permitidos, sin tildes.");
            return;
        }

        let resultado;
        if (action === 'encriptar') {
            resultado = encriptar(palabra);
            console.log("Texto encriptado:", resultado);
        } else if (action === 'desencriptar') {
            resultado = desencriptar(palabra);
            console.log("Texto desencriptado:", resultado);
        }

        if (resultado) {
            mostrarResultado(resultado);
        } else {
            ocultarResultado();
        }

        // Limpia el contenido del textarea después de procesar la entrada
        document.getElementById('palabra').value = '';
    });

    copiarBtn.addEventListener('click', function() {
        copiarAlPortapapeles(textoResultado.textContent);
    });

    function esValida(texto) {
        // Permite letras minúsculas, espacios y los signos de puntuación mencionados, pero no tildes
        return /^[a-z\s?!¿¡,.]+$/.test(texto) && !/[áéíóú]/.test(texto);
    }

    function encriptar(texto) {
        let encriptada = texto.replace(/e/g, 'enter')
                              .replace(/i/g, 'imes')
                              .replace(/a/g, 'ai')
                              .replace(/o/g, 'ober')
                              .replace(/u/g, 'ufat');
        return encriptada;
    }

    function desencriptar(textoEncriptado) {
        let desencriptada = textoEncriptado.replace(/enter/g, 'e')
                                           .replace(/imes/g, 'i')
                                           .replace(/ai/g, 'a')
                                           .replace(/ober/g, 'o')
                                           .replace(/ufat/g, 'u');
        return desencriptada;
    }

    function mostrarResultado(texto) {
        textoResultado.textContent = texto;
        resultadoDiv.style.display = 'block';
        copiarBtn.style.display = 'block';
        imagenVacio.style.display = 'none';
        mensajeVacio.style.display = 'none';
        parrafoVacio.style.display = 'none';
    }

    function ocultarResultado() {
        textoResultado.textContent = '';
        resultadoDiv.style.display = 'none';
        copiarBtn.style.display = 'none';
        imagenVacio.style.display = 'block';
        mensajeVacio.style.display = 'block';
        parrafoVacio.style.display = 'block';
    }

    function copiarAlPortapapeles(texto) {
        navigator.clipboard.writeText(texto).then(function() {
            console.log('Texto copiado al portapapeles');
        }, function(err) {
            console.error('No se pudo copiar el texto: ', err);
        });
    }
});
