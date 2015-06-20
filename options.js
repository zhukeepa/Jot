// Saves options to chrome.storage
function save_options() {
  var title = document.getElementById('title').value;
  var email = document.getElementById('email').value;
  chrome.storage.sync.set({
    title: title, 
    email: email
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    title: 'Notes from Jot',
    email: ''
  }, function(user) {
    document.getElementById('title').value = user.title; 
    document.getElementById('email').value = user.email; 
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);