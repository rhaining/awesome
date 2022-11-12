function loadLessonAvailabilities() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      populateLessonAvailabilities(data["availability"])
      populateLessonsLastUpdated(data["last_updated"])
    } else if (this.readyState == 4 && this.status == 0){
      if (window.location.protocol == "file:" && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        document.getElementById("error").innerHTML = "<p>Looks like a cors error.</p><p>Please update <a href=\"about:config\" target=_blank>about:config</a> to set `privacy.file_unique_origin` to `false`.</p><p>thanks!</p>"
        document.getElementById("error").style.display = 'block';
      }
    }
    
    document.getElementById("loading").style.display = 'none'
  };
  if (window.location.protocol == "file:") {
    xhttp.open("GET", "tennis_lessons_availability.json", true)
  } else {
    xhttp.open("GET", "https://api.kindofawesome.com/mccarren?r=" + Date.now(), true)
  }
  xhttp.send();
}

function populateLessonsLastUpdated(last_updated) {
  document.getElementById("lessons_last_updated").innerHTML = last_updated
}

function populateLessonAvailabilities(availabilities) {
  table = document.getElementById("lessons")

  // unique_dates = availabilities.map(getDate).filter(onlyUnique)
  // unique_times = availabilities.map(getTime).filter(onlyUnique).sort(function (a, b) {
  //   return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
  // })
  row = `<thead>\n\t<tr>\n\t\t<th>\n\t\t\t<div class="date"> date </div>\n\t\t</th><th>name</th><th>availability</th><th>trainer</th>\n`
  row += "\t</tr>\n</thead>\n"
  table.innerHTML += row

  for (var i = 0; i < availabilities.length; i++) {
    availability = availabilities[i]
    row = `<tr><td class="date-cell"><div class="date">${availability.time}</div></td><td><a href="${availability.url}" target=_blank>${availability.name}</a></td><td>${availability.availability}</td><td>${availability.trainer}</td></tr>`
    // row = "\n\t<tr>\n\t\t<td class=\"date-cell\"><div class=\"date\">" + date + "</div></td>\n"
    // matches_by_date = availabilities.filter(function (value, index, self) { return value["date"] == date })
    // for (var j = 0; j < unique_times.length; j++) {
    //   time = unique_times[j]
    //   matches_by_time = matches_by_date.filter(function (value, index, self) { return value["time"] == time })
    //   if(matches_by_time.length > 0) {
    //     row += "\t\t<td><div class=\"time\">"
    //     for (var k=0; k < matches_by_time.length; k++) {
    //       match = matches_by_time[k]
    //       row += "<span class=\"tennis_court\"><a href=\"" + match["url"] + "\" target=_blank>" + match["court"].replace("Tennis", "").replace("Court", "") + "</a></span> "
    //     }
    //     row += "</div></td>\n"
    //   } else {
    //     row += "\t\t<td>&nbsp;</td>\n"
    //   }
    // }
    row += "</tr>"
    table.innerHTML += row
  }
}

function getDate(x) {
  return x["date"]
}
function getTime(x) {
  return x["time"]
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
