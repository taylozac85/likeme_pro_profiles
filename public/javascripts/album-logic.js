$(function(){
	if (album.images) {
		
		$('#create-album-link').hide();

		$('#album-label').html(album.name);

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

	function getImgSize(imgSrc) {
		var newImg = new Image();

		newImg.onload = function() {
		var height = newImg.height;
		var width = newImg.width;
		}

		newImg.src = imgSrc; // this must be done AFTER setting onload
	};

	(function() {
		var newImg = new Image();
		imgSrc = album_cover;

		newImg.onload = function() {
			var height = newImg.height;
			var width = newImg.width;
			console.log('The image size is '+width+'*'+height);
			
			var $album_cover = $('#pro-album1-cover');
			if (width / height < 330 / 250) {
				$album_cover.css('width', '330');
				$album_cover.css('height', 'auto');
				$album_cover.css('top', '50%');
				$album_cover.css('margin-top', '-60%');
			}
		}

		newImg.src = imgSrc; // this must be done AFTER setting onload

		

		
		
	
	}).call(this);
	

});
