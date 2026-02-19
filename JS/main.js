// JS/main.js

$(document).ready(function() {

    // ============================================
    // 1. MENÚ HAMBURGUESA (igual que antes)
    // ============================================
    const $navToggle = $('#navToggle');
    const $mainNav = $('#mainNav');

    $navToggle.on('click', function() {
        $mainNav.toggleClass('show');
        const $icon = $(this).find('i');
        $icon.toggleClass('fa-bars fa-times');
    });

    $mainNav.find('a').on('click', function() {
        if ($(window).width() <= 768) {
            $mainNav.removeClass('show');
            $('#navToggle i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            $mainNav.removeClass('show');
            $('#navToggle i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    // ============================================
    // 2. GENERAR CARDS DE NOVEDADES
    // ============================================
    const novedadesData = [
        {
            id: 1,
            titulo: '¡Arranca el campeonato!',
            fecha: '15 Feb 2026',
            descripcion: 'Todo listo para el puntapié inicial. Los 20 equipos ya están confirmados.',
            contenidoCompleto: 'La ceremonia de apertura se realizará el próximo sábado en el estadio municipal. Contaremos con la presencia de autoridades y exjugadores profesionales. Los partidos comenzarán a las 15:00 hs con un emocionante encuentro entre Los Veteranitos y Deportivo Mayor. ¡No te lo pierdas!',
            icono: 'fa-calendar-alt'
        }/*,
        {
            id: 2,
            titulo: 'Fixture de la fecha 1',
            fecha: '16 Feb 2026',
            descripcion: 'Conocé los horarios y cruces de la primera jornada.',
            contenidoCompleto: 'Fecha 1 completa: Sábado 20/02 - 15:00: Los Veteranitos vs Deportivo Mayor (Cancha 1). 16:30: Atlético Experiencia vs Club Senior (Cancha 2). Domingo 21/02 - 15:00: Los Toros vs Real Veteranía. 16:30: Dep. Argentino vs Estrella del Sur. Todos los partidos serán transmitidos en vivo por nuestra página.',
            icono: 'fa-futbol'
        },
        {
            id: 3,
            titulo: 'Inscripciones cerradas',
            fecha: '10 Feb 2026',
            descripcion: 'Cupo completo. Gracias a todos los equipos.',
            contenidoCompleto: 'Hemos alcanzado el máximo de 20 equipos participantes. Agradecemos a todos los que se inscribieron y a los que quedaron en lista de espera, los tendremos en cuenta para futuras ediciones. La organización trabajará para brindar el mejor campeonato de la historia.',
            icono: 'fa-clipboard-list'
        },
        {
            id: 4,
            titulo: 'Nuevo sponsor oficial',
            fecha: '5 Feb 2026',
            descripcion: 'Importante marca deportiva se suma al campeonato.',
            contenidoCompleto: 'Anunciamos con orgullo que "Deportes Martínez" se convierte en sponsor oficial del campeonato. Gracias a este acuerdo, los equipos finalistas recibirán indumentaria completa y habrá sorteos para los asistentes a la final. Además, se entregará el trofeo "Martínez" al goleador del torneo.',
            icono: 'fa-trophy'
        },
        {
            id: 5,
            titulo: 'Reglamento actualizado',
            fecha: '1 Feb 2026',
            descripcion: 'Revisá las nuevas disposiciones para esta temporada.',
            contenidoCompleto: 'Se ha actualizado el reglamento general. Las modificaciones incluyen: nuevo sistema de tarjetas (acumulación por 3 amarillas), cambios en las sustituciones (máximo 5 por partido) y normativa de fair play financiero. Descargá el reglamento completo en nuestra sección de documentos.',
            icono: 'fa-file-alt'
        }*/
    ];

    const $container = $('#novedadesContainer');
    if ($container.length) {
        $container.empty();
        
        $.each(novedadesData, function(index, novedad) {
            const $card = $('<div>').addClass('novedad-card').attr('data-id', novedad.id);
            
            $card.html(`
                <h3>${novedad.titulo}</h3>
                <div class="fecha"><i class="fas ${novedad.icono}"></i> ${novedad.fecha}</div>
                <p>${novedad.descripcion}</p>
                <a href="#" class="leer-mas" data-id="${novedad.id}">
                    Leer más <i class="fas fa-chevron-right"></i>
                </a>
            `);
            
            $container.append($card);
        });
    }

    // ============================================
    // 3. MODALES (POPUPS)
    // ============================================
    const $contactoModal = $('#contactoModal');
    const $novedadModal = $('#novedadModal');
    const $modalTitulo = $('#modalTitulo');
    const $modalContenido = $('#modalContenido');

    // Abrir modal de contacto
    $(document).on('click', '#contactoLink', function(e) {
        e.preventDefault();
        $contactoModal.fadeIn(300);
    });

    // Abrir modal de novedad (leer más)
    $(document).on('click', '.leer-mas', function(e) {
        e.preventDefault();
        const id = $(this).data('id');
        const novedad = novedadesData.find(n => n.id == id);
        
        if (novedad) {
            $modalTitulo.text(novedad.titulo);
            $modalContenido.html(`
                <div class="novedad-completa">
                    <p><i class="fas ${novedad.icono}"></i> <strong>${novedad.fecha}</strong></p>
                    <p>${novedad.contenidoCompleto}</p>
                    <p style="margin-top:20px; font-style:italic;">¡No te pierdas ninguna novedad del campeonato!</p>
                </div>
            `);
            $novedadModal.fadeIn(300);
        }
    });

    // Cerrar modales (clic en X)
    $('.close-modal').on('click', function() {
        $('.modal').fadeOut(300);
    });

    // Cerrar modal clicando fuera del contenido
    $(window).on('click', function(e) {
        if ($(e.target).hasClass('modal')) {
            $('.modal').fadeOut(300);
        }
    });

    // Escape key para cerrar modales
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.modal').fadeOut(300);
        }
    });

    // ============================================
    // 4. FORMULARIO DE CONTACTO
    // ============================================
    $('#contactoForm').on('submit', function(e) {
        e.preventDefault();
        
        // Simulación de envío exitoso
        const $btn = $(this).find('.btn-enviar');
        const textoOriginal = $btn.text();
        
        $btn.text('Enviando...').prop('disabled', true);
        
        setTimeout(function() {
            alert('¡Mensaje enviado con éxito! Nos contactaremos a la brevedad.');
            $('#contactoForm')[0].reset();
            $contactoModal.fadeOut(300);
            $btn.text(textoOriginal).prop('disabled', false);
        }, 1500);
    });

    // ============================================
    // 5. DESCARGA DE PDFS (simulación)
    // ============================================
    $('.btn-download').on('click', function(e) {
        // Solo para demostración, si no existen los PDFs
        const href = $(this).attr('href');
        if (href === '#') {
            e.preventDefault();
            alert('PDF de demostración. En la versión final, aquí se descargará el archivo real.');
        }
    });

    // ============================================
    // 6. RESALTAR PÁGINA ACTIVA EN MENÚ
    // ============================================
    const currentPage = window.location.pathname.split('/').pop();
    $('.main-nav a').each(function() {
        const linkPage = $(this).attr('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            $(this).addClass('active');
        }
    });

    console.log('Página cargada con todos los módulos activos.');
});