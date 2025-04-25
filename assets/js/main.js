/**
 * ToloAI - Main JavaScript Functions
 * This file contains all the common JavaScript functions used across the website
 */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

/**
 * Initialize all components
 */
function initializeComponents() {
    initializeHeader();
    initializeMobileNav();
    initializeSidebar();
    initializeModals();
    initializeToasts();
    initializeDropdowns();
    initializeTabs();
    initializeAlerts();
    initializePricingToggle();
    initializeLanguageSelector();
    initializeDataTables();
    updateCopyrightYear();
}

/**
 * Header functions - handle dynamic header styling on scroll
 */
function initializeHeader() {
    const header = document.querySelector('.main-header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

/**
 * Mobile Navigation - handle the mobile menu toggle and navigation
 */
function initializeMobileNav() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileOverlay = document.createElement('div');
    
    if (!mobileMenuToggle || !mobileNav || !mobileClose) return;
    
    // Create overlay
    mobileOverlay.classList.add('mobile-nav-overlay');
    document.body.appendChild(mobileOverlay);
    
    // Open mobile navigation
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile navigation
    function closeMobileNav() {
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileClose.addEventListener('click', closeMobileNav);
    mobileOverlay.addEventListener('click', closeMobileNav);
    
    // Close submenus when main nav items are clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a:not(.has-dropdown)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    
    // Handle dropdown menus in mobile navigation
    const mobileDropdowns = document.querySelectorAll('.mobile-nav-links .has-dropdown');
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const submenu = this.nextElementSibling;
            
            if (submenu.style.maxHeight) {
                submenu.style.maxHeight = null;
            } else {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Sidebar functions - handle the sidebar toggle and navigation
 */
function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarOverlay = document.createElement('div');
    
    if (!sidebar) return;
    
    // Create overlay for mobile
    sidebarOverlay.classList.add('sidebar-overlay');
    document.body.appendChild(sidebarOverlay);
    
    // Toggle sidebar (for desktop)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            document.querySelector('.dashboard-content').classList.toggle('expanded');
        });
    }
    
    // Close sidebar (for mobile)
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close sidebar when overlay is clicked
    sidebarOverlay.addEventListener('click', function() {
        if (sidebar) {
            sidebar.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle sidebar dropdowns
    const sidebarDropdowns = document.querySelectorAll('.sidebar-dropdown');
    sidebarDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            dropdown.classList.toggle('open');
            const submenu = dropdown.querySelector('.sidebar-submenu');
            
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });
    
    // Set active menu item based on current URL
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-menu-item a');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPath || currentPath.includes(href) && href !== '#') {
            link.parentElement.classList.add('active');
            
            // If inside dropdown, open the dropdown
            const parentDropdown = link.closest('.sidebar-dropdown');
            if (parentDropdown) {
                parentDropdown.classList.add('open');
                const submenu = parentDropdown.querySelector('.sidebar-submenu');
                if (submenu) {
                    submenu.style.display = 'block';
                }
            }
        }
    });
}

/**
 * Modal functions - initialize and handle modals
 */
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const modal = document.querySelector(targetId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Close modal when close button is clicked
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-cancel');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when overlay is clicked
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

/**
 * Open a modal
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus the first input or button
    setTimeout(() => {
        const firstInput = modal.querySelector('input, button:not(.modal-close)');
        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

/**
 * Close a modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Toast notification functions
 */
function initializeToasts() {
    // Close toast when close button is clicked
    const toastCloseButtons = document.querySelectorAll('.toast-close');
    
    toastCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toast = this.closest('.toast');
            closeToast(toast);
        });
    });
    
    // Auto close toasts after 5 seconds
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
        setTimeout(() => {
            closeToast(toast);
        }, 5000);
    });
}

/**
 * Show a toast notification
 * @param {string} type - 'success', 'warning', 'danger', or 'info'
 * @param {string} title - The toast title
 * @param {string} message - The toast message
 * @param {number} duration - Duration in milliseconds (default: 5000)
 */
function showToast(type, title, message, duration = 5000) {
    // Create toast elements
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    
    const iconClass = {
        'success': 'fas fa-check-circle',
        'warning': 'fas fa-exclamation-triangle',
        'danger': 'fas fa-times-circle',
        'info': 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${iconClass[type] || 'fas fa-info-circle'}"></i>
        </div>
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-message">${message}</p>
        </div>
        <div class="toast-close">
            <i class="fas fa-times"></i>
        </div>
        <div class="toast-progress"></div>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Make the progress animation duration match the toast duration
    const progressBar = toast.querySelector('.toast-progress');
    progressBar.style.animation = `progress ${duration / 1000}s linear forwards`;
    
    // Add click event to close button
