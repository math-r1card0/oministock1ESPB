// Main JavaScript for OminiStock website

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Set up form validation if on contact page
  if (document.querySelector('.contato-form2')) {
    initFormValidation();
  }
  
  // Set up email subscription if on "em breve" page
  if (document.querySelector('.embreve-textinput')) {
    initEmailSubscription();
  }

  // Initialize mobile menu functionality
  initMobileMenu();
});

/**
 * Initialize page animations
 */
function initAnimations() {
  // Animate header elements with fade in
  const header = document.querySelector('[data-role="Header"]');
  if (header) {
    header.classList.add('animate__animated', 'animate__fadeIn');
    header.style.animationDuration = '1s';
  }
  
  // Animate hero section with fade in up
  const heroSection = document.querySelector('.home-hero');
  if (heroSection) {
    heroSection.classList.add('animate__animated', 'animate__fadeInUp');
    heroSection.style.animationDuration = '1.2s';
  }
  
  // Animate feature cards with staggered fade in
  const featureCards = document.querySelectorAll('[class*="feature-card-wrapper"]');
  featureCards.forEach((card, index) => {
    card.classList.add('animate__animated', 'animate__fadeInUp');
    card.style.animationDelay = `${0.2 * (index + 1)}s`;
    card.style.animationDuration = '0.8s';
  });
  
  // Add scroll animations to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    addScrollAnimation(section, 'animate__fadeIn', 0.3);
  });
  
  // Animate "Em breve" grid images with staggered fade in
  const gridImages = document.querySelectorAll('.embreve-grid img');
  gridImages.forEach((img, index) => {
    img.classList.add('animate__animated', 'animate__fadeIn');
    img.style.animationDelay = `${0.1 * (index % 6)}s`;
    img.style.animationDuration = '1s';
    img.style.opacity = '0';
    
    // This will trigger the animation when the element becomes visible
    addScrollAnimation(img, 'animate__fadeIn', 0);
  });
  
  // Animate contact profile section with fade in
  const profileSection = document.querySelector('.contato-profile');
  if (profileSection) {
    addScrollAnimation(profileSection, 'animate__fadeIn', 0.2);
  }
  
  // Animate FAQ cards with staggered fade in
  const blogCards = document.querySelectorAll('[class*="blog-card-wrapper"]');
  blogCards.forEach((card, index) => {
    card.style.opacity = '0';
    addScrollAnimation(card, 'animate__fadeInUp', 0.2 * index);
  });
}

/**
 * Add scroll animation to an element
 * @param {HTMLElement} element - The element to animate
 * @param {string} animationClass - The animation class to add
 * @param {number} delay - The delay before animation starts
 */
function addScrollAnimation(element, animationClass, delay) {
  if (!element) return;
  
  // Set initial opacity
  element.style.opacity = '0';
  
  // Create an observer for the element
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('animate__animated', animationClass);
          element.style.opacity = '1';
        }, delay * 1000);
        observer.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(element);
}

/**
 * Initialize form validation for the contact form
 */
function initFormValidation() {
  const form = document.querySelector('.contato-form2');
  const nameInput = form.querySelector('input[placeholder="Nome completo"]');
  const emailInput = form.querySelector('input[placeholder="anab@email.com"]');
  const messageInput = form.querySelector('textarea');
  const submitButton = document.querySelector('.primary-blue-button-wrapper');
  
  if (submitButton) {
    // Create a button if it doesn't exist
    if (!submitButton.querySelector('button')) {
      const button = document.createElement('button');
      button.className = 'primary-blue-button-button button ButtonSmall';
      button.innerHTML = '<span>ENVIAR</span>';
      submitButton.querySelector('div').appendChild(button);
    }
    
    // Add click event to the button
    const button = submitButton.querySelector('button') || submitButton;
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Reset previous error states
      resetFormErrors();
      
      // Validate the form
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Por favor, digite seu nome');
        isValid = false;
      }
      
      if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Por favor, digite um email válido');
        isValid = false;
      }
      
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Por favor, digite sua mensagem');
        isValid = false;
      }
      
      // If valid, show success message
      if (isValid) {
        submitForm(form);
      }
    });
  }
}

/**
 * Show error message for an input
 * @param {HTMLElement} input - The input element
 * @param {string} message - The error message
 */
function showError(input, message) {
  input.classList.add('error');
  input.style.borderColor = 'red';
  
  // Create error message
  const errorMsg = document.createElement('div');
  errorMsg.className = 'error-message';
  errorMsg.textContent = message;
  errorMsg.style.color = 'red';
  errorMsg.style.fontSize = '0.8rem';
  errorMsg.style.marginTop = '4px';
  
  // Insert error message after input
  input.parentNode.insertBefore(errorMsg, input.nextSibling);
  
  // Add shake animation to the input
  input.classList.add('animate__animated', 'animate__shakeX');
  
  // Remove animation class after animation completes
  setTimeout(() => {
    input.classList.remove('animate__shakeX');
  }, 1000);
}

/**
 * Reset all form errors
 */
function resetFormErrors() {
  const errorInputs = document.querySelectorAll('.error');
  errorInputs.forEach(input => {
    input.classList.remove('error');
    input.style.borderColor = '';
  });
  
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(msg => msg.remove());
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if email is valid
 */
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Handle form submission
 * @param {HTMLFormElement} form - The form element
 */
function submitForm(form) {
  // In a real application, this would send data to a server
  // For this example, we'll just show a success message
  
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message animate__animated animate__fadeIn';
  successMsg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
  successMsg.style.color = '#4CAF50';
  successMsg.style.padding = '15px';
  successMsg.style.marginTop = '15px';
  successMsg.style.backgroundColor = '#E8F5E9';
  successMsg.style.borderRadius = '4px';
  
  // Insert success message after form
  form.parentNode.insertBefore(successMsg, form.nextSibling);
  
  // Clear form
  form.reset();
  
  // Remove success message after 5 seconds
  setTimeout(() => {
    successMsg.classList.add('animate__fadeOut');
    setTimeout(() => {
      successMsg.remove();
    }, 1000);
  }, 5000);
}

/**
 * Initialize the email subscription on "Em breve" page
 */
function initEmailSubscription() {
  const emailInput = document.querySelector('.embreve-textinput');
  const submitButton = document.querySelector('.secondary-button-button');
  
  if (submitButton) {
    submitButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Reset previous error states
      const prevError = document.querySelector('.subscription-error');
      if (prevError) prevError.remove();
      
      const prevSuccess = document.querySelector('.subscription-success');
      if (prevSuccess) prevSuccess.remove();
      
      emailInput.style.borderColor = '';
      
      // Validate email
      if (!validateEmail(emailInput.value)) {
        // Show error
        emailInput.style.borderColor = 'red';
        emailInput.classList.add('animate__animated', 'animate__shakeX');
        
        const errorMsg = document.createElement('div');
        errorMsg.className = 'subscription-error';
        errorMsg.textContent = 'Por favor, digite um email válido';
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '8px';
        
        const container = document.querySelector('.embreve-container4');
        container.appendChild(errorMsg);
        
        setTimeout(() => {
          emailInput.classList.remove('animate__shakeX');
        }, 1000);
        
        return;
      }
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'subscription-success animate__animated animate__fadeIn';
      successMsg.textContent = 'Email registrado! Avisaremos quando as novas funcionalidades estiverem disponíveis.';
      successMsg.style.color = '#4CAF50';
      successMsg.style.padding = '10px';
      successMsg.style.marginTop = '12px';
      successMsg.style.fontSize = '0.9rem';
      
      const container = document.querySelector('.embreve-container4');
      container.appendChild(successMsg);
      
      // Clear input
      emailInput.value = '';
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.classList.add('animate__fadeOut');
        setTimeout(() => {
          successMsg.remove();
        }, 1000);
      }, 5000);
    });
  }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const burgerMenu = document.querySelector('[data-role="BurgerMenu"]');
  const mobileMenu = document.querySelector('[data-role="MobileMenu"]');
  const closeMenu = document.querySelector('[data-role="CloseMobileMenu"]');
  
  if (burgerMenu && mobileMenu) {
    // Initially hide the mobile menu
    mobileMenu.style.display = 'none';
    
    // Toggle menu on burger click
    burgerMenu.addEventListener('click', function() {
      mobileMenu.style.display = 'flex';
      mobileMenu.classList.add('animate__animated', 'animate__fadeIn');
      mobileMenu.style.animationDuration = '0.3s';
    });
    
    // Close menu on close button click
    if (closeMenu) {
      closeMenu.addEventListener('click', function() {
        mobileMenu.classList.add('animate__fadeOut');
        setTimeout(() => {
          mobileMenu.style.display = 'none';
          mobileMenu.classList.remove('animate__fadeOut');
        }, 300);
      });
    }
  }
}