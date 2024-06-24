document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');

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
    });

    function esValida(texto) {
        // Permite letras minúsculas, espacios y los signos de puntuación mencionados, pero no tildes
        return /^[a-z\s?!¿¡]+$/.test(texto) && !/[áéíóú]/.test(texto);
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
});
