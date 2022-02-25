window.addEventListener('DOMContentLoaded', init);

function init(){
    updateSlide();
}

let slideIdx = 0;

function renderSlide(){
    const divProjects = document.querySelectorAll('.project-element-grid-container-2');
    const spanSlideNums = document.querySelectorAll('.slide-num');
    
    console.log(`renderSlide(); idx = ${slideIdx}`);
    slideIdx %= divProjects.length;
    if (slideIdx < 0){
        slideIdx += divProjects.length
    }
    console.log(`renderSlide(); idx = ${slideIdx}`);

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
    const aPrevSlide = document.querySelector('a.prev-slide');
    const aNextSlide = document.querySelector('a.next-slide');

    aPrevSlide.addEventListener('click', ()=>{
        console.log('clicked');
        slideIdx -= 1;
        renderSlide();
    });
    
    aNextSlide.addEventListener('click', ()=>{
        console.log('clicked');
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