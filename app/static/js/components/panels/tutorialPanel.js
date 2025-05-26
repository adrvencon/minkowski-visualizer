document.addEventListener('DOMContentLoaded', function() {
    const tutorialBtn = document.getElementById('tutorialBtn');
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    const closeTutorial = document.getElementById('closeTutorial');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const slides = document.querySelectorAll('.tutorial-slide');
    const indicatorsContainer = document.querySelector('.slide-indicators');
    
    let currentSlide = 0;

    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('slide-indicator');
            if(index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateSlide();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    createIndicators();
    
    tutorialBtn.addEventListener('click', () => {
        tutorialOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeTutorial.addEventListener('click', () => {
        tutorialOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        document.querySelectorAll('.slide-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
        nextBtn.innerHTML = currentSlide === slides.length - 1 
            ? 'Get Started!' 
            : 'Next <i class="fas fa-chevron-right"></i>';
    }
    
    function nextSlide() {
        if(currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        } else {
            tutorialOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    function prevSlide() {
        if(currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }
    
});