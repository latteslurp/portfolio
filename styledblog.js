window.addEventListener('DOMContentLoaded', init);

let styledBlogs;

function init(){
    // get styledBlogs stored in local storage if we have one, otherwise set styledBlogs to an empty array
    if ('styledBlogs' in localStorage){
        styledBlogs = JSON.parse(localStorage.styledBlogs);
    }
    else{
        styledBlogs=[];
        localStorage.setItem('styledBlogs', JSON.stringify(styledBlogs));
    }

    // add all existing blog posts to crud.html
    fetchData();

    const btnAddPost = document.querySelector('ul ~ button');
    const dialogForm = document.querySelector('#blog-dialog');

    btnAddPost.addEventListener('click', ()=>{
        dialogForm.showModal();
        dialogForm.classList.add('dialog-on');
    });

    const btnConfirmPost = document.querySelector('#add-confirm-btn');
    btnConfirmPost.addEventListener('click', (e)=>{
        e.preventDefault();
        addToLocStorage();
        dialogForm.close();
    });

    const btnCancelPost = document.querySelector('.cancel-btn');
    btnCancelPost.addEventListener('click', ()=>{
        e.preventDefault();
        dialogForm.close();
    });
}
/**
 * Append newly added post to data storage and HTML
 */
function addToLocStorage(){
    const titlePost = document.querySelector('#blog-dialog #title');
    const summaryPost = document.querySelector('#summary');
    const cleanTitle = DOMPurify.sanitize(titlePost.value);
    const cleanSummary = DOMPurify.sanitize(summaryPost.value);
    if (cleanTitle && cleanSummary){
        const date = Date();
        const key = `${cleanTitle}-${date}`;
        // add data to styledBlogs array
        styledBlogs.push({'title': cleanTitle, 
                    'summary': cleanSummary,
                    'date': date,
                    'key': key});
        // update local storage's styledBlogs array
        localStorage.styledBlogs = JSON.stringify(styledBlogs);
        // add newly added post to crud.html
        generateCard(styledBlogs.length-1);
    }
}

/**
 * Helper function to add card post to HTML
 * @param {Number} idx - styledBlogs' idx in the storage array
 */
function generateCard(idx){
    const ulBlogs = document.querySelector('ul');

    const liBlog = document.createElement('li');

    const cleanTitle = styledBlogs[idx].title;
    const cleanSummary = styledBlogs[idx].summary;
    const h2Title = document.createElement('h2');
    h2Title.innerHTML = cleanTitle;
    h2Title.className = 'blog-title';
    const pSummary = document.createElement('p');
    pSummary.innerHTML = cleanSummary; 
    pSummary.className = 'blog-summary';
    const pDate = document.createElement('p');
    pDate.innerText = styledBlogs[idx].date;
    pDate.className = 'blog-date';

    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = '<img src="./pen-to-square.svg" alt="Edit logo">';
    btnEdit.className = 'edit-post-btn';
    
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = '<img src="./trash-can.svg" alt="Delete logo">';
    btnDelete.className = 'delete-post-btn';
    
    const divBlogCard = document.createElement('div');
    divBlogCard.className = 'blog';

    divBlogCard.appendChild(h2Title);
    divBlogCard.appendChild(pDate);
    divBlogCard.appendChild(pSummary);
    divBlogCard.appendChild(btnEdit);
    divBlogCard.appendChild(btnDelete);
    
    liBlog.appendChild(divBlogCard);
    
    ulBlogs.appendChild(liBlog);
    
    btnEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        editBlog(cleanTitle, cleanSummary, styledBlogs[idx].key);
    }, false);

    btnDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        deleteBlog(styledBlogs[idx].key);
    }, false);
}

/**
 * Update functionality for blog posts
 * @param {string} oldTitle - title subject to change
 * @param {string} oldSummary - summary subject to change
 * @param {string} key - corresponding key of blog posts in the local storage
 */
function editBlog(oldTitle, oldSummary, key){
    // console.log('edit clicked!');
    const dialogEdit = document.createElement('dialog');
    dialogEdit.className = 'dialog-on';
    const formEdit = document.createElement('form');
    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for','title-edit');
    labelTitle.innerText = 'Title';
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('id','title-edit');
    inputTitle.value = oldTitle;
    const labelSummary = document.createElement('label');
    labelSummary.setAttribute('for', 'summary-edit');
    labelSummary.innerText = 'Summary';
    const inputSummary = document.createElement('textarea');
    inputSummary.setAttribute('id','summary-edit');
    inputSummary.innerHTML = oldSummary;
    const menuEdit = document.createElement('section');
    const saveEdit = document.createElement('button');
    saveEdit.innerText = 'Save';
    saveEdit.className = 'confirm-btn';
    const cancelEdit = document.createElement('button');
    cancelEdit.innerText = 'Cancel';
    cancelEdit.className = 'cancel-btn';

    menuEdit.appendChild(cancelEdit);
    menuEdit.appendChild(saveEdit);

    formEdit.appendChild(labelTitle);
    formEdit.appendChild(inputTitle);
    formEdit.appendChild(labelSummary);
    formEdit.appendChild(inputSummary);
    formEdit.appendChild(menuEdit);

    dialogEdit.appendChild(formEdit);

    const body = document.querySelector('body');
    body.appendChild(dialogEdit);

    dialogEdit.showModal();


    cancelEdit.addEventListener('click', ()=>{
        dialogEdit.close();
        dialogEdit.remove();
    });

    saveEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        dialogEdit.close();
        const cleanTitle = DOMPurify.sanitize(inputTitle.value);
        const cleanSummary = DOMPurify.sanitize(inputSummary.value);

        if(cleanTitle && cleanSummary){
            for (let i=0; i<styledBlogs.length; i++){
                // console.log(el);
                if (styledBlogs[i].key === key){
                    styledBlogs[i].title=cleanTitle;
                    styledBlogs[i].date = Date();
                    styledBlogs[i].summary = cleanSummary;
                    // console.log(styledBlogs[i]);
                    cleanList();
                    fetchData();
                    localStorage.styledBlogs = JSON.stringify(styledBlogs);
                    dialogEdit.remove();
                    break;
                }
            }
        }
    });

}

/**
 * Helper function to clear up all blog posts
 */
function cleanList(){
    const ulBlogs = document.querySelector('ul');
    while(ulBlogs.hasChildNodes()){
        ulBlogs.removeChild(ulBlogs.lastChild);
    }
}

/**
 * Fetch all data to HTML
 */
function fetchData(){
    // console.log(styledBlogs);
    for(let i=0; i<styledBlogs.length; i++){
        generateCard(i);
    }
}

/**
 * Remove blog from local storage and user end/HTML
 */
function deleteBlog(key){
    const dialogDelete = document.createElement('dialog');
    dialogDelete.className = 'dialog-on';
    const formDelete = document.createElement('form');
    const h3DeletePrompt = document.createElement('h3');
    h3DeletePrompt.innerText = 'Are you sure?';
    const cancelDelete = document.createElement('button');
    cancelDelete.innerHTML = 'Cancel';
    cancelDelete.className = 'cancel-btn-delete';
    const confirmDelete = document.createElement('button');
    confirmDelete.innerHTML = 'Delete';
    confirmDelete.className = 'confirm-btn-delete';
    const sectionMenu = document.createElement('section');
    
    sectionMenu.appendChild(cancelDelete);
    sectionMenu.appendChild(confirmDelete);

    formDelete.appendChild(h3DeletePrompt);
    formDelete.appendChild(sectionMenu);

    dialogDelete.appendChild(formDelete);

    const body = document.querySelector('body');
    body.appendChild(dialogDelete);
    
    dialogDelete.showModal();
    
    cancelDelete.addEventListener('click', ()=>{
        dialogDelete.close();
        dialogDelete.remove();
    });

    confirmDelete.addEventListener('click', ()=>{
        dialogDelete.close();
        for (let i=0; i<styledBlogs.length; i++){
            // console.log(el);
            if (styledBlogs[i].key === key){
                styledBlogs.splice(i,1);
                cleanList();
                fetchData();
                localStorage.styledBlogs = JSON.stringify(styledBlogs);
                dialogDelete.remove();
                break;
            }
        }
    });
}