function postReCaptcha() {
    console.log('posting');
    
    var messageID = location.pathname.match(/[0-9]+/g)[0];
    var grecaptchaResp = grecaptcha.getResponse();
    
    if(grecaptchaResp !== ''){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',location.origin + '/messages/load');
        xhr.setRequestHeader('Content-Type','application/JSON');
        xhr.addEventListener('load',messageObjCallback);
        xhr.send(JSON.stringify({
            messageID : messageID,
            
        }));    
    } else {
        console.log('Need to prove you\'re not a robot!');
    }
    
    return false;
}

function onReCaptchaLoad(){
    console.log('loading ReCaptcha');
    grecaptcha.render('g-recaptcha', {
      'sitekey' : '6LeUYQwTAAAAAPc4hkkZqlSx30qFDHsXyOV-37ts'
    });
}

function messageObjCallback() {
    if(this.readyState == 4){
        console.log(this);
        if(this.status == 200){
            try{
                var responseObj = JSON.parse(this.response);
                
                if(responseObj && responseObj.success === true){
                    var msgObj = responseObj.messageObj;
                    
                    $('#g-recaptcha').remove();
                    $('#decrypt-container').append("<div style='margin:0 auto; width: 50%'><p>"+msgObj.messageText+"</p></div>");
                }
            } catch(e){
                console.log('invalid JSON from server');
                console.log(e);
            }
        }
    }
}

function autoScrollDown(){
    console.log('called auto scroll');
    setTimeout(function() {
        console.log('scrolling..');
        $('.fa-play-circle').click();}, 1);
}

document.onload = autoScrollDown;