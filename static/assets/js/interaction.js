function home(){
    document.getElementById("dynamic_page").innerHTML=`
    <div id='center_box'>
        <h2>Bingo</h2>
        <p><i>Please Log in</i></p>
        <div id="form">
            <label>Username</label><br>
            <input type="text" name="username" id="username"><br>
            <div id="buttons">
                <input type="submit" id="btnLogin" onclick="login()">
            </div>
        </div>
    </div>`
}

function login(){
    url = "/api/login?username="+document.getElementById("username").value
    fetch(url)
    .then(function (response){
        return response.text()
    })
    .then(function (text){
        text = JSON.parse(text)
        if(text.status == "SUCSESS"){
            load_card(text.username)
        }
        else{
            alert("Login Not Found")
        }
    })
}

function load_card(username){
    url = "/api/load_card?username="+username
    fetch(url)
    .then(function (response){
        return response.text()
    })
    .then(function (data){
        bingo_card = JSON.parse(data)
        //bingo_card = data
        document.getElementById("center_box").innerHTML = "<h1>Bingo Card</h1><p>Below is your bingo card...have fun out their and get out of Tea Game</p>"
        console.log(bingo_card)
        tbl=$("<table/>").attr("id","bingo_card_table");
        $("#center_box").append(tbl);
        for(i=0;i<5;i++)
        {
            var tr="<tr>";
            var td1="<td class='text'>"+bingo_card[i]["0"]+"</td>";
            var td2="<td class='text'>"+bingo_card[i]["1"]+"</td>";
            var td3="<td class='text'>"+bingo_card[i]["2"]+"</td>";
            var td4="<td class='text'>"+bingo_card[i]["3"]+"</td>";
            var td5="<td class='text'>"+bingo_card[i]["4"]+"</td></tr>";
        $("#bingo_card_table").append(tr+td1+td2+td3+td4+td5);
        }
        $('.text').click(function() {
            $(this).html('<span>X</span>');
        });
    })
}