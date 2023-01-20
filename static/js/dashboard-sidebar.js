const button = document.getElementById('sidebar-button');
const sidebar = document.getElementById('sidebar')
const sidebar_minimize = document.getElementById('sidebar-minimize'); 

button.addEventListener('click', ()=>{
    // sidebar.classList.toggle('-ml-72');
    sidebar.classList.toggle('hidden');
    sidebar_minimize.classList.toggle('hidden'); 
})

