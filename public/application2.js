document.addEventListener('DOMContentLoaded', event => {

    let addEverything = document.querySelectorAll('.addEverything');
    let inputTarget =  document.querySelectorAll('.target');
    let a = document.querySelectorAll('.users');
    let meetDate = document.querySelectorAll('.date');


    for (let i = 0; i < addEverything.length; i++) {
        addEverything[i].addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log(meetDate[i])
            let res = await fetch('/users/new_meet', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    target: inputTarget[i].value,
                    invitedP: a[i].innerText,
                    meetDate:meetDate[i].value,
                    userId: e.target.id
                })
            })
            const whatIget = await res.json();
            console.log(whatIget)

            })   
    }
})

// let form2 = document.querySelectorAll('form2');
// let allAdd = document.querySelectorAll('form1');
// for (let i = 0; i < allAdd.length; i++) {
//     allAdd[i].addEventListener('submit', async (e) => {
//         let target = e.target.querySelectorAll('target');
//         let date = e.date.querySelectorAll('date');
//         let name = e.name.querySelectorAll('users');
//         e.preventDefault();
//         meeting = {
//             name: name,
//             target: target.value,
//             date: date.value,
//         }
//         let res = await fetch('users/new_meet', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(meeting)
//         });
//         console.log(await res.json());
//     });
// }