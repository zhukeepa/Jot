document.addEventListener('DOMContentLoaded', function() {
  var textarea = document.getElementById('content-text');
  chrome.storage.sync.get('value', function(result) {
    textarea.textContent = result.value;
  });
  textarea.focus();

  //there must be some better way
  textarea.addEventListener('keyup', function() {
    chrome.storage.sync.set({'value': textarea.value});
  });
});