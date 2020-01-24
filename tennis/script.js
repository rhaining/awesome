function loadAvailabilities() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      populateAvailabilities(data["availability"])
      populateLastUpdated(data["last_updated"])
    }
  };
  if (window.location.protocol == "file:") {
    xhttp.open("GET", "tennis_courts_availability.json", true)
  } else {
    xhttp.open("GET", "https://api.kindofawesome.com/mccarren", true)
  }
  xhttp.send();
}

function populateLastUpdated(last_updated) {
  document.getElementById("last_updated").innerHTML = last_updated
}

function populateAvailabilities(availabilities) {
  table = document.getElementById("availability")

  unique_dates = availabilities.map(getDate).filter(onlyUnique)
  unique_times = availabilities.map(getTime).filter(onlyUnique).sort(function (a, b) {
    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
  })
  row = "<tr><th></th>"
  for (var i = 0; i < unique_times.length; i++) {
    time = unique_times[i]
    row += "<th>" + time + "</th>"
  }
  row += "</tr>"
  table.innerHTML += row

  for (var i = 0; i < unique_dates.length; i++) {
    date = unique_dates[i]
    row = "<tr><td>" + date + "</td>"
    matches_by_date = availabilities.filter(function (value, index, self) { return value["date"] == date })
    for (var j = 0; j < unique_times.length; j++) {
      time = unique_times[j]
      matches_by_time = matches_by_date.filter(function (value, index, self) { return value["time"] == time })
      if(matches_by_time.length > 0) {
        row += "<td>"
        for (var k=0; k < matches_by_time.length; k++) {
          match = matches_by_time[k]
          row += "<div class=\"tennis_court\"><a href=\"" + match["url"] + "\" target=_blank>" + match["court"].replace("Tennis", "").replace("Court", "") + "</a></div> "
        }
        row += "</td>"
      } else {
        row += "<td>&nbsp;</td>"
      }
    }
    row += "</tr>"
    table.innerHTML += row
  }

  document.getElementById("loading").style.display = 'none'
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
