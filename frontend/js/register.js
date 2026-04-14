const registerForm = document.getElementById('registerForm');
const message = document.getElementById('message');

if (getToken()) {
  window.location.href = '/dashboard.html';
}

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const data = await apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });

    setAuth(data);
    message.textContent = 'Registration successful. Redirecting...';
    window.location.href = '/dashboard.html';
  } catch (error) {
    message.textContent = error.message;
  }
});
