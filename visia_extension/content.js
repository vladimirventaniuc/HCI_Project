	chrome.runtime.onMessage.addListener(	
	  function(request, sender, sendResponse) {
	  	// alert("merge");
	  	document.onkeypress = function (e) {
   				 e = e || window.event;
   				 var key = e.keyCode ? e.keyCode : e.which;
   				 console.log(key);
   			  if (key == 113) {
       			alert("play");
       		//	sendActionMessage("play", "test");
   			 }else if (key == 119) {
       			alert("pause");
       			//sendActionMessage("pause", "test");
   			 }else if (key == 101) {
       			alert("stop");
       			//sendActionMessage("stop", "test");
   			 }
		};
		
		if(request.type === "changeBackgroundColor"){
			parseChangeColorRequest(request.content.settings,request.content.color,'background-color');
		}
		if(request.type === "changeTextColor"){
			parseChangeColorRequest(request.content.settings,request.content.color,'color');
				
		}
			if(request.type === "getPageZoom"){
				setTimeout(() => {
		  			  sendResponse({response: Math.round(window.devicePixelRatio * 100)});
		 		 }, 1000); 
			}
			if(request.type === "changeZoom"){
				document.body.style.zoom = request.content;
			}
		  return true;
		  });

	   function parseChangeColorRequest(settings,color,property){
			if(settings.all === true){
					document.querySelectorAll('*').forEach(function(node) {
	    				node.style[property] = color;
				});
				} else{
					console.log("aici");
					console.log(settings);
					if(settings.p === true){
						changeColor("p",color,property);
					}
					if(settings.a === true){
						changeColor("article",color,property);
					}
					if(settings.h === true){
						changeColor("h",color,property);
					}
					if(settings.f === true){
						changeColor("form",color,property);
					}
		}
	}

		function sendActionMessage(vaction, vtext){
			chrome.runtime.sendMessage({
                    data: {action:vaction, text: vtext}, function (response) {
                    console.dir(response);
                }});
		}

		function changeColor(elem, color, property){
			if(elem === "h"){
				for(i=1; i<10;i++){
					let elements = document.getElementsByTagName(elem+i);
					console.log(elements);
					console.log("in header");
					for(elt of elements)
					{
						elt.style[property] = color;
						console.log("schimbare");
					}
				}
			}
			else{
				let elements = document.getElementsByTagName(elem);
				console.log(elements);
				for(elt of elements)
				{
					elt.style[property] = color;
					console.log("schimbare");
				}
			}
		}
