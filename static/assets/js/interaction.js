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
    document.getElementById("navigation_bar").innerHTML=`
    <ul> 
        <li><a href="#" onclick="home()">Login</a></li>
        <li><a href="#" onclick="leaderboard()">Leaderboard</a></li>
    </ul>`
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
            document.getElementById("navigation_bar").innerHTML=`
            <ul>
              <li><a href="#" id="menu_username">${text.username}</a></li>  
			  <li><a href="#" onclick="home()">Logout</a></li>
			</ul>`
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
        document.getElementById("center_box").innerHTML = "<h1>Bingo Card</h1><p>Below is your bingo card..have fun out their and get out of Tea Game</p>"
        tbl=$("<table/>").attr("id","bingo_card_table");
        j = 0;
        $("#center_box").append(tbl);
        for(i=0;i<5;i++)
        {
            var tr="<tr>";
            var td1=`<td class="text" id="sq${j}" onclick="marksquare('sq${j}')">${bingo_card[i]["0"]}</td>`;
            j++
            var td2=`<td class="text" id="sq${j}" onclick="marksquare('sq${j}')">${bingo_card[i]["1"]}</td>`;
            j++
            var td3=`<td class="text" id="sq${j}" onclick="marksquare('sq${j}')">${bingo_card[i]["2"]}</td>`;
            j++
            var td4=`<td class="text" id="sq${j}" onclick="marksquare('sq${j}')">${bingo_card[i]["3"]}</td>`;
            j++
            var td5=`<td class="text" id="sq${j}" onclick="marksquare('sq${j}')">${bingo_card[i]["4"]}</td>`;
            j++
            $("#bingo_card_table").append(tr+td1+td2+td3+td4+td5);
        }
        document.getElementById("center_box").innerHTML += "<div id='bingo_button'><input type='button' class='button' name='bingo' id='Bingo' value='Bingo' onclick='checkForBingo()'></div>"
    })
}
function marksquare(square){
    val = document.getElementById(square).innerHTML 
    url = "/api/update_card?square="+square+"&username="+document.getElementById("menu_username").innerHTML
    fetch(url)
    document.getElementById(square).innerHTML= "<s>"+val+"</s>"
}
function checkForBingo(){
    checkVerticalBingo();
    checkHorizontalBingo();
    checkDiagonalBingo();
    checkCornersBingo();
    checkFullBingo();
}
function checkVerticalBingo() {
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('sq' + i);
        var sq2 = document.getElementById('sq' + (i + 5));
        var sq3 = document.getElementById('sq' + (i + 10));
        var sq4 = document.getElementById('sq' + (i + 15));
        var sq5 = document.getElementById('sq' + (i + 20));
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}
function checkHorizontalBingo() {
    j = 0;
    for (var i = 0; i < 5; i++) {
        switch(i) {
            case 0: 
                var sq1 = document.getElementById('sq' + i);
                var sq2 = document.getElementById('sq' + (i + 1));
                var sq3 = document.getElementById('sq' + (i + 2));
                var sq4 = document.getElementById('sq' + (i + 3));
                var sq5 = document.getElementById('sq' + (i + 4));
                break;
            case 1: 
                var sq1 = document.getElementById('sq' + (i + 4));
                var sq2 = document.getElementById('sq' + (i + 5));
                var sq3 = document.getElementById('sq' + (i + 6));
                var sq4 = document.getElementById('sq' + (i + 7));
                var sq5 = document.getElementById('sq' + (i + 8));
                break;
            case 2: 
                var sq1 = document.getElementById('sq' + (i + 8));
                var sq2 = document.getElementById('sq' + (i + 9));
                var sq3 = document.getElementById('sq' + (i + 10));
                var sq4 = document.getElementById('sq' + (i + 11));
                var sq5 = document.getElementById('sq' + (i + 12));
                break;
            case 3: 
                var sq1 = document.getElementById('sq' + (i + 12));
                var sq2 = document.getElementById('sq' + (i + 13));
                var sq3 = document.getElementById('sq' + (i + 14));
                var sq4 = document.getElementById('sq' + (i + 15));
                var sq5 = document.getElementById('sq' + (i + 16));
                break;
            case 4: 
                var sq1 = document.getElementById('sq' + (i + 16));
                var sq2 = document.getElementById('sq' + (i + 17));
                var sq3 = document.getElementById('sq' + (i + 18));
                var sq4 = document.getElementById('sq' + (i + 19));
                var sq5 = document.getElementById('sq' + (i + 20));
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}
function checkDiagonalBingo() {
    for (var i = 0; i < 2; i++) {
        switch(i) {
            case 0:
                var sq1 = document.getElementById('sq' + 0);
                var sq2 = document.getElementById('sq' + 6);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 18);
                var sq5 = document.getElementById('sq' + 24);
                break;
            case 1:
                var sq1 = document.getElementById('sq' + 4);
                var sq2 = document.getElementById('sq' + 8);
                var sq3 = document.getElementById('sq' + 12);
                var sq4 = document.getElementById('sq' + 16);
                var sq5 = document.getElementById('sq' + 20);
                break;
        }
        checkLines(sq1, sq2, sq3, sq4, sq5);
    }
}
function checkCornersBingo() {
    var sq1 = document.getElementById('sq' + 0);
    var sq2 = document.getElementById('sq' + 4);
    var sq3 = document.getElementById('sq' + 20);
    var sq4 = document.getElementById('sq' + 24);

    if (sq1.value == "X" &&
            sq2.innerHTML.includes("<s>") &&
            sq3.innerHTML.includes("<s>") &&
            sq4.innerHTML.includes("<s>")) {
                youWin();
                return;
    }
}
function checkFullBingo() {
    var j = 0;
    var flag = false;
    for (var i = 0; i < 5; i++) {
        var sq1 = document.getElementById('sq' + j);
        j++;
        var sq2 = document.getElementById('sq' + j);
        j++;
        var sq3 = document.getElementById('sq' + j);
        j++;
        var sq4 = document.getElementById('sq' + j);
        j++;
        var sq5 = document.getElementById('sq' + j);
        j++;

        if (sq1.innerHTML.includes("<s>") &&
            sq2.innerHTML.includes("<s>") &&
            sq3.innerHTML.includes("<s>") &&
            sq4.innerHTML.includes("<s>") &&
            sq5.innerHTML.includes("<s>")) {
                flag = true;
        }
        else if (sq1.innerHTML.includes("<s>") &&
            sq2.innerHTML.includes("<s>") &&
            sq3.innerHTML.includes("<s>") &&
            sq4.innerHTML.includes("<s>") &&
            sq5.innerHTML.includes("<s>")) {
                flag = true;
        }
        else {
            flag = false;
            break;
        }
    }
    if (flag == true) {
        youWin();
    }
}
function checkLines(sq1, sq2, sq3, sq4, sq5) {
    if (sq1.innerHTML.includes("<s>") &&
        sq2.innerHTML.includes("<s>") &&
        sq3.innerHTML.includes("<s>") &&
        sq4.innerHTML.includes("<s>") &&
        sq5.innerHTML.includes("<s>")) {
            youWin();
            return;
    }
    else if (sq1.innerHTML.includes("<s>") &&
            sq2.innerHTML.includes("<s>") &&
            sq3.innerHTML.includes("<s>") &&
            sq4.innerHTML.includes("<s>") &&
            sq5.innerHTML.includes("<s>")) {
                youWin();
                return;
    }
}
function youWin() {
    alert("BINGO! You win!");
    url = "/api/win?username="+document.getElementById("menu_username").innerHTML
    fetch(url)
    throw new Error("Not an error! Just finishes any execution of the game!");
}
function leaderboard(){
    url = "/api/leaderboard"
    fetch(url)
    .then(function (response){
        return response.text()
    })
    .then(function (data){
        data = JSON.parse(data)
        document.getElementById("center_box").innerHTML = "<h1>Leaderboard</h1><p>Are you winning?</p>"
        tbl=$("<table/>").attr("id","leader_table");
        $("#center_box").append(tbl);
        for(i=0;i<5;i++)
        {
            var tr="<tr>";
            var td1=`<td class="text">${data["username"][i]}</td>`;
            var td2=`<td class="text">${data["wins"][i]}</td></tr>`;
            $("#leader_table").append(tr+td1+td2);
        }
    })
}