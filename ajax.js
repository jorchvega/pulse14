$(function(){
	// $.get('logos_footer.html', function(codiguito){
	// 	console.log(codiguito);
	// 	$('footer').append(codiguito);
	// });
	
	// Load reemplaza el contenido completo del elemento a diferencia del
	// metodo de arriba ^ que crea un append y respeta los elementos que 
	// existian en el elemento "footer" por ejemplo
	$("footer").load("logos_footer.html #texto");

	$.get('usuario.json', function(info){
		var avatar = new Image();
		avatar.src = info.avatar;
		avatar.title = info.nombre + " " + info.apellido;

		$("#avatar").append(avatar);
	});


});

var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	var query = 'SELECT * FROM geo.placefinder WHERE text="' + lat + ', ' + lon + '" AND gflags="R"';
	query = encodeURIComponent(query);

	$.ajax({
		url: base_url + "q=" + query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarGeoInfo',
		data: {
			format: 'json'
		}
	});
}

function procesarGeoInfo(datos){
	var res    = datos.query.results.Result;
	var barrio = res.neighborhood;
	var ciudad = res.city;
	var pais   = res.country;
	var woeid  = res.woeid;

	$('#geo').prepend('<p><strong>'+barrio+'</strong><br />'+ciudad+', '+pais+'</p>');

	obtenerClima(woeid);
}

function obtenerClima(woeid){
	var query = 'SELECT * FROM weather.forecast WHERE woeid="' + woeid +'" AND u="c"';
	query = encodeURIComponent(query);

	$.ajax({
		url: base_url + "q=" + query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarClima',
		data: {
			format: 'json'
		}
	});
}

function procesarClima(datos){
	var res  = datos.query.results.channel;
	var temp = res.item.condition.temp;
	var unit = res.units.temperature;
	var code = res.item.condition.code;
	var img  = new Image();
	img.src  = "http://l.yimg.com/a/i/us/we/52/"+code+".gif";

	//console.log(res);
	$('#clima').append(img);
	$('#clima').append(temp + ' °' + unit);

}