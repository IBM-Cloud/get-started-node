import * as $ from 'jquery';
// import * as AssistantV1 from 'ibm-watson/assistant/v1';

export default (function () {
  $('#chat-sidebar-toggle').on('click', e => {
    $('#chat-sidebar').toggleClass('open');
    e.preventDefault();
  });
  $('#send-watson').on('click', e => {
    console.log("clicked");

    sendToWatson();
  });

  function updateTextArea ( input, output) {
    console.log(input);
    console.log(output);

    // var userStr = '<div class="layer">';
    // userStr += '<div class="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">';
    // userStr += '<div class="peer mR-10">';
    // userStr += '<small>10:00 AM</small>';
    // userStr += '</div>';
    // userStr += '<div class="peer-greed">';
    // userStr += '<span>Devon Text</span>';
    // userStr += '</div>';
    // userStr += '</div>';
    // userStr += '</div>';

    // $("#chat-box-conversations .chat-box-texts").append(userStr);

    // <div class="peers fxw-nw ai-fe">

    // <div class="peer ord-1 mL-20">
    //   <img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/12.jpg" alt="">
    // </div>

    // <div class="peer peer-greed ord-0">
    //   <div class="layers ai-fe gapY-10">
    // var aiStr = '<div class="peers fxw-nw ai-fe">';

    // // aiStr += '<div class="peers fxw-nw ai-fe">';
    // // aiStr += '<div class="peer ord-1 mL-20">';
    // // aiStr += '<img class="w-2r bdrs-50p" src="https://randomuser.me/api/portraits/men/12.jpg" alt="">';
    // // aiStr += '</div>';
    // aiStr += '<div class="peer peer-greed ord-0">';
    // aiStr += '<div class="layers ai-fe gapY-10">';

    // aiStr += '<div class="layer">';
    // aiStr += '<div class="peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2">';
    // aiStr += '<div class="peer mL-10 ord-1">';
    // aiStr += '<small>10:00 AM</small>';
    // aiStr += '</div>';
    // aiStr += '<div class="peer-greed ord-0">';
    // aiStr += '<span>Devon Text</span>';
    // aiStr += '</div>';
    // aiStr += '</div>';
    // aiStr += '</div>';
    // aiStr += '</div>';
    // aiStr += '</div>';
    // aiStr += '</div>';
    // // aiStr += '</div>';


    var inputlayer = "<div class=\"peers fxw-nw ai-fe\"><div class=\"peer ord-1 mL-20\"><img class=\"w-2r bdrs-50p\" src=\"https://randomuser.me/api/portraits/men/12.jpg\" alt=\"\"></div><div class=\"peer peer-greed ord-0\"><div class=\"layers ai-fe gapY-10\"><div class=\"layer\"><div class=\"peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2\"><div class=\"peer mL-10 ord-1\"><small>10:00 AM</small></div><div class=\"peer-greed ord-0\"><span>"+input+"</span></div></div></div></div></div></div>";
    var outputlayer = "<div class=\"peers fxw-nw\"><div class=\"peer mR-20\"><img class=\"w-2r bdrs-50p\" src=\"https://randomuser.me/api/portraits/men/11.jpg\" alt=\"\"></div><div class=\"peer peer-greed\"><div class=\"chat-box-texts layers ai-fs gapY-5\"><div class=\"layer\"><div class=\"peers fxw-nw ai-c pY-3 pX-10 bgc-white bdrs-2 lh-3/2\"><div class=\"peer mR-10\"><small>10:00 AM</small></div><div class=\"peer-greed\">"+output+"</span></div></div></div></div></div></div>";


    $("#chat-box-conversations").append(inputlayer);
    $("#chat-box-conversations").append(outputlayer);

    // // $("#chat-box-conversations .chat-box-texts").html(htmlStr);
    // $("#chat-box-conversations .chat-box-texts").each(function(i, obj) {
    //     this.append(aiStr);
    //     // var $layer = $('.layer', this);

    // //     // var $textArea = $('[id^="log_"]', this);
    // //     // var text = $textArea.val();   
    // //     // var lines = text.split(/\r|\r\n|\n/);
    // //     // var lineNumber = lines.length;

    // //     // var accordionId = parseInt(obj.id.split('_')[1]);

    // //     // let lc = new LogConnection(logConnectionURL, env.AFS_USER, accordionId, lineNumber);
    // });

    // var dom_nodes = $("#chat-box-conversations .chat-box-texts");


    // var dom_nodes = $($.parseHTML(html));

    // var logStart = $('.logStart', dom_nodes);
    // var dateTime = logStart.html();
    // var localizedDT = moment.utc(dateTime).local().format('L LT');
    // logStart.html(localizedDT);
  }

  function sendToWatson () {

    var userinput = $('#send-watson-input').val();
    console.log(userinput);

    // send-watson-input

    var url = "https://gateway.watsonplatform.net/assistant/api/v1/workspaces/56b441ee-f328-468c-ad5d-fb2c464ffa6f/message?version=2019-02-28";
    var data = JSON.stringify({"input":{"text":userinput}});
    var username = "apikey";
    var password = "Nj3Frv1BxT7FA0JvweChj4p96FD9MiOIB8Y__Ot2ZrBm";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {

        // console.log(this.readyState) // should be 4
        // console.log(this.status) // should be 200 OK
        // console.log(this.responseText) // response return from request

        var xhrdata = "";
        if (xhr.readyState === 4 ) { //XMLHttpRequest.DONE
            if(xhr.status  == 200)  {
                // xhrdata = xhr.responseText; 
                // var response = xhr.response;
                var jsonResponse = JSON.parse(xhr.responseText);
                // alert(xhrdata);
                // alert(response);
                updateTextArea(jsonResponse.input.text , jsonResponse.output.text);
            }   
            else  {
                xhrdata = xhr.status;
                alert(xhrdata);
            }
                
            // document.getElementById("alltext").innerHTML += xhr.response; 
            
        }
    }

    // xml.setRequestHeader("Authorization", "Basic " + btoa(username));
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Authorization', "Basic " + btoa(username + ":" + password));
    xhr.send(data);
    console.log(xhr.status);
  }

  
}());
