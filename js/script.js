// Rating logic
const notification = document.getElementById('notification');
let hideTimeout;

function showNotification(message) {
  notification.textContent = message;
  notification.classList.add('show');
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// add event listeners for each project-review div
document.querySelectorAll('.project-review').forEach(container => {
  container.addEventListener('change', event => {
    if (event.target.matches('input[type="radio"]')) {
      const rating = event.target.value;
      
      // Get the closest .project element
      const projectEl = event.target.closest('.project');
      const projectNameEl = projectEl.querySelector('.project-title');
      const projectName   = projectNameEl
        ? projectNameEl.textContent.trim()
        : 'this project';
      
      message = `You rated "${projectName}" ${rating} star${parseInt(rating) > 1 ? 's' : ''}!`;
      if (rating==1){
        message = "🥚 "+ message +" 🥚";
      } else if (rating ==2 ){
        message = "🐣 "+ message +" 🐣";
      } else if (rating == 3){
        message = "🔥🐣🔥 "+ message +" 🔥🐣🔥";
      } else{
        message = "🤔 "+ message +" 🤔";
      }

      showNotification(message);
    }
  });
}); 

// work with me form logic
// wait until DOM is parsed
document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('wwm-form-grid');
  const container= document.getElementById('work-with-me-form');

  // simple email regex (covers 99% of valid addresses)
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    // grab values
    const name       = form.querySelector('#wwm-name').value.trim();
    const email      = form.querySelector('#wwm-email').value.trim();
    const ageRaw     = form.querySelector('#wwm-age').value.trim();
    const occupation = form.querySelector('#wwm-occupation').value;

    const age = parseInt(ageRaw, 10);

    // validate
    const errors = [];
    if (!name)       errors.push('Name is required.');
    if (!email || !isValidEmail(email))
                     errors.push('Please enter a valid email address.');
    if (!ageRaw || isNaN(age) || age < 1 || age > 98)
                     errors.push('Age must be a number between 1 and 98.');
    if (!occupation) errors.push('Please select your occupation.');

    if (errors.length) {
      // You could show these inline; for brevity we just alert:
      alert(errors.join('\n'));
      return;
    }

    // build data object
    const formData = { name, email, age, occupation };
    console.log('Work‑With‑Me data:', formData);

    // destroy the form
    form.remove();

    // inject the success message + contact info
    container.insertAdjacentHTML('beforeend', `
      <p>
        Hello <strong>${name}</strong> (age ${age}),<br>
        with email <a href="mailto:${email}">${email}</a>,<br>
        you could work with me as a <strong>${occupation}</strong>!
      </p>
      <br>
      <p>
        My info:<br>
        Full name: Diego Torres Durante<br>
        Email: <a href="mailto:diegotorresdurante@gmail.com">
                 diegotorresdurante@gmail.com
               </a>
      </p>
      <br>
      <button id="contact-btn" class="submit-btn">
        Email Me
      </button>
    `);

    // wire up the mailto button
    document.getElementById('contact-btn')
      .addEventListener('click', () => {
        window.location.href = `mailto:diegotorresdurante@gmail.com`;
      });
  });
});
