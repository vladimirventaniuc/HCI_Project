	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
	  	if(request.type === "getPageText"){
	  	console.log(request);
	  		setTimeout(() => {
	  			  sendResponse({response: document.body.innerText});
	 		 }, 1000); 
		}
		if(request.type === "changeBackgroundColor"){
			parseChangeColorRequest(request.content.settings,request.content.color,'background-color');
			// if(request.content.settings.all === true){
			// 	document.querySelectorAll('*').forEach(function(node) {
   //  				node.style.backgroundColor = request.content.color;
			// });
			// } else{
			// 	console.log("aici");
			// 	console.log(request.content.settings);
			// 	if(request.content.settings.p === true){
			// 		changeColor("p",request.content.color,'background-color');
			// 	}
			// 	if(request.content.settings.a === true){
			// 		changeColor("article",request.content.color,'background-color');
			// 	}
			// 	if(request.content.settings.h === true){
			// 		changeColor("h",request.content.color,'background-color');
			// 	}
			// 	if(request.content.settings.f === true){
			// 		changeColor("form",request.content.color,'background-color');
			// 	}
	// 			for (var item in request.content.settings) {
	// 			    if (request.content.settings.hasOwnProperty(item) && item!=="all") {
	// 			        console.log(item);
	// 			    }
	// // }
	// 		let paragraphs = document.getElementsByTagName("p");
	// 		console.log(request.content);
	// 		for(elt of paragraphs)
	// 		{
	// 			elt.style['background-color'] = request.content.color;
	// 			elt.style['color'] = "blue";
	// 			document.body.style.backgroundColor = "red";
	// 		}
		// }
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