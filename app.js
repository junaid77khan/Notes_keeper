

const addNoteBtn = document.querySelector('#add');

const updateLSData = () => {
    textAreaData = document.querySelectorAll('.textArea');
    const notes = [];
    textAreaData.forEach((note) => {
        if(note.value) return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {
   const note = document.createElement('div');
   note.classList.add('note');

   const htmlData = ` 
   <div class="operation">
      <div class="edit"><i class="fa fa-regular fa-edit"></i></div>
      <div class="delete"><i class="fa">&#xf014;</i></div>
   </div>
   <div class="main ${text ? "" : "hidden"} "> </div>
   <textarea class="textArea ${text ? "hidden" : ""} " ></textarea>  `;

   note.insertAdjacentHTML('afterbegin', htmlData);

   document.body.appendChild(note);

   const editBtn = note.querySelector('.edit');
   const deleteBtn = note.querySelector('.delete');
   const main = note.querySelector('.main');
   const textArea = note.querySelector('.textArea');

   deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLSData();
   })

   main.innerHTML = text;
   textArea.innerHTML = text;

   editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');

   })
    textArea.addEventListener('change', (event) =>{
         const value = event.target.value;
         main.innerHTML = value;
    })

    updateLSData();
    
}

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){ notes.forEach((note) => addNewNote(note)); }

addNoteBtn.addEventListener('click', () => addNewNote());