document.addEventListener("DOMContentLoaded", () => {
  const infoPanel = document.querySelector("#infoPanel");
  const titleEntity = document.querySelector("#infoTitle");
  const descriptionEntity = document.querySelector("#infoDescription");

  const puentePiedraButton = document.querySelector("#puentePiedraButton");
  const huallamarcaButton = document.querySelector("#huallamarcaButton");
  const santoDomingoButton = document.querySelector("#santoDomingoButton");
  const franciscoButton = document.querySelector("#franciscoButton");
  const instruccionesButton = document.querySelector("#instruccionesButton");
  const instrucciones2Button = document.querySelector("#instrucciones2Button");


  // Seleccionar las luces
  const directionalLight = document.querySelector("#directionalLight");
  const ambientLight = document.querySelector("#ambientLight");

  function showInfoPanel(position, rotation, title, description) {
    moveInfoPanelToPosition(position, rotation);
    infoPanel.setAttribute("visible", true);
    titleEntity.setAttribute("text", `value: ${title}`);
    descriptionEntity.setAttribute("text", `value: ${description}`);
  }

  // Función para mover el panel a una posición específica
  function moveInfoPanelToPosition(position, rotation) {
    // Actualizar posición y rotación del panel
    infoPanel.setAttribute("position", position);
    infoPanel.setAttribute("rotation", rotation);
  }

  // Función para cerrar el panel
  function closeInfoPanel() {
    infoPanel.setAttribute("visible", false);
    infoPanel.setAttribute("scale", "0.001 0.001 0.001");
    directionalLight.setAttribute("intensity", 1);
    directionalLight.setAttribute("color", "#ffffff");
  

  }

  // Eventos de clic con posición y rotación específicas
  puentePiedraButton.addEventListener("click", () => {
    showInfoPanel(
      { x: 50, y: 1, z: 3 }, // Posición
      { x: 0, y: 270, z: 0 }, // Rotación
      "Puente Piedra",
      "Información sobre Puente Piedra."
    );
  });

  huallamarcaButton.addEventListener("click", () => {
    showInfoPanel(
      { x: -1, y: 0.7, z: 53 }, // Posición
      { x: 0, y: 180, z: 0 }, // Rotación
      "Huallamarca",
      "Información sobre la Huaca Huallamarca."
    );
  });

  franciscoButton.addEventListener("click", () => {
    showInfoPanel(
      { x: -50, y: 1, z: 2 }, // Posición
      { x: 0, y: 90, z: 0 }, // Rotación
      "francisco",
      "Información sobre la francisco."
    );
  });
  santoDomingoButton.addEventListener("click", () => {
    showInfoPanel(
      { x: 0, y: 1, z: -47 }, // Posición
      { x: 0, y: 0, z: 0 }, // Rotación
      "Santo Domingo",
      "Información sobre Santo Domingo."
    );
  });

  instruccionesButton.addEventListener("click", () => {
    showInfoPanel(
      { x: 4, y: 2, z: 3 }, // Posición
      { x: 0, y: -90, z: 0 }, // Rotación
      "Instrucciones - Musica",
      "Información de instrucciones."
    );
  });

  
  instrucciones2Button.addEventListener("click", () => {
    showInfoPanel(
      { x: -4, y: 2, z: 3 }, // Posición
      { x: 0, y: 90, z: 0 }, // Rotación
      "Instrucciones - Mapa interactivo",
      "Información de mapa interactivo."
    );
  });

  // Cerrar el panel solo cuando se haga clic sobre él
  infoPanel.addEventListener("click", closeInfoPanel);
});
