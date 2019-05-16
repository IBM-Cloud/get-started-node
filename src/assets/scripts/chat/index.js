import * as $ from 'jquery';
// import * as AssistantV1 from 'ibm-watson/assistant/v1';

export default (function () {
  $('#chat-sidebar-toggle').on('click', e => {
    $('#chat-sidebar').toggleClass('open');
    e.preventDefault();
  });
  $('#send-watson').on('click', e => {
    console.log("clicked");

    var url = "https://gateway.watsonplatform.net/assistant/api/v1/workspaces/56b441ee-f328-468c-ad5d-fb2c464ffa6f/message?version=2019-02-28";
    var data = JSON.stringify({"input":{"text":"Devon"}});
    var username = "apikey";
    var password = "Nj3Frv1BxT7FA0JvweChj4p96FD9MiOIB8Y__Ot2ZrBm";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {

        console.log(this.readyState) // should be 4
        console.log(this.status) // should be 200 OK
        console.log(this.responseText) // response return from request

        var xhrdata = "";
        if (xhr.readyState === 4 ) { //XMLHttpRequest.DONE
            if(xhr.status  == 200) 
                xhrdata = xhr.responseText; 
            else 
                xhrdata = xhr.status;
            alert(xhrdata);
            // document.getElementById("alltext").innerHTML += xhr.response; 
        }
    }

    // xml.setRequestHeader("Authorization", "Basic " + btoa(username));
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Authorization', "Basic " + btoa(username + ":" + password));
    xhr.send(data);
    console.log(xhr.status);
  });
}());
