$(document).ready(function () {
    // a) Número de enlaces a periódicos
    const numEnlaces = $('#periodicos a').length;
    $('#contadorEnlaces').text(numEnlaces);

    // b) Mostrar y ocultar noticias individuales
    $('#noticias').on('click', '.mostrar', function () {
        $(this).closest('.noticia').find('a').show();
    });

    $('#noticias').on('click', '.ocultar', function () {
        $(this).closest('.noticia').find('a').hide();
    });

    // c) Añadir nueva noticia
    $('#añadirNoticia').click(function () {
        const nuevaNoticia = $('#nuevaNoticia').val().trim();
        if (nuevaNoticia) {
            if (nuevaNoticia.length <= 150) {
                $('#noticias').append(`
                    <div class="noticia">
                        <a href="#">${nuevaNoticia}</a>
                        <div class="botones-noticia">
                            <button class="mostrar">Mostrar</button>
                            <button class="ocultar">Ocultar</button>
                        </div>
                    </div>
                `);
                $('#nuevaNoticia').val('');
            } else {
                alert("La noticia no puede superar los 150 caracteres.");
            }
        } else {
            alert("Por favor, escribe una noticia.");
        }
    });
});