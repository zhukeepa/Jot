document.addEventListener('DOMContentLoaded', function() {

  //load up saved value
  var textarea = document.getElementById('content-text');
  var title = ''; 
  var email = ''; 

  chrome.storage.sync.get({
    title: 'Jot message', 
    email: '',
    value: ''
  }, function(msg) {
    // alert(JSON.stringify(msg)); 
    title = msg.title; 
    email = msg.email; 
    textarea.textContent = msg.value;
  });
  textarea.focus();

  //save value on each keypress
  textarea.addEventListener('keyup', function(e) {
    val = textarea.value; 
    chrome.storage.sync.set({'value': val});
    if (e.which == 13) { 
      if (e.ctrlKey) {
        e.preventDefault();

        mailToSelf(val, title, email); 
        textarea.value = "";
        textarea.focus();
      }
    }
  });
});

function mailToSelf(text, subject, email) { 
  data = { "mail": { "to": email,
                   "body": text,
                   "subject": subject }};
  url = "http://jot-mailer.herokuapp.com/send_mail"; 

  if (email == '') {
    alert("You must specify an email address on the options page!"); 
  }

  $.ajax({
    type: "POST",
    url: url,
    data: data,
    dataType: "text"
  });

  var status = document.getElementById('status');
  status.textContent = 'Message sent!';
  setTimeout(function() {
    status.textContent = '';
  }, 2000);
}