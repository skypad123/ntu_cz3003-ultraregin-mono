
async function login(){
    let form = document.querySelector("#form-login");
    let formData = new FormData(form);
    let body = {"username": formData.get("username"), "email": formData.get("password")};

    let myBody = JSON.stringify(body);

    let response = await fetch("https://ultrareign-be-7mmq3.ondigitalocean.app/api/users", {
        method: "POST",
        body: myBody,
        headers:{
            'Content-Type': 'application/json',
            Authorization:
                "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
        }
    })

    // .then(response => response.json())
    // .then(data => console.log(data));

    console.log(response)

    if (response.ok){
        let data = await response.json()
        console.log(data)
        if (formData.get("username") == data[1].username){
            console.log("correct!")
        }
        else{
            console.log("incorrect")
        }
    }
    else {
        console.log("invalid")
        // console.log(reponse)
    }

    // let response = await sendRequest("POST", `https://ultrareign-be-7mmq3.ondigitalocean.app/api/users`, body)

    // if (response.ok){
    //     let data = await response.json();
    //     sessionStorage.setItem("username", formData.get("username"));

    //     window.location.replace("summary-report.html")
    // }
    // else {
    //     let data = await response.json();
    //     let alert = createAlert("Login failed", data)
    //     document.body.prepend(alert);
    // }
};

document.querySelector("#btn-login").addEventListener("click", async () => await login());