function go() {
  var buffer = "<div style='overflow: hidden;padding-top: 15.625%;position: relative;'>\n"
  // buffer += "\t<iframe style='border: 1; height: 100%;left: 0;position: absolute;top: 0;width:100%;' src='https://kindofawesome.com/webring/iframe.html'></iframe>\n"
  buffer += "\t<iframe style='border: 1; height: 94%;left: 0;position: absolute;top: 0;width:99%;' src='iframe/index.html'></iframe>\n"
  buffer += "</div>"

  document.write(buffer)
}

go()
