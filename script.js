// ===============================
// DOM ELEMENTS
// ===============================

const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const mainNav = document.getElementById('mainNav');
const userProfile = document.getElementById('userProfile');
const userName = document.getElementById('userName');

// Home page elements
const howToDonate = document.getElementById('howToDonate');
const footerLinks = document.getElementById('footerLinks');
const mainFooter = document.getElementById('mainFooter');

// ===============================
// FORM ELEMENTS
// ===============================

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const donateForm = document.getElementById('donateForm');
const requestForm = document.getElementById('requestForm');

// ===============================
// NAVIGATION BUTTONS
// ===============================

const donateButton = document.getElementById('donateButton');
const requestButton = document.getElementById('requestButton');
const myDonationsButton = document.getElementById('myDonationsButton');
const myRequestsButton = document.getElementById('myRequestsButton');
const logoutButton = document.getElementById('logoutButton');

// ===============================
// SECTION ELEMENTS
// ===============================

const donateSection = document.getElementById('donateSection');
const requestSection = document.getElementById('requestSection');
const myDonationsSection = document.getElementById('myDonationsSection');
const myRequestsSection = document.getElementById('myRequestsSection');

// ===============================
// LINKS
// ===============================

const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');


// ===============================
// INITIALIZE APPLICATION
// ===============================

document.addEventListener('DOMContentLoaded', function () {

    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        try {
            showLoggedInState(JSON.parse(currentUser));
        } catch (error) {
            console.error("Invalid user data:", error);
            localStorage.removeItem('currentUser');
            showLoggedOutState();
        }
    } else {
        showLoggedOutState();
    }

    setupEventListeners();
});


// ===============================
// EVENT LISTENERS
// ===============================

function setupEventListeners() {

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Donate
    if (donateForm) {
        donateForm.addEventListener('submit', handleDonate);
    }

    // Request
    if (requestForm) {
        requestForm.addEventListener('submit', handleRequest);
    }

    // Register link
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function (e) {
            e.preventDefault();
            showRegister();
        });
    }

    // Login link
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function (e) {
            e.preventDefault();
            showLogin();
        });
    }

    // Donate button
    if (donateButton) {
        donateButton.addEventListener('click', function () {
            showSection(donateSection);
        });
    }

    // Request button
    if (requestButton) {
        requestButton.addEventListener('click', function () {
            showSection(requestSection);
        });
    }

    // My Donations
    if (myDonationsButton) {
        myDonationsButton.addEventListener('click', function () {
            showSection(myDonationsSection);
            loadMyDonations();
        });
    }

    // My Requests
    if (myRequestsButton) {
        myRequestsButton.addEventListener('click', function () {
            showSection(myRequestsSection);
        });
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // Category selection
    const categorySelect = document.querySelector('select[name="category"]');

    if (categorySelect) {
        categorySelect.addEventListener('change', handleCategoryChange);
    }

    // Pickup address selection
    const pickupAddressSelect = document.querySelector(
        'select[name="pickupAddress"]'
    );

    if (pickupAddressSelect) {
        pickupAddressSelect.addEventListener(
            'change',
            handlePickupAddressChange
        );
    }
}


// ===============================
// SHOW HOME PAGE
// ===============================

function showHomePage() {

    if (howToDonate) {
        howToDonate.style.display = 'block';
    }

    if (footerLinks) {
        footerLinks.style.display = 'block';
    }

    if (mainFooter) {
        mainFooter.style.display = 'block';
    }
}


// ===============================
// HIDE HOME PAGE
// ===============================

function hideHomePage() {

    if (howToDonate) {
        howToDonate.style.display = 'none';
    }

    if (footerLinks) {
        footerLinks.style.display = 'none';
    }

    if (mainFooter) {
        mainFooter.style.display = 'none';
    }
}


// ===============================
// SHOW REGISTER PAGE
// ===============================

function showRegister() {

    // Hide login
    if (loginSection) {
        loginSection.style.display = 'none';
    }

    // Show register
    if (registerSection) {
        registerSection.style.display = 'block';
    }

    // Hide home
    hideHomePage();

    // Hide Donate / Request / My sections
    showSection(null);
}


// ===============================
// SHOW LOGIN PAGE
// ===============================

function showLogin() {

    // Hide register
    if (registerSection) {
        registerSection.style.display = 'none';
    }

    // Show login
    if (loginSection) {
        loginSection.style.display = 'block';
    }

    // Hide home
    hideHomePage();

    // Hide Donate / Request / My sections
    showSection(null);
}


// ===============================
// LOGGED IN STATE
// ===============================

function showLoggedInState(user) {

    // Hide login
    if (loginSection) {
        loginSection.style.display = 'none';
    }

    // Hide register
    if (registerSection) {
        registerSection.style.display = 'none';
    }

    // Show navigation
    if (mainNav) {
        mainNav.style.display = 'block';
    }

    // Show user profile
    if (userProfile) {
        userProfile.style.display = 'block';
    }

    // Show username
    if (userName && user) {
        userName.textContent = user.name;
    }

    // Hide all functional sections
    showSection(null);

    // Show home page
    showHomePage();
}


// ===============================
// LOGGED OUT STATE
// ===============================

function showLoggedOutState() {

    // Hide navigation
    if (mainNav) {
        mainNav.style.display = 'none';
    }

    // Hide profile
    if (userProfile) {
        userProfile.style.display = 'none';
    }

    // Show login
    if (loginSection) {
        loginSection.style.display = 'block';
    }

    // Hide register
    if (registerSection) {
        registerSection.style.display = 'none';
    }

    // Hide home
    hideHomePage();

    // Hide functional sections
    showSection(null);
}


// ===============================
// SHOW / HIDE FUNCTIONAL SECTIONS
// ===============================

function showSection(section) {

    const sections = [
        donateSection,
        requestSection,
        myDonationsSection,
        myRequestsSection
    ];

    // Hide all functional sections
    sections.forEach(function (s) {
        if (s) {
            s.style.display = 'none';
        }
    });

    // If a section is selected
    if (section) {

        // Hide home page
        hideHomePage();

        // Show selected section
        section.style.display = 'block';

    } else {

        // No section selected
        // Home page can be shown only when user is logged in
        const currentUser = localStorage.getItem('currentUser');

        if (currentUser) {
            showHomePage();
        }
    }
}


// ===============================
// LOGIN HANDLER
// ===============================

async function handleLogin(e) {

    e.preventDefault();

    const formData = new FormData(loginForm);

    const loginData = {
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user)
        );

        showLoggedInState(data.user);

        showNotification(
            "Login successful!",
            "success"
        );

    } catch (error) {

        showNotification(
            error.message,
            "error"
        );
    }
}


// ===============================
// REGISTER HANDLER
// ===============================

async function handleRegister(e) {

    e.preventDefault();

    const formData = new FormData(registerForm);

    const userData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(data.user)
        );

        showLoggedInState(data.user);

        showNotification(
            "Registration successful!",
            "success"
        );

    } catch (error) {

        showNotification(
            error.message,
            "error"
        );
    }
}


// ===============================
// DONATE HANDLER
// ===============================

async function handleDonate(e) {

    e.preventDefault();

    const formData = new FormData(donateForm);

    const currentUser = JSON.parse(
        localStorage.getItem('currentUser')
    );

    const donationData = {

        donorName: formData.get('donorName'),

        donorEmail: currentUser
            ? currentUser.email
            : "",

        donorPhone: formData.get('donorPhone'),

        donorAddress: formData.get('donorAddress'),

        donorTown: formData.get('donorTown'),

        donorCity: formData.get('donorCity'),

        donorState: formData.get('donorState'),

        category: formData.get('category'),

        itemDescription: formData.get('itemDescription'),

        pickupDate: formData.get('pickupDate'),

        pickupTime: formData.get('pickupTime')
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/donations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donationData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        showNotification(
            "Donation submitted successfully!",
            "success"
        );

        donateForm.reset();

    } catch (error) {

        showNotification(
            error.message,
            "error"
        );
    }
}


// ===============================
// LOAD MY DONATIONS
// ===============================

async function loadMyDonations() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const donationsList =
        document.getElementById("donationsList");

    if (!donationsList) {
        console.error("donationsList element not found");
        return;
    }

    if (!currentUser || !currentUser.email) {
        donationsList.innerHTML =
            "<p>Please login first.</p>";
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/donations?email=${encodeURIComponent(currentUser.email)}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch donations"
            );
        }

        const donations = await response.json();

        if (donations.length === 0) {

            donationsList.innerHTML =
                "<p>No donations yet.</p>";

            return;
        }

        donationsList.innerHTML = donations.map(
            donation => `

            <div class="donation-card">

                <h3>
                    ${donation.category || "Donation"}
                </h3>

                <p>
                    <strong>Item:</strong>
                    ${donation.itemDescription || "N/A"}
                </p>

                <p>
                    <strong>Pickup Date:</strong>
                    ${donation.pickupDate || "N/A"}
                </p>

                <p>
                    <strong>Pickup Time:</strong>
                    ${donation.pickupTime || "N/A"}
                </p>

                <p>
                    <strong>Donor:</strong>
                    ${donation.donorName || "N/A"}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${donation.donorPhone || "N/A"}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${donation.donorAddress || "N/A"}
                </p>

                <hr>

            </div>

        `
        ).join("");

    } catch (error) {

        console.error(
            "Error loading donations:",
            error
        );

        donationsList.innerHTML =
            "<p>Unable to load donations.</p>";
    }
}


// ===============================
// REQUEST HANDLER
// ===============================

async function handleRequest(e) {

    e.preventDefault();

    const formData = new FormData(requestForm);

    const requestData = {

        receiverName:
            formData.get('receiverName'),

        receiverPhone:
            formData.get('receiverPhone'),

        wantedItems:
            formData.get('wantedItems')
    };

    try {

        const response = await fetch(
            "http://localhost:5000/api/requests",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        showNotification(
            "Request submitted successfully!",
            "success"
        );

        requestForm.reset();

    } catch (error) {

        showNotification(
            error.message,
            "error"
        );
    }
}


// ===============================
// LOGOUT
// ===============================

function handleLogout() {

    localStorage.removeItem('currentUser');

    // Hide navigation
    if (mainNav) {
        mainNav.style.display = 'none';
    }

    // Hide user profile
    if (userProfile) {
        userProfile.style.display = 'none';
    }

    // Show login page
    if (loginSection) {
        loginSection.style.display = 'block';
    }

    // Hide register
    if (registerSection) {
        registerSection.style.display = 'none';
    }

    // Hide home
    hideHomePage();

    // Hide all functional sections
    showSection(null);

    showNotification(
        'Logged out successfully!',
        'success'
    );
}


// ===============================
// CATEGORY CHANGE HANDLER
// ===============================

function handleCategoryChange(e) {

    const category = e.target.value;

    const commonFields =
        document.getElementById('commonFields');

    const foodFields =
        document.getElementById('foodFields');

    // Hide all category-specific fields
    if (commonFields) {
        commonFields.style.display = 'none';
    }

    if (foodFields) {
        foodFields.style.display = 'none';
    }

    // Show common fields
    if (category) {

        if (commonFields) {
            commonFields.style.display = 'block';
        }

        // Show food fields
        if (category === 'Food') {

            if (foodFields) {
                foodFields.style.display = 'block';
            }
        }
    }
}


// ===============================
// PICKUP ADDRESS CHANGE HANDLER
// ===============================

function handlePickupAddressChange(e) {

    const pickupAddress = e.target.value;

    const customAddressField =
        document.getElementById('customAddressField');

    if (pickupAddress === 'customAddress') {

        if (customAddressField) {
            customAddressField.style.display = 'block';
        }

    } else {

        if (customAddressField) {
            customAddressField.style.display = 'none';
        }
    }
}


// ===============================
// NOTIFICATION SYSTEM
// ===============================

function showNotification(
    message,
    type = 'info'
) {

    const notifications =
        document.getElementById('notifications');

    const globalNotification =
        document.getElementById('globalNotification');

    if (globalNotification) {

        globalNotification.textContent =
            message;

        globalNotification.style.display =
            'block';

        globalNotification.style.background =
            type === 'success'
                ? '#2e8b57'
                : type === 'error'
                    ? '#ff4444'
                    : '#333';

        globalNotification.style.color =
            'white';

        setTimeout(() => {

            globalNotification.style.display =
                'none';

        }, 3500);
    }

    if (!notifications) {
        return;
    }

    const notification =
        document.createElement('div');

    notification.className =
        `notification-item ${type}`;

    notification.innerHTML = `

        <div class="message">
            ${message}
        </div>

        <div class="timestamp">
            ${new Date().toLocaleTimeString()}
        </div>

    `;

    notifications.appendChild(
        notification
    );

    setTimeout(() => {

        notification.remove();

    }, 5000);
}


// ===============================
// LOCATION FUNCTIONALITY
// ===============================

function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const locationDisplay =
                    document.getElementById(
                        'locationDisplay'
                    );

                if (locationDisplay) {

                    locationDisplay.textContent =
                        `Location: ${position.coords.latitude}, ${position.coords.longitude}`;
                }

                showNotification(
                    'Location shared successfully!',
                    'success'
                );
            },

            function (error) {

                showNotification(
                    'Error getting location: ' +
                    error.message,
                    'error'
                );
            }
        );

    } else {

        showNotification(
            'Geolocation is not supported by this browser.',
            'error'
        );
    }
}


// ===============================
// GOOGLE MAPS
// ===============================

let map;
let marker;
let currentMapModal = null;


function initMap() {

    console.log(
        'Google Maps API loaded'
    );

    initializeMapModals();
}


function initializeMapModals() {

    const mapButtons = [

        {
            button: 'openMapDonate',
            modal: 'mapModalDonate',
            canvas: 'mapCanvasDonate',
            confirm: 'confirmLocationDonate'
        },

        {
            button: 'openMapRequest',
            modal: 'mapModalRequest',
            canvas: 'mapCanvasRequest',
            confirm: 'confirmLocationRequest'
        },

        {
            button: 'openMapCustom',
            modal: 'mapModalCustom',
            canvas: 'mapCanvasCustom',
            confirm: 'confirmLocationCustom'
        }

    ];


    mapButtons.forEach(
        ({ button, modal, canvas, confirm }) => {

            const openButton =
                document.getElementById(button);

            const modalElement =
                document.getElementById(modal);

            const canvasElement =
                document.getElementById(canvas);

            const confirmButton =
                document.getElementById(confirm);

            const closeButton =
                modalElement?.querySelector(
                    '.map-close-button'
                );


            if (
                openButton &&
                modalElement &&
                canvasElement
            ) {

                openButton.addEventListener(
                    'click',
                    () =>
                        openMapModal(
                            modalElement,
                            canvasElement
                        )
                );


                if (closeButton) {

                    closeButton.addEventListener(
                        'click',
                        () =>
                            closeMapModal(
                                modalElement
                            )
                    );
                }


                if (confirmButton) {

                    confirmButton.addEventListener(
                        'click',
                        () =>
                            confirmMapLocation(
                                modalElement
                            )
                    );
                }
            }
        }
    );


    // Close modal when clicking outside
    window.addEventListener(
        'click',
        function (event) {

            const modals =
                document.querySelectorAll(
                    '.map-modal'
                );

            modals.forEach(
                function (modal) {

                    if (event.target === modal) {

                        closeMapModal(modal);
                    }
                }
            );
        }
    );
}


function openMapModal(
    modalElement,
    canvasElement
) {

    currentMapModal =
        modalElement;

    modalElement.style.display =
        'block';


    if (!map) {

        map =
            new google.maps.Map(
                canvasElement,
                {
                    center: {
                        lat: 20.5937,
                        lng: 78.9629
                    },
                    zoom: 5
                }
            );


        map.addListener(
            'click',
            function (event) {

                placeMarker(
                    event.latLng
                );
            }
        );

    } else {

        map.setMap(null);

        map =
            new google.maps.Map(
                canvasElement,
                {
                    center: {
                        lat: 20.5937,
                        lng: 78.9629
                    },
                    zoom: 5
                }
            );


        map.addListener(
            'click',
            function (event) {

                placeMarker(
                    event.latLng
                );
            }
        );
    }
}


function placeMarker(latLng) {

    if (marker) {

        marker.setMap(null);
    }


    marker =
        new google.maps.Marker(
            {
                position: latLng,
                map: map,
                draggable: true
            }
        );


    const infoWindow =
        new google.maps.InfoWindow(
            {
                content:
                    `Selected Location: ${latLng.lat().toFixed(6)}, ${latLng.lng().toFixed(6)}`
            }
        );


    marker.addListener(
        'click',
        function () {

            infoWindow.open(
                map,
                marker
            );
        }
    );
}


// ===============================
// CONFIRM MAP LOCATION
// ===============================

function confirmMapLocation(
    modalElement
) {

    if (marker) {

        const position =
            marker.getPosition();

        const lat =
            position.lat();

        const lng =
            position.lng();


        showNotification(
            `Location selected: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
            'success'
        );


        const donateSection =
            document.getElementById(
                'donateSection'
            );


        if (
            donateSection &&
            donateSection.style.display !== 'none'
        ) {

            let coordField =
                document.getElementById(
                    'donateCoords'
                );


            if (!coordField) {

                const input =
                    document.createElement(
                        'input'
                    );

                input.type = 'text';

                input.id =
                    'donateCoords';

                input.name =
                    'donateCoords';

                input.readOnly =
                    true;

                input.style.marginTop =
                    '8px';

                input.style.background =
                    '#f8f8f8';

                input.style.border =
                    '1.5px solid #2e8b57';

                input.style.color =
                    '#2e8b57';

                input.style.fontWeight =
                    'bold';

                input.style.width =
                    '100%';

                input.value =
                    `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;


                const addressField =
                    donateSection.querySelector(
                        'input[name="donorAddress"]'
                    );


                if (
                    addressField &&
                    addressField.parentNode
                ) {

                    addressField.parentNode.insertBefore(
                        input,
                        addressField.nextSibling
                    );

                } else {

                    donateSection.appendChild(
                        input
                    );
                }

            } else {

                coordField.value =
                    `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
            }
        }


        closeMapModal(
            modalElement
        );

    } else {

        showNotification(
            'Please select a location on the map first',
            'error'
        );
    }
}


// ===============================
// CLOSE MAP MODAL
// ===============================

function closeMapModal(
    modalElement
) {

    modalElement.style.display =
        'none';

    currentMapModal =
        null;
}


// ===============================
// UTILITY FUNCTIONS
// ===============================

function formatDate(date) {

    return new Date(
        date
    ).toLocaleDateString();
}


function formatTime(time) {

    return time;
}