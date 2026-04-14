const skillForm = document.getElementById('skillForm');
const message = document.getElementById('message');
const mySkillsContainer = document.getElementById('mySkills');

const currentUser = getCurrentUser();
if (!getToken() || !currentUser) {
  window.location.href = '/login.html';
}

bindLogoutButton('logoutBtn');

function resetForm() {
  skillForm.reset();
  document.getElementById('skillId').value = '';
}

function editSkill(skill) {
  document.getElementById('skillId').value = skill._id;
  document.getElementById('title').value = skill.title;
  document.getElementById('description').value = skill.description;
  document.getElementById('price').value = skill.price;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteSkill(skillId) {
  if (!confirm('Delete this skill listing?')) return;

  try {
    await apiRequest(`/skills/${skillId}`, {
      method: 'DELETE',
      headers: authHeader()
    });
    message.textContent = 'Skill deleted.';
    await loadMySkills();
  } catch (error) {
    message.textContent = error.message;
  }
}

function renderMySkills(skills) {
  if (!skills.length) {
    mySkillsContainer.innerHTML = '<p>You have not added any skills yet.</p>';
    return;
  }

  mySkillsContainer.innerHTML = skills
    .map(
      (skill) => `
      <article class="skill-card">
        <h3>${skill.title}</h3>
        <p>${skill.description}</p>
        <p><strong>Price:</strong> $${Number(skill.price).toFixed(2)}</p>
        <div class="skill-actions">
          <button type="button" data-edit="${skill._id}">Edit</button>
          <button type="button" class="danger" data-delete="${skill._id}">Delete</button>
        </div>
      </article>
    `
    )
    .join('');

  skills.forEach((skill) => {
    document.querySelector(`[data-edit="${skill._id}"]`)?.addEventListener('click', () => editSkill(skill));
    document
      .querySelector(`[data-delete="${skill._id}"]`)
      ?.addEventListener('click', () => deleteSkill(skill._id));
  });
}

async function loadMySkills() {
  try {
    const skills = await apiRequest('/skills');
    const mySkills = skills.filter((skill) => skill.userId && skill.userId._id === currentUser.id);
    renderMySkills(mySkills);
  } catch (error) {
    message.textContent = error.message;
  }
}

skillForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const skillId = document.getElementById('skillId').value;
  const payload = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value.trim(),
    price: Number(document.getElementById('price').value)
  };

  try {
    if (skillId) {
      await apiRequest(`/skills/${skillId}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
      });
      message.textContent = 'Skill updated successfully.';
    } else {
      await apiRequest('/skills', {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
      });
      message.textContent = 'Skill created successfully.';
    }

    resetForm();
    await loadMySkills();
  } catch (error) {
    message.textContent = error.message;
  }
});

loadMySkills();
