document.addEventListener('DOMContentLoaded', function() {

  //load up saved value
  var textarea = document.getElementById('content-text');
  chrome.storage.sync.get('value', function(result) {
    textarea.textContent = result.value;
  });
  textarea.focus();

  //save value on each keypress
  textarea.addEventListener('keyup', function(e) {
    val = textarea.value; 
    chrome.storage.sync.set({'value': val});
    if (e.which == 13) { 
      if (e.ctrlKey) {
        e.preventDefault();

        mailToSelf(val, "zhukeepa@gmail.com"); 
        textarea.value = "";
        textarea.focus();
      }
    }
  });
});

function mailToSelf(text, email) { 
  data = { "mail": { "to": email,
                   "body": text,
                   "subject": "" }};
  url = "http://jot-mailer.herokuapp.com/send_mail"; 

  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "text"
  });
}