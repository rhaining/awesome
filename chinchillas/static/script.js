function loadLatestPodcastEp() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parsePodcastFeed(this.responseXML)
    } else if (this.readyState == 4 && this.status == 0){
      if (window.location.protocol == "file:" && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        document.getElementById("error").innerHTML = "<p>Looks like a cors error.</p><p>Please update <a href=\"about:config\" target=_blank>about:config</a> to set `privacy.file_unique_origin` to `false`.</p><p>thanks!</p>"
        document.getElementById("error").style.display = 'block';
      }
    }

    // document.getElementById("loading").style.display = 'none'
  };
  if (window.location.protocol == "file:") {
    xhttp.open("GET", "podcast/feed.xml", true)
  } else {
    xhttp.open("GET", "https://kindofawesome.com/chinchillas/podcast/feed.xml", true)
  }
  xhttp.send();
}

function parsePodcastFeed(xmlDoc) {
  episodes = xmlDoc.getElementsByTagName("item")
  mostRecentEp = episodes[0]

  enclosure = mostRecentEp.getElementsByTagName("enclosure")[0]
  url = enclosure.getAttribute("url")

  document.getElementById("podcast-player-source").src = url
  document.getElementById("podcast-player-audio").load()

  document.getElementById("latest-episode-text").innerHTML = "&ldquo;" + mostRecentEp.getElementsByTagName("title")[0].innerHTML + "&rdquo;"
  // document.getElementById("latest-episode-timestamp").innerHTML = mostRecentEp.getElementsByTagName("pubDate")[0].innerHTML
}
