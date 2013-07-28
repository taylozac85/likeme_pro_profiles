$(function(){
	if (album.images) {
		
		$('#create-album-link').hide();

		$('#pro-album-1').show();
		var album_cover = album.images[0];
		$('#pro-album1-cover').attr('src', album_cover);

		$('#pro-album-1').on('click', function(){
      var $focusPhoto = $('#profile-modal-large-img');
      $focusPhoto.attr('src', album_cover);
    });

		var i = 0;

		$('#pro-modal-slide-right').on('click', function(){
	    var $focusPhoto = $('#profile-modal-large-img');
	    var focusSource = $focusPhoto.attr('src');
	    var album_length = album.images.length;
    	if (album_length > 0) {
	    	if (i == (album_length - 1)) {
	    		i = 0;
	    	} else {
	    		i++;
	    	};
	    	$focusPhoto.attr('src', album.images[i]);
    	};
		});

		$('#pro-modal-slide-left').on('click', function(){
	    var $focusPhoto = $('#profile-modal-large-img');
	    var focusSource = $focusPhoto.attr('src');
	    var album_length = album.images.length;
    	if (album_length > 0) {
	    	if (i == 0) {
	    		i = album_length - 1;
	    	} else {
	    		i--;
	    	};
	    	$focusPhoto.attr('src', album.images[i]);
    	};
		});
	};
});
