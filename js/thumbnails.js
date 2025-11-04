/**
 * Módulo para la funcionalidad de cambio de imágenes en thumbnails
 * Principio Single Responsibility aplicado
 */

class ThumbnailManager {
  constructor() {
    this.thumbnails = [];
    this.init();
  }

  /**
   * Inicializa el gestor de thumbnails
   */
  init() {
    this.thumbnails = document.querySelectorAll('.thumbnail');
    this.bindEvents();
  }

  /**
   * Vincula los eventos de click a cada thumbnail
   */
  bindEvents() {
    this.thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', (event) => {
        this.handleThumbnailClick(event.target);
      });
    });
  }

  /**
   * Maneja el click en un thumbnail
   * @param {HTMLElement} thumbnail - El elemento thumbnail clickeado
   */
  handleThumbnailClick(thumbnail) {
    // Obtener el ID de la imagen principal objetivo
    const targetId = thumbnail.getAttribute('data-target');
    const mainImage = document.getElementById(targetId);
    
    // Cambiar la imagen principal
    if (mainImage) {
      mainImage.src = thumbnail.src;
      mainImage.alt = thumbnail.alt;
    }
    
    // Actualizar estados activos
    this.updateActiveStates(thumbnail);
  }

  /**
   * Actualiza los estados activos de los thumbnails
   * @param {HTMLElement} activeThumbnail - El thumbnail que debe estar activo
   */
  updateActiveStates(activeThumbnail) {
    // Remover clase active de todos los thumbnails del mismo proyecto
    const projectThumbnails = activeThumbnail.parentElement.querySelectorAll('.thumbnail');
    projectThumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Agregar clase active al thumbnail clickeado
    activeThumbnail.classList.add('active');
  }

  /**
   * Método público para reinicializar si es necesario
   */
  refresh() {
    this.init();
  }
}

// Exportar la clase para uso en otros módulos
window.ThumbnailManager = ThumbnailManager;
