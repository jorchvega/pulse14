var $form = $("#formulario"),
	$titulo = $("#titulo"),
	$url = $("#url"),
	$boton = $("#mostrar-form"),
	$list = $("#contenido"),
	$post = $(".item");


function mostrarFormulario(){
	$form.slideToggle();
	return false;
}

function agregarPost(){
	var url = $url.val(),
		titulo = $titulo.val(),
		$clone = $post.clone();

	$clone.find(".titulo_item a")
		.text(titulo)
		.attr("href", url);

	$clone.hide();

	$list.prepend($clone);

	$clone.fadeIn();
	
	return false;
}

// Eventos
$boton.click( mostrarFormulario );
$form.on("submit", agregarPost );