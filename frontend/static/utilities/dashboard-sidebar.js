

onload = (event) => {

    const button = document.getElementById('sidebar-button');
    const sidebar = document.getElementById('sidebar')
    const sidebar_minimize = document.getElementById('sidebar-minimize'); 

    button.addEventListener('click', (e)=>{
        // sidebar.classList.toggle('-ml-72');
        console.log("Clicking the button")
        e.preventDefault(); 
        sidebar.classList.toggle('hidden');
        sidebar_minimize.classList.toggle('hidden'); 
    })
    

}


