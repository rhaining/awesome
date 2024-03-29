function loadWebsites() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      populateWebsite(data["websites"])
    } else if (this.readyState == 4 && this.status == 0){
      if (window.location.protocol == "file:" && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        document.getElementById("error").innerHTML = "<p>Looks like a cors error.</p><p>Please update <a href=\"about:config\" target=_blank>about:config</a> to set `privacy.file_unique_origin` to `false`.</p><p>thanks!</p>"
        document.getElementById("error").style.display = 'block';
      }
    }

    document.getElementById("loading").style.display = 'none'
  };

  var url = null
  if (window.location.protocol == "file:") {
    if(inIframe()) {
      url = "../websites.json"
    } else {
      url = "websites.json"
    }
  } else {
    url = "https://kindofawesome.com/webring/websites.json"
  }
  xhttp.open("GET", url, true)
  xhttp.send();
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function populateWebsite(websites) {
  if(inIframe()) {
    var parentHost = "unknown.host.ignore.this";
    if(document.referrer != null && document.referrer.length > 0) {
      var parentURL = new URL(document.referrer);
      parentHost = parentURL.hostname;
    }

    var website = null
    while(website == null) {
      website = randomElement(websites)
      if(website["url"].includes(parentHost)) {
        website = null
      }
    }

    var element = document.getElementById("website-link")
    element.innerHTML = website["name"]
    element.href = website["url"]

    document.getElementById("image").src = website["image"]
  } else {
    var membersList = document.getElementById("members")
    for(var i=0; i < websites.length; i++) {
      var website = websites[i]
      membersList.innerHTML += "<li><img src=\"" + website["image"] + "\"/><a href=\"" + website["url"] + "\">" + website["name"] + "</li>\n";
    }
  }
}
