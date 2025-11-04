/**
 * Archivo principal para inicializar todos los módulos del portafolio
 * Coordina la inicialización de todas las funcionalidades
 */

class PortfolioApp {
  constructor() {
    this.thumbnailManager = null;
    this.stackManager = null;
    this.init();
  }

  /**
   * Inicializa la aplicación del portafolio
   */
  init() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeModules();
      });
    } else {
      this.initializeModules();
    }
  }

  /**
   * Inicializa todos los módulos de funcionalidad
   */
  initializeModules() {
    try {
      // Inicializar gestor de thumbnails
      if (window.ThumbnailManager) {
        this.thumbnailManager = new window.ThumbnailManager();
        console.log('✅ ThumbnailManager inicializado correctamente');
      } else {
        console.warn('⚠️ ThumbnailManager no está disponible');
      }

      // Inicializar gestor del stack
      if (window.StackManager) {
        this.stackManager = new window.StackManager();
        console.log('✅ StackManager inicializado correctamente');
      } else {
        console.warn('⚠️ StackManager no está disponible');
      }

      console.log('🚀 Portafolio inicializado correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar el portafolio:', error);
    }
  }

  /**
   * Método para reinicializar todos los módulos si es necesario
   */
  refresh() {
    if (this.thumbnailManager && typeof this.thumbnailManager.refresh === 'function') {
      this.thumbnailManager.refresh();
    }
    
    if (this.stackManager && typeof this.stackManager.refresh === 'function') {
      this.stackManager.refresh();
    }
    
    console.log('🔄 Portafolio reinicializado');
  }

  /**
   * Método para limpiar recursos si es necesario
   */
  destroy() {
    if (this.stackManager && typeof this.stackManager.destroy === 'function') {
      this.stackManager.destroy();
    }
    
    console.log('🧹 Recursos del portafolio limpiados');
  }
}

// Inicializar la aplicación automáticamente
const portfolioApp = new PortfolioApp();

// Exportar para uso global si es necesario
window.PortfolioApp = PortfolioApp;
window.portfolioApp = portfolioApp;
