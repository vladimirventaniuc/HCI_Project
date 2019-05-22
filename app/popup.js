

window.addEventListener('load', function load(event){
  var playButton = document.getElementById('play');
  var stopButton = document.getElementById('stop');
  var pauseButton = document.getElementById('pause');
  var backgroundColor = document.getElementById('background-color');
  var textColor = document.getElementById('text-color')
  var zoomPercentage = document.getElementById('zoomPercentage');
  var zoomIn = document.getElementById('zoom-in');
  var zoomOut = document.getElementById('zoom-out');

  var propertyes = JSON.parse(window.localStorage.getItem('propertyes'));
  if(propertyes === undefined || propertyes === null){
    propertyes = {rate: 1, pitch: 1, volume: 1};
  }
  var colorSettingsFromStore = JSON.parse(window.localStorage.getItem('settings'));
  if(colorSettingsFromStore === undefined || colorSettingsFromStore === null){
    colorSettingsFromStore = {
                  text:{all: true,a: true,p: true,f: true,h: true,},
                    background:{all: true,a: true,p: true,f: true,h: true,}
                 };
    window.localStorage.setItem('settings', JSON.stringify(colorSettingsFromStore));
  }
  //retrieve voice from local storage
  var voice = window.localStorage.getItem('currentVoice');
  if(voice === undefined || voice === null){
    voice = "US English Female";
  }
  // responsiveVoice.setDefaultVoice(voice);

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id,{content: "", type: "getPageZoom"}, function(response) {
            
                      console.log(response.response);
                      zoomPercentage.value = response.response;
                });
              });



  playButton.addEventListener('click', function() { 
    responsiveVoice.resume();
if(!responsiveVoice.isPlaying()) {
  
    chrome.tabs.executeScript( {
      code: "window.getSelection().toString();"
    }, function(selection) {
      text = selection[0];
      if(text === undefined || text === ""){
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id,{content: "", type: "getPageText"}, function(response) {
                      responsiveVoice.speak(response,voice,propertyes);
          });
        });
      }
      else{
      responsiveVoice.speak(text,voice,propertyes);
    }
});
  }
  });

  stopButton.addEventListener('click', function() { 
    responsiveVoice.cancel();
    test();
  });

  pauseButton.addEventListener('click', function() { 
    responsiveVoice.pause();
    // responsiveVoice.resume();
  });

zoomIn.addEventListener('click', function() { 
    zoomPercentage.value = parseInt(zoomPercentage.value, 10) + 50;
    changeZoom(zoomPercentage.value, "changeZoom");
  });

zoomOut.addEventListener('click', function() { 
    zoomPercentage.value = parseInt(zoomPercentage.value, 10) - 50;
    changeZoom(zoomPercentage.value, "changeZoom");
  });

zoomPercentage.addEventListener('input', function (evt) {
            changeZoom(zoomPercentage.value, "changeZoom");
});
  backgroundColor.addEventListener('input', function (evt) {
           var content = {content: {color: backgroundColor.value, settings:colorSettingsFromStore.background}, type: "changeBackgroundColor"};
           changeColor(content);
});

  textColor.addEventListener('input', function (evt) {
    var content = {content: {color: textColor.value, settings:colorSettingsFromStore.text}, type: "changeTextColor"};
    changeColor(content);
});

});

function changeZoom(contentv, typev){
  let zoomLevel = contentv+"%";
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id,{content: zoomLevel, type: typev}, function(response) {
                      console.log(response);
                });
              });
}
function changeColor(contentv){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id,contentv, function(response) {
                      console.log(response);
                });
              });
}