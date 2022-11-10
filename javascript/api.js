const url = 'https://jsonplaceholder.typicode.com/comments/2'

fetch(url)
.then(response => response.json () )
.then(data=>{

    let element = document.getElementById('elem')
    element.innerHTML =`<p>${data.name}</p>
                        <p>${data.email}</p>
                        <p>${data.body}</p>`
                        

    console.log(data)
})

.catch(err=>console.log(err))