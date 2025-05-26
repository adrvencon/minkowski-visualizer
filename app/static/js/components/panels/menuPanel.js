const toggleMenuButton = document.getElementById('toggleMenu');
const menu = document.getElementById('menu');

let isMenuVisible = false;

document.getElementById('toggleMenu').addEventListener('click', function() {
    document.getElementById('menuContainer').classList.toggle('active');
});