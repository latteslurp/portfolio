window.addEventListener('DOMContentLoaded', init);

function init(){
    changeDisplay();
    renderSlide();
    updateSlide();
}


function changeDisplay(){
    const projectsContainer = document.querySelector('.projects-container');
    projectsContainer.classList.remove('projects-container');
    projectsContainer.classList.add('projects-container-js');

    const projectElements = document.querySelectorAll('.project-element-grid-container-2');
    
    for(let i=0; i<projectElements.length; i++){
        projectElements[i].classList.remove('project-element-grid-container-2');
        projectElements[i].classList.add('project-element-grid-container-2-js');
    }

    const aPrevSlide = document.querySelector('a.prev-slide');
    aPrevSlide.classList.remove('prev-slide');
    aPrevSlide.classList.add('prev-slide-js');
    
    const aNextSlide = document.querySelector('a.next-slide');
    aNextSlide.classList.remove('next-slide');
    aNextSlide.classList.add('next-slide-js');

    const divSlideNumsHolder = document.querySelector('.slide-nums-holder');
    divSlideNumsHolder.classList.remove('slide-nums-holder');
    divSlideNumsHolder.classList.add('slide-nums-holder-js');
}

let slideIdx = 0;

function renderSlide(){
    const divProjects = document.querySelectorAll('.project-element-grid-container-2-js');
    const spanSlideNums = document.querySelectorAll('.slide-num');

    slideIdx %= divProjects.length;
    if (slideIdx < 0){
        slideIdx += divProjects.length
    }

    for(let i=0; i<divProjects.length; i++){
        divProjects[i].style.visibility = 'hidden';
        divProjects[i].classList.remove('fade-in');
    }

    for(let i=0; i<spanSlideNums.length; i++){
        spanSlideNums[i].classList.remove('active-slide');
    }

    divProjects[slideIdx].setAttribute('style', 'visibility:"visible"');
    divProjects[slideIdx].classList.add('fade-in');

    spanSlideNums[slideIdx].classList.add('active-slide');

}

function updateSlide(){
    const aPrevSlide = document.querySelector('a.prev-slide-js');
    const aNextSlide = document.querySelector('a.next-slide-js');

    aPrevSlide.addEventListener('click', ()=>{
        slideIdx -= 1;
        renderSlide();
    });
    
    aNextSlide.addEventListener('click', ()=>{
        slideIdx += 1;
        renderSlide();
    });

    const spanSlideNums = document.querySelectorAll('.slide-num');
    for(let i=0; i<spanSlideNums.length; i++){
        spanSlideNums[i].addEventListener('click', ()=>{
            slideIdx = i;
            renderSlide();
        });
    }
}