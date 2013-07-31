$(function(){

	if (hide == true) {
		$('div#create-album-name').hide();
		$('div#add-album-photos').show();
	}

	if (photo_added == true) {
		$('#album-created-msg').hide();
		$('#add-photos-msg').show();
		var photo_counter = $('#photo-counter').html();
		if (photo_counter <= 0) {
			$('p#album-upload-photos').show();
		} else {
			$('p#album-upload-photos').hide();
			$('p#album-upload-photos-pl').show();
		}
	}

});

