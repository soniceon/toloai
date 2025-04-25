/**
 * ToloAI Dashboard - JavaScript
 * This file contains specific functions for the dashboard interface
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

/**
 * Initialize dashboard components
 */
function initializeDashboard() {
    // Initialize dashboard-specific dropdowns
    initializeDashboardDropdowns();
    
    // Initialize notification panel
    initializeNotifications();
    
    // Initialize user menu
    initializeUserMenu();
    
    // Initialize charts
    initializeCharts();
}

/**
 * Initialize dashboard dropdowns
 */
function initializeDashboardDropdowns() {
    const dropdownButtons = document.querySelectorAll('.dashboard-header [data-toggle="dropdown"]');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.nextElementSibling;
            
            // Close other dropdowns
            const allDropdowns = document.querySelectorAll('.dashboard-header .show');
            allDropdowns.forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.dashboard-header .show');
        
        dropdowns.forEach(dropdown => {
            // Check if the click was outside the dropdown
            if (!dropdown.contains(e.target) && !e.target.matches('[data-toggle="dropdown"]')) {
                dropdown.classList.remove('show');
            }
        });
    });
}

/**
 * Initialize notification panel
 */
function initializeNotifications() {
    const notificationButton = document.querySelector('.notification-button');
    
    if (!notificationButton) return;
    
    notificationButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const notificationDropdown = this.nextElementSibling;
        notificationDropdown.classList.toggle('show');
    });
    
    // Close notification dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.notification-dropdown.show');
        
        if (dropdown && !dropdown.contains(e.target) && !e.target.matches('.notification-button')) {
            dropdown.classList.remove('show');
        }
    });
}

/**
 * Initialize user menu
 */
function initializeUserMenu() {
    const userButton = document.querySelector('.user-button');
    
    if (!userButton) return;
    
    userButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const userDropdown = this.nextElementSibling;
        userDropdown.classList.toggle('show');
    });
    
    // Close user dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.user-dropdown.show');
        
        if (dropdown && !dropdown.contains(e.target) && !e.target.matches('.user-button')) {
            dropdown.classList.remove('show');
        }
    });
}

/**
 * Initialize charts
 * Note: This is a placeholder function. In a real implementation,
 * you would use a charting library like Chart.js, ApexCharts, etc.
 */
function initializeCharts() {
    // This is where you would initialize your charts
    // For example, with Chart.js:
    
    /*
    if (typeof Chart !== 'undefined' && document.getElementById('activityChart')) {
        const ctx = document.getElementById('activityChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Data Processing',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(67, 97, 238, 0.2)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 2,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    if (typeof Chart !== 'undefined' && document.getElementById('storageChart')) {
        const ctx = document.getElementById('storageChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['CSV Files', 'JSON Data', 'Excel Files', 'Other Files'],
                datasets: [{
                    data: [12.8, 8.4, 10.2, 5.1],
                    backgroundColor: [
                        '#4361ee',
                        '#3a0ca3',
                        '#f72585',
                        '#4cc9f0'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%'
            }
        });
    }
    */
}

/**
 * Handle sidebar on mobile devices
 */
function handleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    if (window.innerWidth < 992) {
        sidebar.classList.add('mobile');
        
        // Show sidebar and overlay
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('mobile');
    }
}

/**
 * Create a toast notification in the dashboard
 * @param {string} message - The notification message
 * @param {string} type - 'success', 'warning', 'danger', or 'info'
 */
function showDashboardNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('dashboard-notification', `notification-${type}`);
    
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // Add to DOM
    const container = document.querySelector('.dashboard-notifications-container') || document.body;
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add close event
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

/**
 * Close a dashboard notification
 * @param {HTMLElement} notification - The notification element
 */
function closeNotification(notification) {
    notification.classList.remove('show');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

/**
 * Update dashboard stats and data
 * This is a placeholder function for demonstration purposes
 */
function updateDashboardData() {
    // This would typically involve fetching data from an API
    // and updating the dashboard elements
    
    // For demonstration, we'll just update the timestamp
    const lastUpdated = document.querySelector('.dashboard-last-updated');
    
    if (lastUpdated) {
        const now = new Date();
        lastUpdated.textContent = `Last updated: ${now.toLocaleTimeString()}`;
    }
}
