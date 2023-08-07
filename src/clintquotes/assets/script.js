function fetchQuotes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      showQuote(data)
    } else if (this.readyState == 4 && this.status == 0){
      if (window.location.protocol == "file:" && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        document.getElementById("error").innerHTML = "<p>Looks like a cors error.</p><p>Please update <a href=\"about:config\" target=_blank>about:config</a> to set `privacy.file_unique_origin` to `false`.</p><p>thanks!</p>"
        document.getElementById("error").style.display = 'block';
      }
    }
    document.getElementById("loading").style.display = 'none'
  };
  if (window.location.protocol == "file:") {
    xhttp.open("GET", "quotes.json", true)
  } else {
    xhttp.open("GET", "https://kindofawesome.com/clintquotes/quotes.json", true)
  }
  xhttp.send();
}
function random_item(items){
  return items[Math.floor(Math.random()*items.length)]
}
function get_uuid_from_url() {
  var urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('uuid')
}
function showQuote(data) {
  var uuid = get_uuid_from_url()
  var q = undefined
  if(uuid != undefined) {
    for(var i=0; i < data["quotes"].length; i++) {
      if(data["quotes"][i]["uuid"] == uuid) {
        q = data["quotes"][i]
      }
    }
  }
  if(q == undefined) {
    q = random_item(data["quotes"])
  }
  document.getElementById('quote').innerHTML = `&ldquo;${q["quote"]}&rdquo;`
  document.getElementById('date').innerHTML = `&mdash; ${q["date"]}`

  var baseURL = location.protocol + '//' + location.host + location.pathname
  document.getElementById('link').href = `${baseURL}?uuid=${q["uuid"]}`

  var tweet = encodeURIComponent(`"${q["quote"]}" #clintquotes ${baseURL}?uuid=${q["uuid"]}`)
  document.getElementById('tweet').href= `https://twitter.com/intent/tweet?text=${tweet}`
}
