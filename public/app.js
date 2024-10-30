window.addEventListener('load', function () {

    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', function () {
        console.log("Connected");
    });

    /* --- Code to RECEIVE a socket message from the server --- */
    let chatBox = document.getElementById('chat-box-msgs');

    //Listen for messages named 'msg' from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);

        //Create a message string and page element
        let receivedMsg = data.name + "'s " + data.plant + " &#8594 " + data.msg;
        let msgEl = document.createElement('p');
        msgEl.innerHTML = receivedMsg;

        //Add the element with the message to the page
        chatBox.appendChild(msgEl);
        //Add a bit of auto scroll for the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    /* --- Code to SEND a socket message to the Server --- */
    let nameInput = document.getElementById('name-input');
    let msgInput = document.getElementById('msg-input');
    let plantDropDown = document.getElementById('dropdownMenu');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function () {
        let curName = nameInput.value;
        let curMsg = msgInput.value;
        let curPlant = plantDropDown.options[plantDropDown.selectedIndex].innerHTML;
        let msgObj = { "name": curName, 'plant': curPlant, "msg": curMsg };

        //Send the message object to the server
        socket.emit('msg', msgObj);
    });
});