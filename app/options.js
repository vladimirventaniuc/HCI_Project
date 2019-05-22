// Get the modal

window.addEventListener('load', function load(event){
	//voice initialization
	var voicelist = responsiveVoice.getVoices();
	var selector = document.getElementById("voices");
	var voice = window.localStorage.getItem('currentVoice');
	var propertyes = JSON.parse(window.localStorage.getItem('propertyes'));
	var colorSettingsFromStore = JSON.parse(window.localStorage.getItem('settings'));

	var pitch = document.getElementById("pitch");
	var volume = document.getElementById("volume");
	var rate = document.getElementById("rate");
	var voiceSettings = document.getElementById("expandVoiceSettings");
	var colorSettings = document.getElementById("expandCollorSettings");
	var test = document.getElementById("test");
	var test2 = document.getElementById("test2");
	//checkboxes color
	var text_all = document.getElementById("text-all");
	var text_a = document.getElementById("text-a");
	var text_p = document.getElementById("text-p");
	var text_f = document.getElementById("text-f");
	var text_h = document.getElementById("text-h");
	//checkboxes background
	var background_all = document.getElementById("background-all");
	var background_a = document.getElementById("background-a");
	var background_p = document.getElementById("background-p");
	var background_f = document.getElementById("background-f");
	var background_h = document.getElementById("background-h");

	if(colorSettingsFromStore === undefined || colorSettingsFromStore === null){
		colorSettingsFromStore = {
									text:{all: true,a: true,p: true,f: true,h: true,},
								  	background:{all: true,a: true,p: true,f: true,h: true,}
								 };
		window.localStorage.setItem('settings', JSON.stringify(colorSettingsFromStore));
	}
	for (var item in colorSettingsFromStore) {
	    if (colorSettingsFromStore.hasOwnProperty(item)) {
	        for (var property in colorSettingsFromStore[item]) {
			    if (colorSettingsFromStore[item].hasOwnProperty(property)) {
			   		console.log(item+"-"+property);
			        document.getElementById(item+"-"+property).checked = colorSettingsFromStore[item][property];
			    }
			}
	    }
	}

  	voiceSettings.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
      var contentForColor = colorSettings.nextElementSibling;
      contentForColor.style.display = "none";
    }
  });
  	colorSettings.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
      var contentForVoice = voiceSettings.nextElementSibling;
      contentForVoice.style.display = "none";
    }
  });


	if(propertyes === undefined || propertyes === null){
		propertyes = {rate: 1, pitch: 1, volume: 1};
		window.localStorage.setItem('propertyes', JSON.stringify(propertyes));
	}
	pitch.value=propertyes.pitch;
	volume.value=propertyes.volume;
	rate.value=propertyes.rate;

	if(voice === undefined || voice === null){
	    voice = "US English Female";
	}

	voicelist.forEach(function (item, index) {
		var option = document.createElement("option");
		option.text = item.name;
		if(item.name === voice){
			option.selected = true;
		}
		selector.add(option);
	});

	selector.addEventListener('input', function (evt) {
		window.localStorage.setItem('currentVoice', evt.target.value);
});
	pitch.addEventListener('input', function (evt) {
		propertyes.pitch = evt.target.value;
		setPropertyes(propertyes);
});
	volume.addEventListener('input', function (evt) {
		propertyes.volume = evt.target.value;
		setPropertyes(propertyes);
});
	rate.addEventListener('input', function (evt) {
		propertyes.rate = evt.target.value;
		setPropertyes(propertyes);
});


	text_all.addEventListener('input', function (evt) {
		if(text_all.checked === true){
			text_a.checked = true;
			text_f.checked = true;
			text_p.checked = true;
			text_h.checked = true;
		}else{
			text_a.checked = false;
			text_f.checked = false;
			text_p.checked = false;
			text_h.checked = false;
		}
		colorSettingsFromStore.text.all = text_all.checked;
		colorSettingsFromStore.text.a = text_a.checked;
		colorSettingsFromStore.text.f = text_f.checked;
		colorSettingsFromStore.text.p = text_p.checked;
		colorSettingsFromStore.text.h = text_h.checked;
		setColorSettings(colorSettingsFromStore);
});
	text_a.addEventListener('input', function (evt) {
		if(text_a.checked === false){
			text_all.checked=false;
		}
		colorSettingsFromStore.text.all = text_all.checked;
		colorSettingsFromStore.text.a = text_a.checked;
		setColorSettings(colorSettingsFromStore);
});
	text_f.addEventListener('input', function (evt) {
		if(text_f.checked === false){
			text_all.checked=false;
		}
		colorSettingsFromStore.text.all = text_all.checked;
		colorSettingsFromStore.text.f = text_f.checked;
		setColorSettings(colorSettingsFromStore);
});
	text_p.addEventListener('input', function (evt) {
		if(text_p.checked === false){
			text_all.checked=false;
		}
		colorSettingsFromStore.text.all = text_all.checked;
		colorSettingsFromStore.text.p = text_p.checked;
		setColorSettings(colorSettingsFromStore);
});
	text_h.addEventListener('input', function (evt) {
		if(text_h.checked === false){
			text_all.checked=false;
		}
		colorSettingsFromStore.text.all = text_all.checked;
		colorSettingsFromStore.text.h = text_h.checked;
		setColorSettings(colorSettingsFromStore);
});


	background_all.addEventListener('input', function (evt) {
		if(background_all.checked === true){
			background_a.checked = true;
			background_f.checked = true;
			background_p.checked = true;
			background_h.checked = true;
		}else{
			background_a.checked = false;
			background_f.checked = false;
			background_p.checked = false;
			background_h.checked = false;
		}
		colorSettingsFromStore.background.all = background_all.checked;
		colorSettingsFromStore.background.a = background_a.checked;
		colorSettingsFromStore.background.f = background_f.checked;
		colorSettingsFromStore.background.p = background_p.checked;
		colorSettingsFromStore.background.h = background_h.checked;
		setColorSettings(colorSettingsFromStore);
	});
	background_a.addEventListener('input', function (evt) {
		if(background_a.checked === false){
			background_all.checked=false;
		}
		colorSettingsFromStore.background.all = background_all.checked;
		colorSettingsFromStore.background.a = background_a.checked;
		setColorSettings(colorSettingsFromStore);
});
	background_p.addEventListener('input', function (evt) {
		if(background_p.checked === false){
			background_all.checked=false;
		}
		colorSettingsFromStore.background.all = background_all.checked;
		colorSettingsFromStore.background.p = background_p.checked;
		setColorSettings(colorSettingsFromStore);
});
	background_f.addEventListener('input', function (evt) {
		if(background_f.checked === false){
			background_all.checked=false;
		}
		colorSettingsFromStore.background.all = background_all.checked;
		colorSettingsFromStore.background.f = background_f.checked;
		setColorSettings(colorSettingsFromStore);
});
	background_h.addEventListener('input', function (evt) {
		if(background_h.checked === false){
			background_all.checked=false;
		}
		colorSettingsFromStore.background.all = background_all.checked;
		colorSettingsFromStore.background.h = background_h.checked;
		setColorSettings(colorSettingsFromStore);
});
	
 //  var option = document.createElement("option");
 //  option.text = "Kiwi";
 //  x.add(option);
	// console.log(voicelist);	
	// var modal = document.getElementById("optionsModal");
});

function setPropertyes(propertyes){
	window.localStorage.setItem('propertyes', JSON.stringify(propertyes));
}
function setColorSettings(settings){
	window.localStorage.setItem('settings', JSON.stringify(settings));
}

