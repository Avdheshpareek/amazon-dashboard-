const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

if (getToken()) {
  window.location.href = '/dashboard.html';
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const data = await apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    setAuth(data);
    message.textContent = 'Login successful. Redirecting...';
    window.location.href = '/dashboard.html';
  } catch (error) {
    message.textContent = error.message;
  }
});
