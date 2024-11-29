/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = (this.fadeBackgroundEl = document.querySelector('#fadeBackground'));

    this.placeTitleEl = document.querySelector('#infoTitle'); // Título del lugar
    this.placeDescriptionEl = document.querySelector('#infoDescription'); // Descripción del lugar

    // Información de los lugares históricos en dos idiomas: Español e Inglés
    this.placeInfo = {
      huallamarcaButton: {
        title: {
          es: 'Huaca Huallamarca',
          en: 'Huaca Huallamarca',
        },
        description: {
          es: 'La Huaca Huallamarca, conocida antiguamente como Pan de Azúcar, es un importante sitio arqueológico ubicado en San Isidro, Lima, Peru. Esta pirámide escalonada de 19 metros de altura fue utilizada como centro ceremonial, administrativo y cementerio a lo largo de su historia. Restaurada en el siglo XX, es un testimonio vivo del pasado prehispánico integrado al entorno urbano moderno.',
          en: 'Huaca Huallamarca, formerly known as Sugar Loaf, is an important archaeological site located in San Isidro, Lima, Peru. This 19-meter-high stepped pyramid was used as a ceremonial center, administrative center, and cemetery throughout its history. Restored in the 20th century, it is a living testimony of the pre-Hispanic past integrated into the modern urban environment.',
        },
        imgEl: document.querySelector('#huallamarcaInfoImage'),
      },
      santoDomingoButton: {
        title: {
          es: 'Convento de Santo Domingo',
          en: 'Convent of Santo Domingo',
        },
        description: {
          es: 'El Convento de Santo Domingo es una de las joyas arquitectonicas e historicas de Lima. Construido en el siglo XVI, es famoso por su estilo barroco y su importancia religiosa. Alberga los restos de Santa Rosa de Lima, San Martin de Porres y San Juan Macias, los tres santos peruanos. Su claustro principal esta decorado con azulejos sevillanos del siglo XVII y pinturas que narran la vida de Santo Domingo de Guzman.',
          en: "The Convent of Santo Domingo is one of Lima's architectural and historical gems. Built in the 16th century, it is famous for its baroque style and religious significance. It houses the remains of Saint Rose of Lima, Saint Martin de Porres and Saint Juan Macias, the three Peruvian saints. Its main cloister is decorated with 17th-century Sevillian tiles and paintings that narrate the life of Saint Dominic de Guzman.",
        },
        imgEl: document.querySelector('#santoDomingoInfoImage'),
      },
      puentePiedraButton: {
        title: {
          es: 'Puente Piedra',
          en: 'Puente Piedra',
        },
        description: {
          es: 'Puente Piedra, situado al norte de Lima, tiene una rica historia que se remonta al periodo colonial. Su nombre proviene de un antiguo puente construido en piedra que cruzaba el rio Chillón, facilitando el comercio y la conexion entre Lima y el interior del pais. Hoy en dia, el distrito que lleva su nombre es un importante punto de transito y desarrollo urbano en la capital peruana.',
          en: 'Puente Piedra, located in the north of Lima, has a rich history dating back to the colonial period. Its name comes from an ancient stone bridge that crossed the Chillón River, facilitating trade and connection between Lima and the interior of the country. Today, the district that bears its name is an important point of transit and urban development in the Peruvian capital.',
        },
        imgEl: document.querySelector('#puentePiedraInfoImage'),
      },
      franciscoButton: {
        title: {
          es: 'San francisco',
          en: 'San francisco',
        },
        description: {
          es: 'La Iglesia de San Francisco se encuentra ubicada en el Centro Histórico de Lima y es uno de los sitios más emblemáticos y turísticos de la ciudad. Es una muestra tangible de la arquitectura y el arte virreinal en el país. La construcción de esta joya arquitectónica estuvo a cargo de la orden franciscana y culminó en el año 1774, después de un siglo de trabajo.',
          en: 'The Church of San Francisco is located in the Historic Center of Lima and is one of the most emblematic and touristic sites in the city. It is a tangible example of the viceregal architecture and art in the country. The construction of this architectural jewel was carried out by the Franciscan order and was completed in 1774, after a century of work.',
        },
        imgEl: document.querySelector('#puentePiedraInfoImage'),
      },
      instruccionesButton: {
        title: {
          es: 'Instrucciones - Musica',
          en: 'Instructions - Music',
        },
        description: {
          es: "Música: \n\
              1) Puedes pulsar los distintos discos para escuchar música correspondiente a la zona. \n\
              2) Cada una de las 4 zonas tiene un reproductor de música. \n\
              3) Una vez detenida una canción, esta se reiniciará. \n\
              Nota: Tenga en cuenta que la función de teletransporte apagará la canción que esté escuchando.",
          en: "Music: \n\
              1) You can press the different discs to listen to music corresponding to the area. \n\
              2) Each of the 4 areas has a music player. \n\
              3) Once a song is stopped, it will restart. \n\
              Note: Please note that the teleport function will turn off the song you are listening to.",
        },
        imgEl: document.querySelector('#instruccionesInfoImage'),
      },
      instrucciones2Button: {
        title: {
          es: 'Instrucciones - Zonas de teletransporte',
          en: 'Instructions - Teleportation Zones',
        },
        description: {
          es: "Zonas de teletransporte: \n\ 1) Puedes pulsar los lugares de las zonas de teletransporte para llegar instantaneamente a las atracciones y al centro del museo \n\
              2) Existe un mapa de teletransporte en cada una de las 4 atracciones, asi como en el centro del museo \n\
              Nota. Tenga en cuenta que la funcion de teletransporte apagara la cancion que este escuchando.",
          en: "Teleport Zones: \n\ 1) You can tap on the teleport zone locations to instantly reach the attractions and the museum center \n\
2) There is a teleport map at each of the 4 attractions, as well as in the museum center \n\
Note: Please note that the teleport function will mute the song you are listening to.",
        },
        imgEl: document.querySelector('#instrucciones2InfoImage'),
      },
    };

    // Variable para almacenar el idioma actual
    this.language = 'es'; // idioma por defecto

    // Vinculación de eventos
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onBackgroundClick = this.onBackgroundClick.bind(this);
    this.backgroundEl = document.querySelector('#background');
    
    for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('click', this.onMenuButtonClick);
    }
    this.backgroundEl.addEventListener('click', this.onBackgroundClick);

    // Configuración de propiedades de visualización
    this.el.object3D.renderOrder = 2;
    this.el.object3D.depthTest = false;
    fadeBackgroundEl.object3D.renderOrder = 1;
    fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
  },

  // Función para cambiar el idioma
  setLanguage: function(language) {
    this.language = language;
  },

  onMenuButtonClick: function (evt) {
    var placeInfo = this.placeInfo[evt.currentTarget.id];

    // Mostrar el fondo y la información del lugar seleccionado
    this.backgroundEl.object3D.scale.set(2, 2, 1);
    this.el.object3D.scale.set(2.5, 2.5, 2.5);

    if (AFRAME.utils.device.isMobile()) {
      this.el.object3D.scale.set(1.4, 1.4, 1.4);
    }

    this.el.object3D.visible = true;
    if (this.placeImageEl) {
      this.placeImageEl.object3D.visible = false;
    }

    this.placeImageEl = placeInfo.imgEl;
    this.placeImageEl.object3D.visible = true;

    // Actualiza los textos según el idioma seleccionado
    this.placeTitleEl.setAttribute('text', 'value', placeInfo.title[this.language]);
    this.placeDescriptionEl.setAttribute('text', 'value', placeInfo.description[this.language]);
  },

  onBackgroundClick: function () {
    // Ocultar el fondo y la información del lugar seleccionado
    this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.visible = false;
    this.fadeBackgroundEl.object3D.visible = false;
  },
});
