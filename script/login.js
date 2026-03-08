// login page 

document.getElementById('login-btn')
.addEventListener('click', function(){
    const username = document.getElementById('input-Username')
    const usernameValue = username.value;
    console.log(usernameValue)

    const password = document.getElementById('input-password')
    const passwordValue = password.value;
    console.log(passwordValue)

    if(usernameValue === 'admin' & passwordValue === 'admin123'){
        alert('Login Successful')
        window.location.assign('home.html')
    }
    else{
        alert('Login Failed')
        return;
    }
})

