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
const closeButton = toast.querySelector('.toast-close');
closeButton.addEventListener('click', function() {
    closeToast(toast);
});

// Show toast
setTimeout(() => {
    toast.classList.add('active');
}, 10);

// Auto close toast
setTimeout(() => {
    closeToast(toast);
}, duration);
}

/**
* Close a toast notification
* @param {HTMLElement} toast - The toast element to close
*/
function closeToast(toast) {
toast.classList.remove('active');
toast.style.opacity = 0;

setTimeout(() => {
    if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
    }
}, 300);
}

/**
* Dropdown functions
*/
function initializeDropdowns() {
const dropdownToggles = document.querySelectorAll('[data-toggle="dropdown"]');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const dropdownMenu = this.nextElementSibling;
        
        // Close all other dropdowns
        const otherDropdowns = document.querySelectorAll('.dropdown-menu.show');
        otherDropdowns.forEach(dropdown => {
            if (dropdown !== dropdownMenu) {
                dropdown.classList.remove('show');
            }
        });
        
        // Toggle current dropdown
        dropdownMenu.classList.toggle('show');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
    
    openDropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
        }
    });
});
}

/**
* Tab functions
*/
function initializeTabs() {
const tabLinks = document.querySelectorAll('.tab-link');

tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const tabId = this.getAttribute('href');
        const tabContent = document.querySelector(tabId);
        
        if (!tabContent) return;
        
        // Remove active class from all tabs and panes
        const tabContainer = this.closest('.tabs-container');
        const allTabs = tabContainer.querySelectorAll('.tab-item');
        const allPanes = tabContainer.querySelectorAll('.tab-pane');
        
        allTabs.forEach(tab => tab.classList.remove('active'));
        allPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current tab and pane
        this.parentElement.classList.add('active');
        tabContent.classList.add('active');
    });
});
}

/**
* Alert functions
*/
function initializeAlerts() {
const alertCloseButtons = document.querySelectorAll('.alert-close');

alertCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
        const alert = this.closest('.alert');
        
        alert.style.opacity = 0;
        setTimeout(() => {
            alert.style.display = 'none';
        }, 300);
    });
});
}

/**
* Form validation functions
*/
function validateForm(form) {
const inputs = form.querySelectorAll('input, select, textarea');
let isValid = true;

inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
        markInvalid(input, 'This field is required');
        isValid = false;
    } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
        markInvalid(input, 'Please enter a valid email address');
        isValid = false;
    } else if (input.pattern && input.value && !new RegExp(input.pattern).test(input.value)) {
        markInvalid(input, input.dataset.errorMessage || 'Please match the requested format');
        isValid = false;
    } else {
        markValid(input);
    }
});

return isValid;
}

/**
* Mark form field as invalid
* @param {HTMLElement} input - The input element
* @param {string} message - Error message
*/
function markInvalid(input, message) {
input.classList.add('is-invalid');

// Add error message if it doesn't exist
let errorElement = input.nextElementSibling;
if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
    errorElement = document.createElement('div');
    errorElement.classList.add('invalid-feedback');
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

errorElement.textContent = message;
}

/**
* Mark form field as valid
* @param {HTMLElement} input - The input element
*/
function markValid(input) {
input.classList.remove('is-invalid');

// Remove error message if it exists
const errorElement = input.nextElementSibling;
if (errorElement && errorElement.classList.contains('invalid-feedback')) {
    errorElement.textContent = '';
}
}

/**
* Validate email format
* @param {string} email - The email to validate
* @returns {boolean} - True if valid, false otherwise
*/
function isValidEmail(email) {
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(email).toLowerCase());
}

/**
* Pricing toggle (monthly/annual)
*/
function initializePricingToggle() {
const pricingOptions = document.querySelectorAll('.pricing-toggle-option');

if (!pricingOptions.length) return;

pricingOptions.forEach(option => {
    option.addEventListener('click', function() {
        pricingOptions.forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        
        // Toggle price display
        const isAnnual = this.textContent.includes('Annual');
        const priceElements = document.querySelectorAll('.pricing-price');
        
        priceElements.forEach(el => {
            const monthlyPrice = el.getAttribute('data-monthly');
            const annualPrice = el.getAttribute('data-annual');
            
            if (monthlyPrice && annualPrice) {
                const priceSpan = el.querySelector('.price-value');
                
                if (priceSpan) {
                    priceSpan.textContent = isAnnual ? annualPrice : monthlyPrice;
                }
            }
        });
    });
});
}

/**
* Language selector
*/
function initializeLanguageSelector() {
const languageSelect = document.getElementById('language-select');

if (!languageSelect) return;

languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    // Here you would implement the logic to change the language
    // For demonstration, we'll just show a toast notification
    showToast('info', 'Language Changed', `Language has been changed to ${selectedLanguage}`, 3000);
});
}

/**
* Update copyright year
*/
function updateCopyrightYear() {
const yearElement = document.getElementById('current-year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
}

/**
* Initialize data tables
*/
function initializeDataTables() {
const tables = document.querySelectorAll('.data-table');

tables.forEach(table => {
    // Check for sortable headers
    const sortableHeaders = table.querySelectorAll('th[data-sortable]');
    
    sortableHeaders.forEach(header => {
        header.classList.add('sortable');
        header.addEventListener('click', function() {
            const column = this.cellIndex;
            const currentDir = this.getAttribute('data-sort-dir') || 'none';
            const newDir = currentDir === 'asc' ? 'desc' : 'asc';
            
            // Remove sorting from all headers
            sortableHeaders.forEach(h => {
                h.removeAttribute('data-sort-dir');
                h.classList.remove('sorting-asc', 'sorting-desc');
            });
            
            // Set sorting on current header
            this.setAttribute('data-sort-dir', newDir);
            this.classList.add(`sorting-${newDir}`);
            
            // Sort the table
            sortTable(table, column, newDir);
        });
    });
});
}

/**
* Sort table by column
* @param {HTMLElement} table - The table element
* @param {number} column - The column index to sort by
* @param {string} direction - 'asc' or 'desc'
*/
function sortTable(table, column, direction) {
const rows = Array.from(table.querySelectorAll('tbody tr'));
const tbody = table.querySelector('tbody');

// Sort rows
rows.sort((a, b) => {
    const aValue = a.cells[column].textContent.trim();
    const bValue = b.cells[column].textContent.trim();
    
    // Check if values are numbers
    const aNum = parseFloat(aValue);
    const bNum = parseFloat(bValue);
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
        return direction === 'asc' ? aNum - bNum : bNum - aNum;
    }
    
    // Sort as strings
    return direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
});

// Remove all rows and add sorted ones
while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}

rows.forEach(row => {
    tbody.appendChild(row);
});
}

// Export functions for usage in other scripts
if (typeof module !== 'undefined' && module.exports) {
module.exports = {
    showToast,
    closeToast,
    openModal,
    closeModal,
    validateForm,
    sortTable
};
}
