document.addEventListener('DOMContentLoaded', event => {
    
    const formCreateNew = document.getElementById("createNew");
    const createName = document.getElementById("createName");
    const createEm= document.getElementById("createEm");
    const createC = document.getElementById("createC");
    const createP = document.getElementById("createP");
    
    formCreateNew && formCreateNew.addEventListener('submit', async (e) => {
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

const createMeet = document.querySelectorAll(".createMeet");
const creation = document.querySelectorAll(".creation");

console.log(creation)

for (let i = 0; i < creation.length; i++) {
    creation[i].addEventListener('click', async (e) => {
        // e.preventDefault();
        // let res = await fetch(`/admin/${e.target.id}`);
        window.location.href = `/admin/${e.target.id}`
        })   
}

const btnAccept = document.querySelector(".accept");
const btnReject = document.querySelector(".reject");

btnAccept && btnAccept.addEventListener('click', async (e) => {
    console.log(e.target.id)
    let res = await fetch('/admin/accept', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: e.target.id,
            button: e.target.innerText
        })

});

});

btnReject && btnReject.addEventListener('click', async (e) => {
    console.log(e.target.id)
    let res = await fetch('/admin/reject', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: e.target.id,
            button: e.target.innerText
        })

});

});

});

