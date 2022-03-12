window.addEventListener('DOMContentLoaded', init);

let HW5_styledBlogs;
const db = firebase.firestore();

async function init(){
    // add all existing blog posts to crud.html
    HW5_styledBlogs = await fetchData();
    populateBlogs();
    
    const loginBtn = document.querySelector('nav ul li button');
    const btnAddPost = document.querySelector('ul.blog-list ~ button');
    const user = firebase.auth().currentUser;
    if (user !== null){
        const email = user.email;
        loginBtn.innerText = `Hello, ${email}`;
        loginBtn.classList.add('logout-style');
        
        const dialogForm = document.querySelector('#blog-dialog');
        
        btnAddPost.classList.remove('d-none');

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
        btnCancelPost.addEventListener('click', (e)=>{
            e.preventDefault();
            dialogForm.close();
        });
    }
    else{
        btnAddPost.classList.add('d-none');
        loginBtn.classList.remove('logout-style');
    }

}
/**
 * Append newly added post to data storage and HTML
 */
function addToLocStorage(){
    const titlePost = document.querySelector('#blog-dialog #title');
    const summaryPost = document.querySelector('#summary');
    const cleanTitle = DOMPurify.sanitize(titlePost.value);
    const cleanSummary = DOMPurify.sanitize(summaryPost.value);
    const cleanDate = new Date();
    const email = firebase.auth().currentUser.email;
    if (cleanTitle && cleanSummary){
        db.collection('blogs').add({
            title: cleanTitle,
            summary: cleanSummary,
            date: cleanDate,
            dateString: `Posted ${cleanDate.toJSON().slice(0,10)} by ${email}`
        })
        .then(()=>{
            window.location.reload();
        })
        .catch((e)=>{
            console.error('Error in creating blog: ', e);
        });
    }
}

/**
 * Helper function to add card post to HTML
 * @param {String} id - HW4_styledBlogs' id in the object retrieved from database
 */
function generateCard(id){
    const ulBlogs = document.querySelector('ul.blog-list');

    const liBlog = document.createElement('li');

    const cleanTitle = HW5_styledBlogs[id].title;
    const cleanSummary = HW5_styledBlogs[id].summary;
    const h2Title = document.createElement('h2');
    h2Title.innerHTML = cleanTitle;
    h2Title.className = 'blog-title';
    const pSummary = document.createElement('p');
    pSummary.innerHTML = cleanSummary; 
    pSummary.className = 'blog-summary';
    const pDate = document.createElement('p');
    pDate.innerText = HW5_styledBlogs[id].dateString;
    pDate.className = 'blog-date';

    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = '<img src="./assets/icons/pen-to-square.svg" alt="Edit logo">';
    btnEdit.className = 'edit-post-btn';
    
    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = '<img src="./assets/icons/trash-can.svg" alt="Delete logo">';
    btnDelete.className = 'delete-post-btn';
    
    const divBlogCard = document.createElement('div');
    divBlogCard.className = 'blog';

    divBlogCard.appendChild(h2Title);
    divBlogCard.appendChild(pDate);
    divBlogCard.appendChild(pSummary);

    const user = firebase.auth().currentUser;
    if (user !== null){
        divBlogCard.appendChild(btnEdit);
        divBlogCard.appendChild(btnDelete);
        
        btnEdit.addEventListener('click', (e)=>{
            e.preventDefault();
            editBlog(cleanTitle, cleanSummary, liBlog, id);
        });
        
        btnDelete.addEventListener('click', (e)=>{
            e.preventDefault();
            deleteBlog(liBlog, id);
        });
    }
    liBlog.appendChild(divBlogCard);
    
    ulBlogs.appendChild(liBlog);
}

/**
 * Update functionality for blog posts
 * @param {string} oldTitle - title subject to change
 * @param {string} oldSummary - summary subject to change
 * @param {DOM} li - li element of blog
 * @param {string} id - corresponding id of blog posts
 */
async function editBlog(oldTitle, oldSummary, li, id){
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

    cancelEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        dialogEdit.close();
        dialogEdit.remove();
    });

    saveEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        dialogEdit.close();
        const cleanTitle = DOMPurify.sanitize(inputTitle.value);
        const cleanSummary = DOMPurify.sanitize(inputSummary.value);
        const cleanDate = new Date();
        const email = firebase.auth().currentUser.email;
        if(cleanTitle && cleanSummary){
            try{
                db.collection('blogs').doc(id).update({
                    title: cleanTitle,
                    summary: cleanSummary,
                    date: cleanDate,
                    dateString: `Edited ${cleanDate.toJSON().slice(0,10)} by ${email}`
                });
                li.querySelector('div.blog h2.blog-title').innerHTML = cleanTitle;
                li.querySelector('div.blog p.blog-summary').innerHTML = cleanSummary;
                li.querySelector('div.blog p.blog-date').innerHTML = `Edited ${cleanDate.toJSON().slice(0,10)} by ${email}`;
            }
            catch(e){
                console.error('Error at updating blog: ', e);
            }
            dialogEdit.remove();
        }
    });

}

/**
 * Fetch all data to HTML
 * @return {Promise} all blog posts stored in firestore
 */
async function fetchData(){
    // get blogs collection from database 
    return db.collection('blogs').orderBy('date').get().then((querySnapshot) => {
        const result = {};
        querySnapshot.forEach((doc) => {
            result[doc.id] = doc.data();
        });
        return result;
    });
}

/**
 * Populate blog cards into HTML
 */
async function populateBlogs(){
    for(const id in HW5_styledBlogs){
        generateCard(id);
    }
}

/**
 * Remove blog from local storage and user end/HTML
 * @param {DOM} li - li of blog post
 * @param {string} id - id of blog post
 */
function deleteBlog(li, id){
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
    
    cancelDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        dialogDelete.close();
        dialogDelete.remove();
    });

    confirmDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        try{
            db.collection('blogs').doc(id).delete();
            li.remove();
        }
        catch(e){
            console.error('Error at deleting blog: ', e);
        }
        dialogDelete.close();
        dialogDelete.remove();
    });
}