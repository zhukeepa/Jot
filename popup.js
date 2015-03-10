document.addEventListener('DOMContentLoaded', function() {

  //load up saved value
  var textarea = document.getElementById('content-text');
  chrome.storage.sync.get('value', function(result) {
    textarea.textContent = result.value;
  });
  textarea.focus();

  //save value on each keypress
  textarea.addEventListener('keyup', function() {
    chrome.storage.sync.set({'value': textarea.value});
  });
});