function cleanupTextarea(elementId) {
  var textarea = document.getElementById(elementId)
  textarea.innerHTML = textarea.innerHTML.trim()
}
