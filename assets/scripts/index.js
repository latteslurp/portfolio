window.addEventListener('DOMContentLoaded', init);

let indexPortfolio_slideIdx = 0;

function init(){
    /* Project slides */

    toggleNav();

    if (window.innerWidth/window.innerHeight >= 1.3){
        changeDisplay();
        renderSlide();
        updateSlide(indexPortfolio_slideIdx);

    }
    else{
        defaultDisplay();
    }

    window.addEventListener('resize', updateDisplayWindowResize, {passive:true});
}

function toggleNav(){
    const checkbox = document.querySelector('#mobile-menu');
    const navLis = document.querySelectorAll('.nav-ul-mobile li');
    navLis.forEach((el)=>{
        el.addEventListener('click', ()=>{
            checkbox.checked = false;
        });
    });
}

function updateDisplayWindowResize(){
    if (window.innerWidth/window.innerHeight >= 1.3){
        changeDisplay();
        renderSlide();
        updateSlide(indexPortfolio_slideIdx);

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

    const spanPrevSlide = document.querySelector('.slider span');
    if (spanPrevSlide.classList.contains('prev-slide-js')){
        spanPrevSlide.classList.remove('prev-slide-js');
    }
    spanPrevSlide.classList.add('prev-slide');
    
    const spanNextSlide = document.querySelector('.slider span:nth-child(2)');
    if (spanNextSlide.classList.contains('next-slide-js')){
        spanNextSlide.classList.remove('next-slide-js');
    }
    spanNextSlide.classList.add('next-slide');

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

    const spanPrevSlide = document.querySelector('.slider span:nth-child(1)');
    if (spanPrevSlide.classList.contains('prev-slide')){
        spanPrevSlide.classList.remove('prev-slide');
    }
    spanPrevSlide.classList.add('prev-slide-js');
    
    const spanNextSlide = document.querySelector('.slider span:nth-child(2)');
    if (spanNextSlide.classList.contains('next-slide')){
        spanNextSlide.classList.remove('next-slide');
    }
    spanNextSlide.classList.add('next-slide-js');

    const divSlideNumsHolder = document.querySelector('.slider section + div');
    if (divSlideNumsHolder.classList.contains('slide-nums-holder')){
        divSlideNumsHolder.classList.remove('slide-nums-holder');
    }
    divSlideNumsHolder.classList.add('slide-nums-holder-js');
}

function renderSlide(){
    const divProjects = document.querySelectorAll('.slider section > div');
    const spanSlideNums = document.querySelectorAll('.slider div span');

    indexPortfolio_slideIdx = Math.abs(indexPortfolio_slideIdx % divProjects.length);

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

    divProjects[indexPortfolio_slideIdx].setAttribute('style', 'visibility:"visible"');
    divProjects[indexPortfolio_slideIdx].classList.add('fade-in');

    spanSlideNums[indexPortfolio_slideIdx].classList.add('active-slide');

}

function updateSlide(idx){

    indexPortfolio_slideIdx = idx;
    renderSlide();
}

function moveSlide(num){
    indexPortfolio_slideIdx += num;
    renderSlide();
}