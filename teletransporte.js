AFRAME.registerComponent('mapa-interactivo', {
  schema: {
    idMapa: { type: 'string', default: 'mapa' },
    position: { type: 'vec3', default: { x: 0, y: 3, z: 0 } },
    rotation: { type: 'vec3', default: { x: 0, y: 0, z: 0 } }
  },
  init: function () {
    const el = this.el;
    const data = this.data;

    // Configurar posición y rotación del mapa
    el.setAttribute('position', data.position);
    el.setAttribute('rotation', data.rotation);

    // Crear el fondo del mapa
    const fondo = document.createElement('a-plane');
    fondo.setAttribute('color', '#333333');
    fondo.setAttribute('height', '2');
    fondo.setAttribute('width', '3');
    fondo.setAttribute('material', 'src: #textura_Mapa;');
    fondo.setAttribute('position', '0 0 -0.01');
    el.appendChild(fondo);

    // Crear texto del título
    const titulo = document.createElement('a-text');
    titulo.setAttribute('value', 'Zonas de teletransporte');
    titulo.setAttribute('color', '#FFFFFF');
    titulo.setAttribute('width', 3);
    titulo.setAttribute('position', '0 0.75 0');
    titulo.setAttribute('align', 'center');
    el.appendChild(titulo);

    // Crear los botones
    const botones = [
      { id: `${data.idMapa}_Convento`, material: '#santoDomingoPoster', color: '#b86500', pos: '0 0.45 0', destino: { x: 0, y: 3, z: -47 } },
      { id: `${data.idMapa}_Centro`, material: '#brujula', pos: '0 0 0', destino: { x: 0, y: 3, z: 0 }, circular: true },
      { id: `${data.idMapa}_Puente`, material: '#puentePiedraPoster', color: '#b86500', pos: '0.75 0 0', destino: { x: 47, y: 3, z: 0 } },
      { id: `${data.idMapa}_Huaca`, material: '#huallamarcaPoster', color: '#b86500', pos: '0 -0.45 0', destino: { x: -1, y: 3, z: 47 } },
      { id: `${data.idMapa}_Francis`, material: '#franciscoPoster', color: '#b86500', pos: '-0.75 0 0', destino: { x: -47, y: 3, z: 0 } }
    ];

    botones.forEach(boton => {
      const botonEl = document.createElement('a-entity');
      botonEl.setAttribute('id', boton.id);
      botonEl.setAttribute('position', boton.pos);

      // Crear un círculo para los botones que sean circulares
      if (boton.circular) {
        const circulo = document.createElement('a-circle');
        circulo.setAttribute('id', boton.id);
        circulo.setAttribute('material', `src: ${boton.material}; color: ${boton.color}`);
        circulo.setAttribute('radius', '0.20'); // Tamaño del círculo
        circulo.setAttribute('class', 'raycastable');

        // Agregar evento de teletransporte
        circulo.addEventListener('click', () => {
          const camara = document.querySelector('#camara');
          camara.setAttribute('position', boton.destino);
          window.currentAudio.pause();
          window.currentAudio.currentTime = 0; // Para detener todo
          window.currentAudio = null; // Para detener todo
        });

        botonEl.appendChild(circulo);
      } else {
        // Crear un plano para los botones normales
        const plano = document.createElement('a-plane');
        plano.setAttribute('id', boton.id);
        plano.setAttribute('material', `src: ${boton.material}; color: ${boton.color}`);
        plano.setAttribute('height', '0.4');
        plano.setAttribute('width', '0.7');
        plano.setAttribute('class', 'raycastable');

        // Agregar evento de teletransporte
        plano.addEventListener('click', () => {
          const camara = document.querySelector('#camara');
          camara.setAttribute('position', boton.destino);
          window.currentAudio.pause();
          window.currentAudio.currentTime = 0; // Para detener todo
          window.currentAudio = null; // Para detener todo
        });

        botonEl.appendChild(plano);
      }

      el.appendChild(botonEl);
    });
  }
});
