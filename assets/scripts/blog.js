window.addEventListener('DOMContentLoaded', init);

let HW4_blogs;

function init(){
    // get HW4_blogs stored in local storage if we have one, otherwise set HW4_blogs to an empty array
    if ('HW4_blogs' in localStorage){
        HW4_blogs = JSON.parse(localStorage.HW4_blogs);
    }
    else{
        HW4_blogs=[];
        localStorage.setItem('HW4_blogs', JSON.stringify(HW4_blogs));
    }

    // add all existing blog posts to crud.html
    fetchData();

    const btnAddPost = document.querySelector('ul ~ button');
    const dialogForm = document.querySelector('#blog-dialog');

    btnAddPost.addEventListener('click', ()=>{
        dialogForm.showModal();
    });

    const btnConfirmPost = document.querySelector('#confirm-btn');
    btnConfirmPost.addEventListener('click', (e)=>{
        e.preventDefault();
        addToLocStorage();
        dialogForm.close();
    });

    const btnCancelPost = document.querySelector('button[value="cancel"]');
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
    
    const date = Date();
    const key = `${cleanTitle}-${date}`;
    // add data to HW4_blogs array
    HW4_blogs.push({'title': cleanTitle, 
                'summary': cleanSummary,
                'date': date,
                'key': key});
    // update local storage's HW4_blogs array
    localStorage.HW4_blogs = JSON.stringify(HW4_blogs);
    // add newly added post to crud.html
    generateCard(HW4_blogs.length-1);
}

/**
 * Helper function to add card post to HTML
 * @param {Number} idx - HW4_blogs' idx in the storage array
 */
function generateCard(idx){
    const ulBlogs = document.querySelector('ul');

    const liBlog = document.createElement('li');

    const cleanTitle = HW4_blogs[idx].title;
    const cleanSummary = HW4_blogs[idx].summary;
    const h2Title = document.createElement('h2');
    h2Title.innerHTML = cleanTitle;
    const pSummary = document.createElement('p');
    pSummary.innerHTML = cleanSummary; 
    const pDate = document.createElement('p');
    pDate.innerText = HW4_blogs[idx].date;

    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = 'Edit';
    
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = 'Delete';
    
    const divBlogCard = document.createElement('div');

    divBlogCard.appendChild(h2Title);
    divBlogCard.appendChild(pDate);
    divBlogCard.appendChild(pSummary);
    divBlogCard.appendChild(btnEdit);
    divBlogCard.appendChild(btnDelete);
    
    liBlog.appendChild(divBlogCard);
    
    ulBlogs.appendChild(liBlog);
    
    btnEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        editBlog(cleanTitle, cleanSummary, HW4_blogs[idx].key);
    }, false);

    btnDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        deleteBlog(HW4_blogs[idx].key);
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
    const formEdit = document.createElement('form');
    formEdit.setAttribute('method', 'dialog');
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
    saveEdit.innerText = 'Save'
    const cancelEdit = document.createElement('button');
    cancelEdit.innerText = 'Cancel';

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

        for (let i=0; i<HW4_blogs.length; i++){
            // console.log(el);
            if (HW4_blogs[i].key === key){
                HW4_blogs[i].title=cleanTitle;
                HW4_blogs[i].date = Date();
                HW4_blogs[i].summary = cleanSummary;
                // console.log(HW4_blogs[i]);
                cleanList();
                fetchData();
                localStorage.HW4_blogs = JSON.stringify(HW4_blogs);
                dialogEdit.remove();
                break;
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
    // console.log(HW4_blogs);
    for(let i=0; i<HW4_blogs.length; i++){
        generateCard(i);
    }
}

/**
 * Remove blog from local storage and user end/HTML
 */
function deleteBlog(key){
    // console.log('delete clicked!');
    const dialogDelete = document.createElement('dialog');
    const pDeletePrompt = document.createElement('p');
    pDeletePrompt.innerText = 'Are you sure?';
    const cancelDelete = document.createElement('button');
    cancelDelete.innerHTML = 'Cancel';
    const confirmDelete = document.createElement('button');
    confirmDelete.innerHTML = 'Delete';

    dialogDelete.appendChild(pDeletePrompt);
    dialogDelete.appendChild(cancelDelete);
    dialogDelete.appendChild(confirmDelete);

    const body = document.querySelector('body');
    body.appendChild(dialogDelete);
    
    dialogDelete.showModal();
    
    cancelDelete.addEventListener('click', ()=>{
        dialogDelete.close();
        dialogDelete.remove();
    });

    confirmDelete.addEventListener('click', ()=>{
        dialogDelete.close();
        for (let i=0; i<HW4_blogs.length; i++){
            // console.log(el);
            if (HW4_blogs[i].key === key){
                HW4_blogs.splice(i,1);
                cleanList();
                fetchData();
                localStorage.HW4_blogs = JSON.stringify(HW4_blogs);
                dialogDelete.remove();
                break;
            }
        }
    });
}