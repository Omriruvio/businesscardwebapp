const randomAvatarLength = 12;

function getRandomAvatarUrl() {
  let randomIndex = Math.floor(Math.random() * randomAvatarLength) + 1;
  let randomAvatarUrl = "./images/random-avatar-" + randomIndex + ".svg";
  return randomAvatarUrl;
}

function openModal(modal) {
  modal.classList.add('modal_active');
}

function closeModal(modal) {
  modal.classList.remove('modal_active');
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export { getRandomAvatarUrl, openModal, closeModal, getRandomColor }