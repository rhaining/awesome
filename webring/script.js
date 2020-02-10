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
  xhttp.open("GET", "websites.json", true)
  // if (window.location.protocol == "file:") {
  //   xhttp.open("GET", "websites.json", true)
  // } else {
  //   xhttp.open("GET", "https://api.kindofawesome.com/mccarren", true)
  // }
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
    // var parentHost = parent.window.location.hostname
    var parentHost = document.referrer
    console.log("parent host = " + parentHost)

    var website = null
    while(website == null) {
      website = randomElement(websites)
      if(parentHost.lenght > 0 && website["url"].includes(parentHost)) {
        website = null
      }
    }

    var website = randomElement(websites)
    var element = document.getElementById("website-link")
    element.innerHTML = website["name"]
    element.href = website["url"]

    document.getElementById("image").src = website["image"]
  } else {
    var membersList = document.getElementById("members")
    for(var i=0; i < websites.length; i++) {
      var website = websites[i]
      membersList.innerHTML += "<li><a href=\"" + website["url"] + "\">" + website["name"] + "</li>\n";
    }
  }
}
