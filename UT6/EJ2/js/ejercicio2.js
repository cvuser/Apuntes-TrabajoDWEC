
$(document).ready(function() {
    // a) Número de enlaces a periódicos
    const numEnlaces = $('#periodicos a').length;
    $('#numEnlaces').text(`Número de enlaces a periódicos: ${numEnlaces}`);

    // b) Mostrar y ocultar noticias
    $('#mostrar').click(function() {
        $('#noticias').show();
    });

    $('#ocultar').click(function() {
        $('#noticias').hide();
    });

    // c) Añadir nueva noticia
    $('#añadirNoticia').click(function() {
        const nuevaNoticia = $('#nuevaNoticia').val();
        if (nuevaNoticia) {
            $('#noticias').append(`<div class="noticia">${nuevaNoticia}</div>`);
            $('#nuevaNoticia').val('');
        }
    });
});