
window.addEventListener('load', function() {
	
	var lecteurVideo = document.getElementById('lecteurVideo');
	document.getElementById('boutonPlay').addEventListener('click', play);
	document.getElementById('boutonPause').addEventListener('click', pause);
	document.getElementById('boutonAjouterRSS').addEventListener('click', ajouterRSS);
	document.getElementById('boutonAjouterWeb').addEventListener('click', ajouterWeb);
	var idEnCours = 0;
	var url;

	
	function play()
	{
		lecteurVideo.play();
	}
	
	function pause()
	{
		lecteurVideo.pause();
		//La valeur lecteurVideo.duration aurait dû servir à creer une horloge pour indiquer le temps de la video
		console.log(lecteurVideo.duration);
	}
	
	function ajouterWeb()
	{
		lecteurVideo.setAttribute('src',document.getElementById('lienWeb').value);
		lecteurVideo.load();
	}
		
	var suivant = document.getElementById('boutonSuivant');
	suivant.addEventListener('click',function()
	{
		idEnCours += 1;		
	});
	
	function ajouterRSS()
	{
		//Récupération du flux rss
		var xml = new XMLHttpRequest();
		url = document.getElementById('lienRSS').value;
		xml.addEventListener('readystatechange',function(){
			if(this.readyState == 4 && this.status == 200) {
				var reponseXML = this.responseXML;
				var video = reponseXML.getElementsByTagName("enclosure");
				var titre = reponseXML.getElementsByTagName("title");
				for(var i=2; i<titre.length; i++) 
				{
					titre_à_ecrire = titre[i].childNodes[0].nodeValue;

					//Création de la div
					var division = document.createElement("div");
					division.setAttribute("id",(i-2));

					//Création du titre
					var title = document.createElement("p");
					var titre_txt = document.createTextNode(titre_à_ecrire);
					title.setAttribute("id","titre");
					title.appendChild(titre_txt);
					division.appendChild(title);


					//Création du bouton supprimer
					var suppr = document.createElement("button");
					suppr.addEventListener('click',function (ev) 
					{
						var revSup = ev.target.parentElement;
						if(revSup.parentNode) 
						{
							revSup.parentNode.removeChild(revSup);
						}
					});
					var suppr_txt = document.createTextNode("supprimer");
					suppr.setAttribute("id","supprimer");
					suppr.appendChild(suppr_txt);
					division.appendChild(suppr);
					division.addEventListener("click", function () 
					{
						var testId = this.getAttribute("id");
						idEnCours = parseInt(testId);
						console.log('Chargement de la video en cours');
						lecteurVideo.setAttribute('src',video[testId].getAttribute('url'));
						lecteurVideo.load();
					});
					liste.appendChild(division);
					
					//Création Listener pour passer à la video suivante
					var suivant = document.getElementById('boutonSuivant');
					suivant.addEventListener('click', function()
					{
						videoSuivante(video[idEnCours].getAttribute('url'));
					});
				}
			}
		});	
		xml.open('GET','https://cors-anywhere.herokuapp.com/'+url,true);
		xml.send();
	}
	
	function videoSuivante(videoL)
	{
		lecteurVideo.setAttribute('src',videoL);
		lecteurVideo.load();
	}	
	
	
});