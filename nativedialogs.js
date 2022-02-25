

window.addEventListener('DOMContentLoaded', init);

function init(){
    const body = document.querySelector('body');
    const buttons = document.querySelectorAll('button');
    let val;
    let output = document.createElement('output');
    body.appendChild(output);
    for(const button of buttons){
        button.addEventListener('click', ()=>{
            output.innerHTML = null;
            setTimeout(()=>{
                if (button.textContent === 'Alert'){
                    alert('Alert Pressed');
                }
                else if (button.textContent === 'Confirm'){
                    val = confirm('Confirm or not');
                    output.innerHTML = `Confirm result: ${val}`;
                }
                else if (button.textContent === 'Prompt'){
                    val = prompt('Enter prompt');
                    if (val){
                        output.innerHTML = `The value returned by the confirm method is : ${val}`
                    }
                    else{
                        output.innerHTML = `User didn\’t enter anything`;
                    }
                }
                else if (button.textContent === 'Safer Prompt'){
                    val = prompt('Enter prompt');
                    if (val){
                        let cleanVal = DOMPurify.sanitize(val);
                        output.innerHTML = cleanVal;
                    }
                    else{
                        output.innerHTML = `User didn\’t enter anything`;
                    }
                }
            });
        }, 1);
    }
}