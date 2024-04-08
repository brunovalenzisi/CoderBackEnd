/*const scriptElement = document.querySelector('script[src="/js/login.js"]');
const hostURL = scriptElement.getAttribute('data-hosturl');
const formulario = document.getElementById("loginForm")
console.log(hostURL)
formulario.addEventListener("submit",(event)=>{
    event.preventDefault();
    let usuario=document.getElementById("email").value
    let password=document.getElementById("password").value
    const data={usuario,password}
    fetch(`${hostURL}/api/users/login`,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{"Content-Type":"application/json"
   }
    })
})*/