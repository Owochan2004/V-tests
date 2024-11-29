
//Este código registra un componente de A-Frame llamado highlight, que permite gestionar la 
//interacción visual y de comportamiento con elementos de un menú, venia por defecto en el repositoria de A frame 


document.addEventListener("DOMContentLoaded", () => {
  const infoPanel = document.querySelector("#infoPanel");
  const titleEntity = document.querySelector("#infoTitle");
  const descriptionEntity = document.querySelector("#infoDescription");

  const puentePiedraButton = document.querySelector("#puentePiedraButton");
  const huallamarcaButton = document.querySelector("#huallamarcaButton");
  const santoDomingoButton = document.querySelector("#santoDomingoButton");

  // Seleccionar luces para reiniciar su configuración
  const lights = document.querySelectorAll("a-light, a-entity[light]"); // Busca todas las luces

  // Valores originales de las luces (modificar según tu escena)
  const originalLightSettings = Array.from(lights).map(light => ({
    element: light,
    type: light.getAttribute("light").type,
    color: light.getAttribute("light").color,
    intensity: light.getAttribute("light").intensity,
    position: light.getAttribute("position"),
  }));

  // Función para restablecer luces
  function resetLights() {
    originalLightSettings.forEach(({ element, type, color, intensity, position }) => {
      element.setAttribute("light", { type, color, intensity });
      if (position) {
        element.setAttribute("position", position);
      }
    });
  }

  // Usar materiales planos para evitar efectos de iluminación indeseados
  infoPanel.setAttribute("material", "shader: flat; color: #ffffff");
  titleEntity.setAttribute("material", "shader: flat; color: #000000");
  descriptionEntity.setAttribute("material", "shader: flat; color: #000000");

  function showInfoPanel(position, rotation, title, description) {
    moveInfoPanelToPosition(position, rotation);
    infoPanel.setAttribute("visible", true);
    titleEntity.setAttribute("text", `value: ${title}`);
    descriptionEntity.setAttribute("text", `value: ${description}`);
  }

  function moveInfoPanelToPosition(position, rotation) {
    infoPanel.setAttribute("position", position);
    infoPanel.setAttribute("rotation", rotation);
  }

  function closeInfoPanel() {
    infoPanel.setAttribute("visible", false);
    resetLights(); // Restablecer la configuración de luces al cerrar
  }

  puentePiedraButton.addEventListener("click", () => {
    showInfoPanel(
      { x: -5, y: 1.5, z: -3 },
      { x: 0, y: 45, z: 0 },
      "Puente Piedra",
      "Información sobre Puente Piedra."
    );
  });

  huallamarcaButton.addEventListener("click", () => {
    showInfoPanel(
      { x: 0, y: 1.5, z: -3 },
      { x: 0, y: 90, z: 0 },
      "Huallamarca",
      "Información sobre la Huaca Huallamarca."
    );
  });

  santoDomingoButton.addEventListener("click", () => {
    showInfoPanel(
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 90, z: 0 },
      "Santo Domingo",
      "Información sobre Santo Domingo."
    );
  });

  infoPanel.addEventListener("click", closeInfoPanel);
});
