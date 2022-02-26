window.addEventListener('DOMContentLoaded', init);

let HW4_slideIdx = 0;

function init(){
    if (window.innerWidth/window.innerHeight >= 1.3){
        changeDisplay();
        renderSlide();
        updateSlide(HW4_slideIdx);

    }
    else{
        defaultDisplay();
    }

    window.addEventListener('resize', updateDisplayWindowResize);
}

function updateDisplayWindowResize(){
    if (window.innerWidth/window.innerHeight >= 1.3){
        changeDisplay();
        renderSlide();
        updateSlide(HW4_slideIdx);

    }
    else{
        defaultDisplay();
    }
}

function defaultDisplay(){
    const projectsContainer = document.querySelector('.slider section');
    if(projectsContainer.classList.contains('projects-container-js')){
        projectsContainer.classList.remove('projects-container-js');
    }
    projectsContainer.classList.add('projects-container');

    const projectElements = document.querySelectorAll('.projects-container > div');
    
    for(let i=0; i<projectElements.length; i++){
        if (projectElements[i].classList.contains('project-element-grid-container-2-js')){
            projectElements[i].classList.remove('project-element-grid-container-2-js');
        }
        projectElements[i].classList.add('project-element-grid-container-2');
        projectElements[i].style.visibility = 'visible';
    }

    const aPrevSlide = document.querySelector('.slider a');
    if (aPrevSlide.classList.contains('prev-slide-js')){
        aPrevSlide.classList.remove('prev-slide-js');
    }
    aPrevSlide.classList.add('prev-slide');
    
    const aNextSlide = document.querySelector('.slider a:nth-child(2)');
    if (aNextSlide.classList.contains('next-slide-js')){
        aNextSlide.classList.remove('next-slide-js');
    }
    aNextSlide.classList.add('next-slide');

    const divSlideNumsHolder = document.querySelector('.slider section + div');
    if (divSlideNumsHolder.classList.contains('slide-nums-holder-js')){
        divSlideNumsHolder.classList.remove('slide-nums-holder-js');
    }
    divSlideNumsHolder.classList.add('slide-nums-holder');

}


function changeDisplay(){
    const projectsContainer = document.querySelector('.slider section');
    if(projectsContainer.classList.contains('projects-container')){
        projectsContainer.classList.remove('projects-container');
    }
    projectsContainer.classList.add('projects-container-js');

    const projectElements = document.querySelectorAll('.project-element-grid-container-2');
    
    for(let i=0; i<projectElements.length; i++){
        if (projectElements[i].classList.contains('project-element-grid-container-2')){
            projectElements[i].classList.remove('project-element-grid-container-2');
        }
        projectElements[i].classList.add('project-element-grid-container-2-js');
    }

    const aPrevSlide = document.querySelector('.slider a:nth-child(1)');
    if (aPrevSlide.classList.contains('prev-slide')){
        aPrevSlide.classList.remove('prev-slide');
    }
    aPrevSlide.classList.add('prev-slide-js');
    
    const aNextSlide = document.querySelector('.slider a:nth-child(2)');
    if (aNextSlide.classList.contains('next-slide')){
        aNextSlide.classList.remove('next-slide');
    }
    aNextSlide.classList.add('next-slide-js');

    const divSlideNumsHolder = document.querySelector('.slider section + div');
    if (divSlideNumsHolder.classList.contains('slide-nums-holder')){
        divSlideNumsHolder.classList.remove('slide-nums-holder');
    }
    divSlideNumsHolder.classList.add('slide-nums-holder-js');
}

function renderSlide(){
    const divProjects = document.querySelectorAll('.slider section > div');
    const spanSlideNums = document.querySelectorAll('.slider div span');

    HW4_slideIdx = Math.abs(HW4_slideIdx % divProjects.length);

    for(let i=0; i<divProjects.length; i++){
        divProjects[i].style.visibility = 'hidden';
        if(divProjects[i].classList.contains('fade-in')){
            divProjects[i].classList.remove('fade-in');
        }
    }

    for(let i=0; i<spanSlideNums.length; i++){
        if(spanSlideNums[i].classList.contains('active-slide')){
            spanSlideNums[i].classList.remove('active-slide');
        }
    }

    divProjects[HW4_slideIdx].setAttribute('style', 'visibility:"visible"');
    divProjects[HW4_slideIdx].classList.add('fade-in');

    spanSlideNums[HW4_slideIdx].classList.add('active-slide');

}

function updateSlide(idx){

    HW4_slideIdx = idx;
    renderSlide();
}

function moveSlide(num){
    HW4_slideIdx += num;
    renderSlide();
}