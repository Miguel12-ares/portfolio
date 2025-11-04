/**
 * Módulo para la funcionalidad de la sección Stack
 * Principio Single Responsibility aplicado
 */

class StackManager {
  constructor() {
    this.stackSection = null;
    this.techItems = [];
    this.observer = null;
    this.observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  /**
   * Inicializa el gestor del Stack
   */
  init() {
    this.stackSection = document.getElementById('stack');
    this.techItems = document.querySelectorAll('.tech-item');
    
    if (this.stackSection && this.techItems.length > 0) {
      this.setupIntersectionObserver();
      this.bindTechItemEvents();
    }
  }

  /**
   * Configura el observador de intersección para animaciones
   */
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.triggerStackAnimations();
        }
      });
    }, this.observerOptions);
    
    this.observer.observe(this.stackSection);
  }

  /**
   * Activa las animaciones escalonadas del stack
   */
  triggerStackAnimations() {
    this.techItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.animationPlayState = 'running';
      }, index * 100);
    });
  }

  /**
   * Vincula los eventos de click a los elementos de tecnología
   */
  bindTechItemEvents() {
    this.techItems.forEach(item => {
      item.addEventListener('click', (event) => {
        this.handleTechItemClick(event.target.closest('.tech-item'));
      });
    });
  }

  /**
   * Maneja el click en un elemento de tecnología
   * @param {HTMLElement} techItem - El elemento de tecnología clickeado
   */
  handleTechItemClick(techItem) {
    if (!techItem) return;
    
    const techName = techItem.getAttribute('data-tech');
    
    // Efecto visual de click
    this.applyClickEffect(techItem);
    
    // Log de la tecnología seleccionada (opcional)
    console.log(`Tecnología seleccionada: ${techName}`);
    
    // Aquí se puede agregar funcionalidad adicional como:
    // - Mostrar información detallada
    // - Navegar a documentación
    // - Filtrar proyectos por tecnología
  }

  /**
   * Aplica el efecto visual de click
   * @param {HTMLElement} techItem - El elemento al que aplicar el efecto
   */
  applyClickEffect(techItem) {
    techItem.style.transform = 'scale(0.95)';
    setTimeout(() => {
      techItem.style.transform = '';
    }, 150);
  }

  /**
   * Método para limpiar el observador si es necesario
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Método público para reinicializar si es necesario
   */
  refresh() {
    this.destroy();
    this.init();
  }
}

// Exportar la clase para uso en otros módulos
window.StackManager = StackManager;
