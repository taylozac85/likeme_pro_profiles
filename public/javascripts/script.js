$(function(){
	
	/* add line breaks to descriptions */
	var text = user.description;
	text = text.replace(/\r?\n/g, '<br />');
	$('#pro-user-desription').html(text);

});