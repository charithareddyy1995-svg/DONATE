// DOM elements
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const mainNav = document.getElementById('mainNav');
const userProfile = document.getElementById('userProfile');
const userName = document.getElementById('userName');

// Form elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const donateForm = document.getElementById('donateForm');
const requestForm = document.getElementById('requestForm');

// Navigation buttons
const donateButton = document.getElementById('donateButton');
const requestButton = document.getElementById('requestButton');
const myDonationsButton = document.getElementById('myDonationsButton');
const myRequestsButton = document.getElementById('myRequestsButton');
const logoutButton = document.getElementById('logoutButton');

// Section elements
const donateSection = document.getElementById('donateSection');
const requestSection = document.getElementById('requestSection');
const myDonationsSection = document.getElementById('myDonationsSection');
const myRequestsSection = document.getElementById('myRequestsSection');

// Links
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        showLoggedInState(JSON.parse(currentUser));
    }

    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    if (donateForm) {
        donateForm.addEventListener('submit', handleDonate);
    }
    if (requestForm) {
        requestForm.addEventListener('submit', handleRequest);
    }

    // Navigation links
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', showRegister);
    }
    if (showLoginLink) {
        showLoginLink.addEventListener('click', showLogin);
    }

    // Navigation buttons
    if (donateButton) {
        donateButton.addEventListener('click', () => showSection(donateSection));
    }
    if (requestButton) {
        requestButton.addEventListener('click', () => showSection(requestSection));
    }
    if (myDonationsButton) {
        myDonationsButton.addEventListener('click', () => showSection(myDonationsSection));
    }
    if (myRequestsButton) {
        myRequestsButton.addEventListener('click', () => showSection(myRequestsSection));
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // Category selection for donate form
    const categorySelect = document.querySelector('select[name="category"]');
    if (categorySelect) {
        categorySelect.addEventListener('change', handleCategoryChange);
    }

    // Pickup address selection
    const pickupAddressSelect = document.querySelector('select[name="pickupAddress"]');
    if (pickupAddressSelect) {
        pickupAddressSelect.addEventListener('change', handlePickupAddressChange);
    }
}

// Show/Hide functions
function showRegister() {
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
}

function showLogin() {
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
}

function showLoggedInState(user) {
    // Hide login/register sections
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    
    // Show navigation and user profile
    mainNav.style.display = 'block';
    userProfile.style.display = 'block';
    userName.textContent = user.name;
    
    // Show default section (donate)
    showSection(donateSection);
}

function showSection(section) {
    // Hide all sections
    const sections = [donateSection, requestSection, myDonationsSection, myRequestsSection];
    sections.forEach(s => {
        if (s) s.style.display = 'none';
    });
    
    // Show the selected section
    if (section) {
        section.style.display = 'block';
    }
}

// Form handlers
async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        // For now, simulate login (replace with actual API call)
        const user = { name: email.split('@')[0], email: email };
        localStorage.setItem('currentUser', JSON.stringify(user));
        showLoggedInState(user);
        showNotification('Login successful!', 'success');
    } catch (error) {
        showNotification('Login failed. Please try again.', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        // For now, simulate registration (replace with actual API call)
        const user = { name: name, email: email };
        localStorage.setItem('currentUser', JSON.stringify(user));
        showLoggedInState(user);
        showNotification('Registration successful!', 'success');
    } catch (error) {
        showNotification('Registration failed. Please try again.', 'error');
    }
}

async function handleDonate(e) {
    e.preventDefault();
    const formData = new FormData(donateForm);
    
    try {
        // Validate required fields
        const requiredFields = ['donorPhone', 'donorAddress', 'donorTown', 'donorCity', 'donorState', 'category'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            const value = formData.get(field);
            if (!value || value.trim() === '') {
                missingFields.push(field.replace(/([A-Z])/g, ' $1').toLowerCase());
            }
        });
        
        if (missingFields.length > 0) {
            showNotification(`Please fill in: ${missingFields.join(', ')}`, 'error');
            return;
        }
        
        // For now, simulate donation submission (replace with actual API call)
        const donationData = {
            donorName: formData.get('donorName') || 'Anonymous',
            donorPhone: formData.get('donorPhone'),
            donorAddress: formData.get('donorAddress'),
            donorLandmark: formData.get('donorLandmark'),
            donorTown: formData.get('donorTown'),
            donorCity: formData.get('donorCity'),
            donorState: formData.get('donorState'),
            category: formData.get('category'),
            itemDescription: formData.get('itemDescription'),
            pickupDate: formData.get('pickupDate'),
            pickupTime: formData.get('pickupTime'),
            pickupTimeAmPm: formData.get('pickupTimeAmPm'),
            foodType: formData.get('foodType'),
            foodQuantity: formData.get('foodQuantity'),
            expiryDate: formData.get('expiryDate')
        };
        
        console.log('Donation data:', donationData);
        showNotification('Donation submitted successfully! Thank you for your generosity! 🎉', 'success');
        
        // Reset form and hide common fields
        donateForm.reset();
        const commonFields = document.getElementById('commonFields');
        const foodFields = document.getElementById('foodFields');
        if (commonFields) commonFields.style.display = 'none';
        if (foodFields) foodFields.style.display = 'none';
        
    } catch (error) {
        showNotification('Failed to submit donation. Please try again.', 'error');
        console.error('Donation error:', error);
    }
}

async function handleRequest(e) {
    e.preventDefault();
    const formData = new FormData(requestForm);
    
    try {
        // For now, simulate request submission (replace with actual API call)
        const requestData = {
            receiverName: formData.get('receiverName'),
            receiverPhone: formData.get('receiverPhone'),
            wantedItems: formData.get('wantedItems')
        };
        
        console.log('Request data:', requestData);
        showNotification('Request submitted successfully!', 'success');
        requestForm.reset();
    } catch (error) {
        showNotification('Failed to submit request. Please try again.', 'error');
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    mainNav.style.display = 'none';
    userProfile.style.display = 'none';
    loginSection.style.display = 'block';
    showNotification('Logged out successfully!', 'success');
}

// Category change handler
function handleCategoryChange(e) {
    const category = e.target.value;
    const commonFields = document.getElementById('commonFields');
    const foodFields = document.getElementById('foodFields');
    
    // Hide all category-specific fields
    if (commonFields) commonFields.style.display = 'none';
    if (foodFields) foodFields.style.display = 'none';
    
    // Show relevant fields based on category
    if (category) {
        if (commonFields) commonFields.style.display = 'block';
        
        if (category === 'Food') {
            if (foodFields) foodFields.style.display = 'block';
        }
    }
}

// Pickup address change handler
function handlePickupAddressChange(e) {
    const pickupAddress = e.target.value;
    const customAddressField = document.getElementById('customAddressField');
    
    if (pickupAddress === 'customAddress') {
        if (customAddressField) customAddressField.style.display = 'block';
    } else {
        if (customAddressField) customAddressField.style.display = 'none';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notifications = document.getElementById('notifications');
    const globalNotification = document.getElementById('globalNotification');
    if (globalNotification) {
        globalNotification.textContent = message;
        globalNotification.style.display = 'block';
        globalNotification.style.background =
            type === 'success' ? '#2e8b57' : type === 'error' ? '#ff4444' : '#333';
        globalNotification.style.color = 'white';
        setTimeout(() => {
            globalNotification.style.display = 'none';
        }, 3500);
    }
    if (!notifications) return;
    const notification = document.createElement('div');
    notification.className = `notification-item ${type}`;
    notification.innerHTML = `
        <div class="message">${message}</div>
        <div class="timestamp">${new Date().toLocaleTimeString()}</div>
    `;
    notifications.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Location functionality
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const locationDisplay = document.getElementById('locationDisplay');
                if (locationDisplay) {
                    locationDisplay.textContent = `Location: ${position.coords.latitude}, ${position.coords.longitude}`;
                }
                showNotification('Location shared successfully!', 'success');
            },
            function(error) {
                showNotification('Error getting location: ' + error.message, 'error');
            }
        );
    } else {
        showNotification('Geolocation is not supported by this browser.', 'error');
    }
}

// Google Maps integration
let map, marker;
let currentMapModal = null;

function initMap() {
    console.log('Google Maps API loaded');
    // Initialize maps for all modals
    initializeMapModals();
}

function initializeMapModals() {
    // Initialize map modals
    const mapButtons = [
        { button: 'openMapDonate', modal: 'mapModalDonate', canvas: 'mapCanvasDonate', confirm: 'confirmLocationDonate' },
        { button: 'openMapRequest', modal: 'mapModalRequest', canvas: 'mapCanvasRequest', confirm: 'confirmLocationRequest' },
        { button: 'openMapCustom', modal: 'mapModalCustom', canvas: 'mapCanvasCustom', confirm: 'confirmLocationCustom' }
    ];

    mapButtons.forEach(({ button, modal, canvas, confirm }) => {
        const openButton = document.getElementById(button);
        const modalElement = document.getElementById(modal);
        const canvasElement = document.getElementById(canvas);
        const confirmButton = document.getElementById(confirm);
        const closeButton = modalElement?.querySelector('.map-close-button');

        if (openButton && modalElement && canvasElement) {
            openButton.addEventListener('click', () => openMapModal(modalElement, canvasElement));
            
            if (closeButton) {
                closeButton.addEventListener('click', () => closeMapModal(modalElement));
            }
            
            if (confirmButton) {
                confirmButton.addEventListener('click', () => confirmMapLocation(modalElement));
            }
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modals = document.querySelectorAll('.map-modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeMapModal(modal);
            }
        });
    });
}

function openMapModal(modalElement, canvasElement) {
    currentMapModal = modalElement;
    modalElement.style.display = 'block';
    
    // Initialize map if not already done
    if (!map) {
        map = new google.maps.Map(canvasElement, {
            center: { lat: 20.5937, lng: 78.9629 }, // India center
            zoom: 5
        });
        
        // Add click listener to map
        map.addListener('click', (event) => {
            placeMarker(event.latLng);
        });
    } else {
        // Reuse existing map
        map.setMap(null);
        map = new google.maps.Map(canvasElement, {
            center: { lat: 20.5937, lng: 78.9629 },
            zoom: 5
        });
        
        map.addListener('click', (event) => {
            placeMarker(event.latLng);
        });
    }
}

function placeMarker(latLng) {
    if (marker) {
        marker.setMap(null);
    }
    
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: true
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `Selected Location: ${latLng.lat().toFixed(6)}, ${latLng.lng().toFixed(6)}`
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// In confirmMapLocation, fill a read-only field in the donate form with the coordinates
function confirmMapLocation(modalElement) {
    if (marker) {
        const position = marker.getPosition();
        const lat = position.lat();
        const lng = position.lng();
        // Show notification
        showNotification(`Location selected: ${lat.toFixed(6)}, ${lng.toFixed(6)}`, 'success');
        // If donate form is visible, fill a read-only field
        const donateSection = document.getElementById('donateSection');
        if (donateSection && donateSection.style.display !== 'none') {
            let coordField = document.getElementById('donateCoords');
            if (!coordField) {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'donateCoords';
                input.name = 'donateCoords';
                input.readOnly = true;
                input.style.marginTop = '8px';
                input.style.background = '#f8f8f8';
                input.style.border = '1.5px solid #2e8b57';
                input.style.color = '#2e8b57';
                input.style.fontWeight = 'bold';
                input.style.width = '100%';
                input.value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
                // Insert after the address field
                const addressField = donateSection.querySelector('input[name="donorAddress"]');
                if (addressField && addressField.parentNode) {
                    addressField.parentNode.insertBefore(input, addressField.nextSibling);
                } else {
                    donateSection.appendChild(input);
                }
            } else {
                coordField.value = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
            }
        }
        closeMapModal(modalElement);
    } else {
        showNotification('Please select a location on the map first', 'error');
    }
}

function closeMapModal(modalElement) {
    modalElement.style.display = 'none';
    currentMapModal = null;
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function formatTime(time) {
    return time;
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
    setupEventListeners();
} 