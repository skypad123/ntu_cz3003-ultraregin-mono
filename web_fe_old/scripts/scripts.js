async function sendRequest(method, url, body, contentType="applicaion/json;charset=UTF-8"){
    // if (body && contentType.includes("json")) {
    //     body = JSON.stringify(body);
    // }

    // let myHeaders = new Headers();
    // if (contentType) myHeaders.set("Content-Type", contentType);
    // myHeaders.set("Authorization", "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5")
    // let myInit = {headers: myHeaders, method: method, body: body};
    // let myRequest = new Request(url, myInit)
    // let response = await fetch(myRequest)

    // .then(response => console.log(response))
    // .then(data => console.log(data));

    let response = await fetch(`https://ultrareign-be-7mmq3.ondigitalocean.app/api/users`, {
        method: "POST",
        headers:{
            Authorization:
            "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5"
        }
    })

    .then(response => console.log(response))
    .then(data => console.log(data));

    return response

}
