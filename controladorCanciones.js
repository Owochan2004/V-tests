AFRAME.registerComponent('controlador-canciones', {
  schema: {
    id: { type: 'string' },
    position: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
    rotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } },
    songs: { type: 'string', default: '' } // IDs de las canciones separados por comas
  },

  init: function () {
    const data = this.data;
    const el = this.el;

    // Configurar posición y rotación del panel
    el.setAttribute('position', data.position);
    el.setAttribute('rotation', data.rotation);

    // Fondo del panel
    const fondo = document.createElement('a-plane');
    fondo.setAttribute('width', 3);
    fondo.setAttribute('height', 2);
    fondo.setAttribute('color', '#444');
    fondo.setAttribute('position', '0 0 0');
    fondo.setAttribute('material', 'src: #musica_Fondo;');

    el.appendChild(fondo);

    // Título del panel
    const titulo = document.createElement('a-text');
    titulo.setAttribute('value', `Reproductor de musica`);
    titulo.setAttribute('align', 'center');
    titulo.setAttribute('position', '0 0.8 0.1');
    titulo.setAttribute('color', '#FFF');
    titulo.setAttribute('width', 3);
    el.appendChild(titulo);

    // Crear contenedor de botones
    const contenedorBotones = document.createElement('a-entity');
    contenedorBotones.setAttribute('position', '0 0 0.1');

    el.appendChild(contenedorBotones);

    // IDs de las canciones
    const songIds = data.songs.split(',').map(id => id.trim());

    // Crear botones circulares para reproducir canciones
    songIds.forEach((songId, index) => {
      const boton = document.createElement('a-circle');
      boton.setAttribute('radius', 0.4); // Tamaño del botón circular
      boton.setAttribute('material', 'src: #boton_Disco;');

      boton.setAttribute('class', 'raycastable');
      boton.setAttribute('position', `${-1.0 + index} 0.2 0`); // Distribución horizontal

      // Texto del botón
      const botonTexto = document.createElement('a-text');
      botonTexto.setAttribute('value', `${index + 1}`); // Texto breve para mejor visualización
      botonTexto.setAttribute('align', 'center');
      botonTexto.setAttribute('color', '#FFF');
      botonTexto.setAttribute('width', 1.5);
      botonTexto.setAttribute('position', '0 0 0.1'); // Posicionar ligeramente sobre el círculo
      boton.appendChild(botonTexto);

      // Evento de clic
      boton.addEventListener('click', () => {
        const audio = document.querySelector(songId);
        if (audio) {
          // Detener cualquier audio que esté sonando globalmente
          if (window.currentAudio && !window.currentAudio.paused) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
          }

          // Reproducir la nueva canción
          window.currentAudio = audio;
          window.currentAudio.play();
        }
      });

      contenedorBotones.appendChild(boton);
    });

    // Botón para detener la música
    const stopButton = document.createElement('a-plane');
    stopButton.setAttribute('width', 1.2); // Ancho del rectángulo
    stopButton.setAttribute('height', 0.4); // Altura del rectángulo
    stopButton.setAttribute('color', '#b86500');
    stopButton.setAttribute('class', 'raycastable');
    stopButton.setAttribute('position', `0 ${-0.6} 0`); // Posicionar debajo de los botones circulares

    // Texto del botón de detener
    const stopButtonText = document.createElement('a-text');
    stopButtonText.setAttribute('value', 'Detener cancion');
    stopButtonText.setAttribute('align', 'center');
    stopButtonText.setAttribute('color', '#FFF');
    stopButtonText.setAttribute('width', 3);
    stopButtonText.setAttribute('position', '0 0.05 0.1'); // Ajustar ligeramente sobre el plano
    stopButton.appendChild(stopButtonText);

    // Evento de clic para detener la música
    stopButton.addEventListener('click', () => {
      if (window.currentAudio && !window.currentAudio.paused) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0; // Para detener todo
        window.currentAudio = null; // Para detener todo
      }
    });

    contenedorBotones.appendChild(stopButton);
  }
});
