$(function(){
	
	/* add line breaks to descriptions */
	
	var text = user.description;
	text = text.replace(/\r?\n/g, '<br />');
	$('#pro-user-desription').html(text);

	function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
	}

	/* validate edit profile for profile pic file */

	function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      //etc
      return true;
    }
    return false;
	}

	$(function() {
    $('#edit-form').submit(function() {
      function failValidation(msg) {
        alert(msg); // just an alert for now but you can spice this up later
        return false;
      }

      var file = $('#form-profile-pic');
      if (file.val() != "" && !isImage(file.val())) {
        return failValidation('Please select a valid image');
      }

      // success at this point
      // indicate success with alert for now
      return true;
      return false; // prevent form submitting anyway - remove this in your environment
    });

	});

});