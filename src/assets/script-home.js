function fetchProjects() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      populateProjects(data)
    } else if (this.readyState == 4 && this.status == 0){
      if (window.location.protocol == "file:" && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        document.getElementById("error").innerHTML = "<p>Looks like a cors error.</p><p>Please update <a href=\"about:config\" target=_blank>about:config</a> to set `privacy.file_unique_origin` to `false`.</p><p>thanks!</p>"
        document.getElementById("error").style.display = 'block';
      }
    }

    document.getElementById("loading").style.display = 'none'
  };
  if (window.location.protocol == "file:") {
    xhttp.open("GET", "projects.json", true)
  } else {
    xhttp.open("GET", "projects.json", true)
  }
  xhttp.send();

}
function populateProjects(data) {
  var buffer = ""

  for(var i=0; i<data.length; i++){
    var project_section = data[i]
    var title = project_section["title"]
    buffer += `<h6>${title}&hellip;</h6>`

    var projects = project_section["projects"]

    for(var j=0; j<projects.length; j++) {
      var project = projects[j]

      var logo = project['logo']
      var logo_class = null
      var logo_html = null
      switch (logo["type"]) {
        case "img":
        logo_class = "img-logo"
        logo_html = `<img src="${logo["img-url"]}"/>`
          break;

        case "txt":
        logo_class = "text-logo"
        logo_html = logo["text"]
          break;
        case "html":

        logo_class = "html-logo"
        logo_html = logo["html"]
          break;

        default:

      }
      var html = `
          <div class="project-section">
            <div class="${logo_class}"> <a href="${project['url']}">${logo_html}</a></div>
            <div>
              <div class="project-text">
                <a href="${project['url']}">${project['name']}</a>
              </div>
              <div class="project-info">${project['info']}</div>
            </div>
          </div>
      `
      buffer += html
    }

    buffer += `<div class="float-clear">&nbsp;</div>`
  }
  document.getElementById("project-list").innerHTML = buffer
}
