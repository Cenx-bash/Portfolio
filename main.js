document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        welcomePopup: document.getElementById('welcome-popup'),
        closeWelcomePopup: document.getElementById('close-welcome-popup'),
        settingsPopup: document.getElementById('settings-popup'),
        settingsBtn: document.getElementById('settings-btn'),
        closeSettingsPopup: document.getElementById('close-settings-popup'),
        sideMenu: document.getElementById('side-menu'),
        closeMenuBtn: document.getElementById('close-menu'),
        darkModeToggle: document.getElementById('dark-mode-toggle'),
        sideMenuToggle: document.getElementById('dark-mode-toggle-settings'),
        body: document.body,
        header: document.querySelector('header.header'),
        navLinks: document.querySelectorAll('.nav-links a'),
        form: document.getElementById('contactForm'),
        thankYouMessage: document.getElementById('thankYouMessage'),
    };

    // Show welcome popup on page load
    window.onload = () => {
        if (elements.welcomePopup) elements.welcomePopup.classList.add('active');
        const darkModePreference = localStorage.getItem('dark-mode');
        if (darkModePreference === 'enabled') {
            enableDarkMode();
            if (elements.darkModeToggle) elements.darkModeToggle.checked = true;
            if (elements.sideMenuToggle) elements.sideMenuToggle.checked = true;
        }
    };

    // Close welcome popup
    elements.closeWelcomePopup?.addEventListener('click', () => {
        elements.welcomePopup.classList.remove('active');
    });

    // Open settings popup
    elements.settingsBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        elements.settingsPopup.classList.add('active'); // Show the settings popup
    });

    // Close settings popup
    elements.closeSettingsPopup?.addEventListener('click', () => {
        elements.settingsPopup.classList.remove('active');
    });

    // Close side menu
    elements.closeMenuBtn?.addEventListener('click', () => {
        elements.sideMenu.classList.remove('open');
    });

    // Toggle dark mode
    elements.darkModeToggle?.addEventListener('change', () => {
        toggleDarkMode(elements.darkModeToggle.checked);
    });

    elements.sideMenuToggle?.addEventListener('change', () => {
        const isChecked = elements.sideMenuToggle.checked;
        toggleDarkMode(isChecked);
        if (elements.darkModeToggle) elements.darkModeToggle.checked = isChecked;
    });

    // Simulate sign-up payment
    document.querySelectorAll('.sign-up').forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-plan');
            const amount = button.getAttribute('data-amount');
            simulatePayment(service, amount);
        });
    });

    // Handle form submission
    elements.form.addEventListener('submit', handleFormSubmit);

    // Toggle class helper function
    const toggleClass = (element, className) => {
        element.classList.toggle(className);
    };

    // Toggle dark mode function
    const toggleDarkMode = (isEnabled) => {
        isEnabled ? enableDarkMode() : disableDarkMode();
    };

    // Enable dark mode
    const enableDarkMode = () => {
        elements.body.classList.add('dark');
        elements.header.classList.add('dark');
        elements.navLinks.forEach(link => link.classList.add('dark'));
        elements.sideMenu.classList.add('dark');
        localStorage.setItem('dark-mode', 'enabled');
    };

    // Disable dark mode
    const disableDarkMode = () => {
        elements.body.classList.remove('dark');
        elements.header.classList.remove('dark');
        elements.navLinks.forEach(link => link.classList.remove('dark'));
        elements.sideMenu.classList.remove('dark');
        localStorage.setItem('dark-mode', 'disabled');
    };

    // Simulate payment function
    const simulatePayment = (service, amount) => {
        alert(`🎉 Payment Successful!\n\nYou have successfully subscribed to the ${service} plan for $${amount} per month!\n\nThank you for choosing us!`);
    };

    // Handle contact form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            elements.thankYouMessage.classList.remove('hidden');
            elements.form.reset();
            elements.thankYouMessage.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('Please fill in all fields before submitting.');
        }
    };
});
