$( "#target" ).submit( function(event) {
	event.preventDefault();
	var input = $(this).serialize();
	console.log(input);

	$.post( "crypt", input, function( data ) {
	  var encMsg = $('#returnMsg');
	  //console.log(encMsg);
	  encMsg[0].style.display = 'block';
	  encMsg[0].innerHTML = data.message;
	}, "json");
});

function updateButton () {
	var btn = document.getElementById('encryptBtn');
	if(btn.innerHTML=='ENCRYPT') {
		btn.innerHTML='DECRYPT';
	} else {
		btn.innerHTML='ENCRYPT';
	}
}

document.getElementById('checkbox_encrypt').addEventListener('click', updateButton);		

