
window.addEventListener('load', function() {
	
	var lecteurVideo = document.getElementById('lecteurVideo');
	document.getElementById('boutonPlay').addEventListener('click', play);
	document.getElementById('boutonPause').addEventListener('click', pause);
	document.getElementById('boutonAjouterRSS').addEventListener('click', ajouterRSS);
	document.getElementById('boutonAjouterWeb').addEventListener('click', ajouterWeb);
	var url = "http://feeds.radiokawa.com/podcast_faster-than-light.xml";

	
	function lancer(lien)
	{
		var urlVideo= document.getElementById(lien).value;
		lecteurVideo.innerHTML = '<source src='+urlVideo+'>';
		lecteurVideo.load();
	}
	
	function play()
	{
		lecteurVideo.play();
	}
	
	function pause()
	{
		lecteurVideo.pause();
		console.log(lecteurVideo.duration);
	}
	
	function ajouterWeb()
	{
		lancer('lienWeb');
	}
		
	function ajouterRSS()
	{
		//Récupération du flux rss
		var xml = new XMLHttpRequest();
		xml.addEventListener('readystatechange',function(){
			if(this.readyState == 4 && this.status == 200) {
				var reponseXML = this.responseXML;
				var video = reponseXML.getElementsByTagName("guid");
				var titre = reponseXML.getElementsByTagName("title");
				var playListe = document.getElementById("liste");
				for(var i=2; i<titre.length; i++) 
				{
					titre_à_ecrire = titre[i].childNodes[0].nodeValue;

					//Création de la div
					var division = document.createElement("div");
					division.setAttribute("id",(i-2));

					//Création du titre audio
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
						testId = division.getAttribute("id");
						var sourced = document.getElementById("source");
						sourced.setAttribute("src",video_xml[testId].childNodes[0].nodeValue);
						video.load();
					});
					liste.appendChild(division);
					
					//Création Listener pour passer à la video suivante
					var suivant = document.getElementById('boutonSuivant');
					suivant.addEventListener('click', function()
					{
				
					});
				}
			}
		});	
		xml.open('GET','https://cors-anywhere.herokuapp.com/'+url,true);
		xml.send();
	}
	
	
	
});