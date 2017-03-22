/***********************************************************************************************/
/* Ces fonctions permettent d'appeler une fonction lorsque la touche enter 					   */
/* est pressée à l'intérieur des input de type text             				 			   */
/***********************************************************************************************/

/* Vérifie la saisie d'enter dans l'input "tbxMessage" */
$('#tbxMessage').keydown(function(e) {
    switch(e.which) {
        case 13 :
            fnCheckMessage(getMessageByInput());
            break;
        case 38 :
            e.preventDefault();
            getLastMessage();
            break;
        default :
            break;
    }
});

/* Vérifie la saisie d'enter dans l'input "tbxUsername" */
$('#tbxUsername').keypress(function(e) {
    if(e.which == 13) {
		reqConnect();
    }
});

/* Vérifie la saisie d'enter dans l'input "tbxChannelName" */
$('#tbxChannelname').keypress(function(e) {
    if(e.which == 13) {
		fnClickJoinChannel();
    }
});

/* Vérifie la saisie d'enter dans l'input "tbxAddress" */
$('#tbxAddress').keypress(function(e) {
    if(e.which == 13) {
        fnPath();
    }
});