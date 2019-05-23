document.addEventListener('DOMContentLoaded', event => {
    
    const formCreateNew = document.getElementById("createNew");
    const createName = document.getElementById("createName");
    const createEm= document.getElementById("createEm");
    const createC = document.getElementById("createC");
    const createP = document.getElementById("createP");

    
    formCreateNew.addEventListener('submit', async (e) => {
    e.preventDefault();
    let res = await fetch('/admin/createNew', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            createName: createName.value,
            createEm: createEm.value,
            createC: createC.value,
            createP: createP.value
        })
    })
    const whatIget = await res.json();
    console.log("+++++++++++")
    
})
});