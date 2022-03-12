window.addEventListener('DOMContentLoaded', init);


function init(){
    setReadOnlyDate();

    const xhrRadioBtn = document.querySelector('input[type="radio"][value="XMLHttpRequest"]');
    const fetchRadioBtn = document.querySelector('input[type="radio"][value="Fetch"]');
    fetchRadioBtn.checked = true;
    let preferXhr = false;
    const output = document.querySelector('output');
    xhrRadioBtn.addEventListener('click', ()=>{
        output.innerHTML = null;
        preferXhr = true;
        
    });
    
    fetchRadioBtn.addEventListener('click', ()=>{
        output.innerHTML = null;
        preferXhr = false;
    });


    const postBtn = document.querySelector('button[value="post"]');
    const getBtn = document.querySelector('button[value="get"]');
    const putBtn = document.querySelector('button[value="put"]');
    const deleteBtn = document.querySelector('button[value="delete"]');
   

    getBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        if (preferXhr){
            sendRequestXML('GET');
        }
        else{
            sendRequestFetch('GET');
        }
    });

    postBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        if (preferXhr){
            sendRequestXML('POST');
        }
        else{
            sendRequestFetch('POST');
        }
        
    });

    putBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        if (preferXhr){
            sendRequestXML('PUT');
        }
        else{
            sendRequestFetch('PUT');
        }
    });

    deleteBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        if (preferXhr){
            sendRequestXML('DELETE');
        }
        else{
            sendRequestFetch('DELETE');
        }
    });

}

function sendRequestFetch(method){
    const articleId = DOMPurify.sanitize(document.querySelector('#article-id').value);
    if(articleId){
        if (method === 'GET'){
            fetch(`https://httpbin.org/get?id=${articleId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            })
                .then(response => response.text())
                .then(data => {
                    outputRequest(data);
                })
                .catch(e => {
                    alert(e);
                });
        }
        else if (method === 'POST'){
            let obj = {
                id: articleId,
                article_name: DOMPurify.sanitize(document.querySelector('#article-name').value),
                article_body: DOMPurify.sanitize(document.querySelector('#article-body').value),
                date: DOMPurify.sanitize(document.querySelector('#article-date').value)
            }
            fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            })
                .then(response => response.text())
                .then(data => {
                    outputRequest(reformatData(data));
                })
                .catch((e) => {
                    alert(e);
                });
        }
        else if (method === 'PUT'){
            let obj = {
                id: articleId,
                article_name: DOMPurify.sanitize(document.querySelector('#article-name').value),
                article_body: DOMPurify.sanitize(document.querySelector('#article-body').value),
                date: DOMPurify.sanitize(document.querySelector('#article-date').value)
            }
            fetch(`https://httpbin.org/put?id=${articleId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            })
                .then(response => response.text())
                .then(data => {
                    outputRequest(reformatData(data));
                })
                .catch((e) => {
                    alert(e);
                });
        }
        else if (method === 'DELETE'){
            fetch(`https://httpbin.org/delete?id=${articleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            })
                .then(response => response.text())
                .then(data => {
                    outputRequest(reformatData(data));
                })
                .catch(e => {alert(e)});
        }
    }
}

function sendRequestXML(method){
    const articleId = DOMPurify.sanitize(document.querySelector('#article-id').value);
    if(articleId){
        let xhr = new XMLHttpRequest();
        if (method === 'GET'){
            xhr.open(method, `https://httpbin.org/get?id=${articleId}`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function(){handleResponse(xhr);};
            xhr.send(null);
        }
        else if (method === 'POST'){
            let obj = {
                id: articleId,
                article_name: DOMPurify.sanitize(document.querySelector('#article-name').value),
                article_body: DOMPurify.sanitize(document.querySelector('#article-body').value),
                date: DOMPurify.sanitize(document.querySelector('#article-date').value)
            }
            xhr.open(method, 'https://httpbin.org/post', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function(){handleResponse(xhr);};
            xhr.send(
                // data
                JSON.stringify(obj)
            );
        }
        else if (method === 'PUT'){
            let obj = {
                id: articleId,
                article_name: DOMPurify.sanitize(document.querySelector('#article-name').value),
                article_body: DOMPurify.sanitize(document.querySelector('#article-body').value),
                date: DOMPurify.sanitize(document.querySelector('#article-date').value)
            }
            const id = document.querySelector('#article-id').value;
            xhr.open(method, `https://httpbin.org/put?id=${id}`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function(){handleResponse(xhr);};
            xhr.send(
                // data
                JSON.stringify(obj)
            );
        }
        else if (method === 'DELETE'){
            xhr.open(method, `https://httpbin.org/delete?id=${articleId}`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function(){handleResponse(xhr);};
            xhr.send(null);
        }
    }
}

function handleResponse(xhr){
    if (xhr.readyState == 4 && xhr.status == 200){
        let responseText = xhr.responseText;
        let returnText = reformatData(responseText);
        outputRequest(returnText);
    }
}

function reformatData(strData){
    let cleanData;
    if (strData.includes(JSON.stringify(JSON.parse(strData)?.data))){
        cleanData = strData.replace(JSON.stringify(JSON.parse(strData)?.data), JSON.stringify(JSON.parse(strData)?.data).replace(/\\/g, ''));
    }
    return cleanData != undefined ? cleanData : strData;
}

function outputRequest(data){
    const output = document.querySelector('output');
    output.innerHTML = null;
    const pre = document.createElement('pre');
    pre.innerText = data;
    output.appendChild(pre);
}

function setReadOnlyDate(){
    let today = new Date().toJSON().slice(0,10);
    const articleDate = document.querySelector('#article-date');
    articleDate.value = today;
    articleDate.readOnly = true;
}