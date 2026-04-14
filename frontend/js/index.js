const skillsContainer = document.getElementById('skillsContainer');
const statusMsg = document.getElementById('statusMsg');

function updateAuthNav() {
  const token = getToken();
  const loginLink = document.getElementById('loginLink');
  const registerLink = document.getElementById('registerLink');
  const logoutBtn = document.getElementById('logoutBtn');

  if (token) {
    loginLink?.classList.add('hidden');
    registerLink?.classList.add('hidden');
    logoutBtn?.classList.remove('hidden');
    bindLogoutButton('logoutBtn');
  }
}

function createSkillCard(skill) {
  return `
    <article class="skill-card">
      <h3>${skill.title}</h3>
      <p>${skill.description}</p>
      <p><strong>Price:</strong> $${Number(skill.price).toFixed(2)}</p>
      <p><strong>Seller:</strong> ${skill.userId?.name || 'Unknown'}</p>
    </article>
  `;
}

async function loadSkills() {
  try {
    statusMsg.textContent = 'Loading skills...';
    const skills = await apiRequest('/skills');

    if (!skills.length) {
      skillsContainer.innerHTML = '<p>No skills listed yet.</p>';
      statusMsg.textContent = '';
      return;
    }

    skillsContainer.innerHTML = skills.map(createSkillCard).join('');
    statusMsg.textContent = `Showing ${skills.length} skill listing(s).`;
  } catch (error) {
    statusMsg.textContent = error.message;
  }
}

updateAuthNav();
loadSkills();
