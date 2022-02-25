window.addEventListener('DOMContentLoaded', init);

function init(){
    const menuButtons = document.querySelectorAll('#menu button');
    const dialogAlert = document.querySelector('#dialog-alert');
    const dialogConfirm = document.querySelector('#dialog-confirm');
    const dialogPrompt = document.querySelector('#dialog-prompt');

    const output = document.querySelector('output');


    for(let i=0; i<menuButtons.length; i++){
        if(menuButtons[i].innerText==='Alert'){
            menuButtons[i].addEventListener('click', ()=>{
                output.innerHTML = null;
                dialogAlert.showModal();
            });
        }
        else if (menuButtons[i].innerText==='Confirm'){
            menuButtons[i].addEventListener('click', ()=>{
                output.innerHTML = null;
                dialogConfirm.showModal();
            });
        }
        else if (menuButtons[i].innerText==='Prompt'){
            menuButtons[i].addEventListener('click', ()=>{
                output.innerHTML = null;
                dialogPrompt.showModal();
            });
        }
    }

    const closeAlert = document.querySelector('#close-alert');
    closeAlert.addEventListener('click', ()=>{
        dialogAlert.close();
    });

    const cancelConfirm = document.querySelector('#cancel-confirm');
    const okConfirm = document.querySelector('#ok-confirm');
    cancelConfirm.addEventListener('click', ()=>{
        dialogConfirm.close();
        output.innerHTML = 'Confirm result: false';
    });

    okConfirm.addEventListener('click', ()=>{
        dialogConfirm.close();
        output.innerHTML = 'Confirm result: true';
    });

    const cancelPrompt = document.querySelector('#cancel-prompt');
    const okPrompt = document.querySelector('#ok-prompt');
    const inputPrompt = document.querySelector('#name');
    cancelPrompt.addEventListener('click', ()=>{
        dialogPrompt.close();
        output.innerHTML = 'User didn\'t enter anything';
    });

    okPrompt.addEventListener('click', ()=>{
        dialogPrompt.close();
        let cleanVal = DOMPurify.sanitize(inputPrompt.value);
        if (cleanVal){
            output.innerHTML = cleanVal;
            output.innerHTML = `Prompt result: ${cleanVal}`;
        }
        else{
            output.innerHTML = 'User didn\'t enter anything';
        }
    });

}