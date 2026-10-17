document.addEventListener('DOMContentLoaded', () => {
  // Set copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('project-form');
  const btnWa = document.getElementById('submit-wa');
  const btnMail = document.getElementById('submit-mail');

  function getFormData() {
    const name = document.getElementById('name').value.trim();
    const details = document.getElementById('details').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!name || !details || !description) {
      alert('Please fill out all required fields.');
      return null;
    }
    return { name, details, description };
  }

  function buildMessage(data) {
    return `New Project Enquiry\n\nName: ${data.name}\nDetails: ${data.details}\n\nDescription:\n${data.description}`;
  }

  if (btnWa) {
    btnWa.addEventListener('click', () => {
      const data = getFormData();
      if (!data) return;
      const text = encodeURIComponent(buildMessage(data));
      window.open(`https://wa.me/2349063200718?text=${text}`, '_blank');
    });
  }

  if (btnMail) {
    btnMail.addEventListener('click', () => {
      const data = getFormData();
      if (!data) return;
      const subject = encodeURIComponent(`Project Enquiry from ${data.name}`);
      const body = encodeURIComponent(buildMessage(data));
      window.location.href = `mailto:shehulhadi00@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Prevent default form submission (since we use custom buttons)
  if (form) {
    form.addEventListener('submit', (e) => e.preventDefault());
  }
});
