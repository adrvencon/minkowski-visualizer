const toggleMenuButton = document.getElementById('toggleMenu');
const menu = document.getElementById('menu');

let isMenuVisible = false;

toggleMenuButton.addEventListener('click', () => {
    // Alternar la visibilidad del menú.
    isMenuVisible = !isMenuVisible;
    menu.style.display = isMenuVisible ? 'flex' : 'none';
    
    // Cambiar la flecha.
    const icon = toggleMenuButton.querySelector('i');
    icon.classList.toggle('fa-chevron-left');
    icon.classList.toggle('fa-chevron-right');
});