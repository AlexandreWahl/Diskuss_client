/* Tableau des emotes disponibles pour l'utilisateur */
var emotes = {
	// regex : image
	":-?\\)" : "sourire.png",
	":-?\\(" : "triste.png",
	"[8B]-?\\)" : "cool.png",
	":-?[dD]" : "rigole.png",
	";-?\\)" : "clindoeil.png",
	":-?[oO]" : "surpris.png",
	";-?\\(" : "pleur.png",
	":-?[pP]" : "langue.png",
	":-?[\\\/]" : "penchee.png",
	":-?\\|" : "bouchebee.png",
	":-?\\$" : "blush.png",
	":'\\)" : "rire.png",
	"(\\(heart\\))" : "heart.png",
	"(\\(inlove\\))" : "inlove.png",
	"(\\(kiss\\))" : "kiss.png",
	"(\\(swiss\\))" : "swiss.png",
	"(\\(pizza\\))" : "pizza.png",
	"(\\(kfc\\))" : "kfc.png",
	"(\\(burger\\))" : "burger.png",
	"(\\(bisou\\))" : "bisou.png",
	"(\\(rich\\))" : "rich.png",
	"(\\(malade\\))" : "malade.png",
	"(\\(zzz\\))" : "zzz.png",
	"(\\(fist\\))" : "fist.png",
	"(\\(angry\\))" : "angry.png",
	"(\\(feu\\))" : "feu.png"
};

/* Tables de l'aide pour les emotes */
var helpEmotes = {
	// regex : image
	":-) :)" : "sourire.png",
	":-( :(" : "triste.png",
	"8-) B-) 8) B)" : "cool.png",
	":-d :-D :d :D" : "rigole.png",
	";-) ;)" : "clindoeil.png",
	":-o :-O :o :O" : "surpris.png",
	";-( ;(" : "pleur.png",
	":-p :-P :p :P" : "langue.png",
	// ":-\ :\" : "penchee.png",
	":-| :|" : "bouchebee.png",
	":-$ :$" : "blush.png",
	":')" : "rire.png",
	"(heart)" : "heart.png",
	"(inlove)" : "inlove.png",
	"(kiss)" : "kiss.png",
	"(swiss)" : "swiss.png",
	"(pizza)" : "pizza.png",
	"(kfc)" : "kfc.png",
	"(burger)" : "burger.png",
	"(bisou)" : "bisou.png",
	"(rich)" : "rich.png",
	"(malade)" : "malade.png",
	"(zzz)" : "zzz.png",
	"(fist)" : "fist.png",
	"(angry)" : "angry.png",
	"(feu)" : "feu.png"
};

/* Tableau des commandes disponibles pour l'utilisateur */
var commands = {
	// commande : description
	'\/desc "(.)+"' : "description",
	'\/owner "[a-zA-Z0-9 ]+"' : "owner",
	'\/mp "[a-zA-Z0-9]+" "[^><]+"' : "prive",
	'\/help' : "help",
	'\/keep "true|false"' : "keep",
	'\/empty' : "empty",
	'\/channels' : "channels",
	'\/users' : "users",
	'\/join "[a-zA-Z0-9 ]+"' : "join",
	'\/leave' : "leave",
	'\/disconnect' : "disconnect",
	'\/whois "[a-zA-Z0-9 ]+"' : "whois",
	'\/emotes' : "emotes"
};

/* Un objet qui contient le pseudonyme et l'id unique de l'utilisateur connecté */
var connectedUser = {id:"", username:"", firstjoin:true};

/* Contient le nom et le type de l'onglet sur lequelle l'utilisateur se trouve */
var actualTab = "";

/* Un timer utilisé pour recevoir toutes les notifications concernant l'utilisateur */
var myTimerNotices = "";

/* Un timer utilisé pour vérifier le nom du salon actif et pour changer le titre de la page en fonction de celui-ci*/
var myTimerTitle = "";

/* Une variable utilisée pour stocker le dernier message envoyé */
var lastMessage = "";

/* Une variable à true si la case à cocher "cbxAutoScroll" est cochée et à false si elle ne l'est pas */
var autoScroll = true;

/* Mise à jour de tous les onglets*/
$('#divChat').tabs();

/* Focus dans l'input "tbxUsername" lors de l'arrivée sur la page */
$('#tbxUsername').focus();

/* Permet d'afficher la version du serveur Diskuss */

/***********************************************************************************************/
/*  */
/***********************************************************************************************/

/* Retourne l'id de l'utilisateur connecté */
function getUserID() {
	return connectedUser.id;
}

/* Retourne le nom de l'utilisateur connecté */
function getUserName() {
	return connectedUser.username;
}

/* Retourne la valeur de l'input de type text "tbxUsername" */
function getUserNameByInput() {
	return $('#tbxUsername').val();
}

/* Retourne la valeur de l'input de type text "tbxChannelName" */
function getChannelNameByInput() {
	return $('#tbxChannelname').val();
}

/* Retourne la valeur de l'input de type text "tbxMessage" */
function getMessageByInput() {
	return $('#tbxMessage').val();
}

function setFirstJoin(statut) {
	connectedUser.firstjoin = statut;
}

/* Retourne la valeur de actualTab */
function getActiveChannel() {
	return actualTab;
}

/* Change la valeur de actualTab en "name" */
function setActiveChannel(name) {
	actualTab = name;
}

/* Retourne le type du salon */
function getChannelType(name) {
	var tab = name.split('-');
	return tab[1];
}

/* Retourne le nom du salon */
function getChannelName(name) {
	var tab = name.split('-');
	return tab[0];
}

/* */
function setLastMessage(msg) {
	lastMessage = msg;
}

/* */
function getLastMessage() {
	$("#tbxMessage").val(lastMessage);
}

/***********************************************************************************************/
/*  */
/***********************************************************************************************/

function fnPath() {
	var ip = $('#tbxAddress').val();

	if(ip == "localhost") {
		setServerPath(ip);
		reqVersion();
	} else {
		var ipCheck = ip.split(".");

		if(ipCheck.length == 4) {
			if (parseInt(ipCheck[0]) >= 0 && parseInt(ipCheck[0]) < 256 && parseInt(ipCheck[1]) >= 0 && parseInt(ipCheck[1]) < 256 && parseInt(ipCheck[2]) >= 0 && parseInt(ipCheck[2]) < 256 && parseInt(ipCheck[3]) >= 0 && parseInt(ipCheck[3]) < 256) {
				setServerPath(ip);
				reqVersion();
			} else {
				alert('Veuillez entrer une adresse IP correcte.');
				$('#tbxAddress').val("127.0.0.1");
			}
		} else {
			alert('Veuillez entrer une adresse IP correcte.');
			$('#tbxAddress').val("127.0.0.1");
		}
	}
}

function getPath() {
	return serverpath;
}

/* Cette fonction vérifie si la case à cocher est cochée ou non */
function fnCheckAutoScroll() {
	if($('#cbxAutoScroll').is(":checked"))
		autoScroll = true;
	else
		autoScroll = false;
}

/* Cette fonction permet de mettre à jour le titre de la page lorsque l'utilisateur change d'onglet */
function fnSetTitle() {
	var title = getChannelName(actualTab);

	if(title == "") {
		window.parent.document.title = 'Diskuss - Page d\'accueil';
	} else {
		window.parent.document.title = 'Diskuss - ' + getChannelName(actualTab);
	}
}

/* Cette fonction lance le timer pour le changement de titre */
function fnTitleTimerStart() {
	fnTitleInterval();
}

/* Permet d'enregistrer un utilisateur, en stockant son nom et son id unique */
function fnRegisterUser(username, id) {
	connectedUser.username = username;
	connectedUser.id = id;
}

/* Permet de supprimer les données de l'utilisateur connecté */
function fnDeleteUser() {
	connectedUser.username = "";
	connectedUser.id = "";
}

/* Permet de lancer un timer qui va appeler la fonction "reqFetchNotices" toutes les secondes */
function fnTitleInterval() {
	myTimerTitle = setInterval(function(){
		fnSetTitle();
	}, 200);
}

/* Permet de lancer un timer qui va appeler la fonction "reqFetchNotices" toutes les secondes */
function fnNoticesInterval() {
	myTimerNotices = setInterval(function(){
		reqFetchNotices();
	}, 200);
}

/* Permet de faire descendre le chat lors de nouvreaux messages */
function fnScrollText() {
	var height = 0;
	$('.message-' + actualTab).each(function(i, value){
		height += parseInt($(this).height());
	});
	$('#tabs-' + actualTab).animate({scrollTop: height});
}

/* Permet de clear l'interval "myTimerNotices" */
function fnClearIntervalNotices() {
	clearInterval(myTimerNotices);
}

/* Est appelé lors d'un clic sur le bouton "buttonJoinChannel" */
function fnClickJoinChannel() {
	var channelName = "";
	if(connectedUser.firstjoin == true) {
		channelName = 'Accueil';
		connectedUser.firstjoin = false;
	} else {
		channelName = $('#tbxChannelname').val();
	}

	var count = $('#ulTabs > li').length;

	if(count < 4) {
		if(fnFilterChannelName(channelName)) {
			if(!$('#tabs-' + channelName + '-prive').length && !$('#tabs-' + channelName + '-normal').length)
				reqJoinChannel(channelName);
			else {
				alert('Un salon portant ce nom est déjà ouvert!');
				$('#tbxChannelname').val('');
			}
		} else {
			$('#tbxChannelname').val('');
			alert('Veuillez entrer un nom de salon valide');
		}
	} else {
		alert('Le nombre maximal de salon ouvert est dàjà atteint');
		$('#tbxChannelname').val('');
	}
}

 /* Cette fonction permet de filtrer le nom saisit par l'utilisateur, si l'utilisateur saisit un caractère qui ne fait pas partir
 * de l'expression régulière, un message d'erreur s'affiche */
function fnFilterUsername(name) {
	var filterName = name.match(new RegExp("[a-zA-Z0-9-_]{3,20}", 'i'));

	var length = name.length;

	if (length > 20) {
		alert('La taille maximale pour le champ est de 20 caractères');
		return false;
	} else if (length < 3) {
		alert('La taille minimale pour le champ est de 3 caractères');
		return false;
	} else {
		if(name == filterName)
			return true;
		else
			return false;
	}
}

/* Cette fonction permet de filtrer le nom saisit par l'utilisateur, si l'utilisateur saisit un caractère qui ne fait pas partir
 * de l'expression régulière, un message d'erreur s'affiche */
function fnFilterChannelName(name) {
	var filterName = name.match(new RegExp("[a-zA-Z0-9-_]{2,12}", 'i'));

	var length = name.length;

	if (length > 12) {
		alert('La taille maximale pour le nom du salon est de 12 caractères');
		return false;
	} else if (length < 2) {
		alert('La taille minimale pour le nom du salon est de 2 caractères');
		return false;
	} else {
		if (name == filterName)
			return true;
		else
			return false;
	}
}

/* Raccourcis pour afficher l'interface lors de la connexion de l'utilisateur */
function fnTchatInterface() {
	$('p[name=infoNomUser]').text("Vous êtes connecté en tant que " + getUserName());
	$('#divConnect').css({ "display": "none"});
	$('#divChannel').css({ "display": "block", "top" : "15%"});
	$('#title').css({'top' : '5%'});
	$('#divNomUser').css({ "display": "inline-block"});
}

/* Raccourcis pour cacher l'interface lors de la connexion de l'utilisateur */
function fnConnectInterface() {
	$('#divConnect').css({ "display": "block"});
	$('#divChannel').css({ "display": "none"});
	$('#divChat').css({ "display": "none"});
	$('#divNomUser').css({ "display": "none"});
	$('#divActionsUser').css({ "display": "none"});
	$('#title').css({'top' : '30%'});
}

/* Cette fonction est utilisée pour ajouter un onglet de chat privé */
function fnTabPrivateMessage(msg, sender, tab) {
	if(sender != tab) {
		if(!$('#tabs-' + tab + '-prive').length)
			fnAddChannelTab(tab, 'prive');
		hour = fnGetTime();
		content = '<span style="text-decoration:underline">' + fnFilterMessage(sender) + '</span> : ' + fnFilterMessage(msg);
		var tab_pv = tab + '-prive';
		fnPrintMessage(tab_pv, content, hour);
	}
}

/* Permet de simplifier l'ajout d'un message dans la div de tchat */
function fnPrintMessage(tab, content, hour) {
	$('#tabs-' + tab).append('<div class="message-' + tab + '">' + hour + content + '</div>');
	if(autoScroll == true) {
		fnScrollText();
	}
}

/* Permet d'afficher la liste des salons disponibles */
function fnPrintChannelsList(channelList) {
	var content = "";

	var size = channelList.length;

	if(size > 1) {
		content = '<span style="font-style:italic;">Il y a actuellement ' + size + ' salons disponibles : ';
		for(var i=0; i< size;i++) {
			if(size -1 == i)
				content += channelList[i].name;
			else
				content += channelList[i].name + ', ';
		}
	} else {
		content = '<span style="font-style:italic;">Il y a actuellement ' + size + ' salon disponible : ';
		content += channelList[0].name;
	}

	content += '</span>';
	var hour = fnGetTime();

	fnPrintMessage(actualTab, content, hour);
}

/* Permet d'afficher la liste des utilisateurs connectés */
function fnPrintUsersList(userList) {
	var content = "";

	var size = userList.length;

	if(size > 1) {
		content = '<span style="font-style:italic;">Il y a actuellement ' + size + ' utilisateurs connectés : ';
		for(var i=0; i< size;i++) {
			if(size -1 == i)
				content += userList[i].nick;
			else
				content += userList[i].nick + ', ';
		}
	} else {
		content = '<span style="font-style:italic;">Il y a actuellement ' + size + ' utilisateur connecté : ';
		content += userList[0].nick;
	}

	content += '</span>';
	var hour = fnGetTime();

	fnPrintMessage(actualTab, content, hour);
}

/* Permet d'obtenir des infos sur un utilisateur, son nom, les salons dans lesquelles il se trouve */
function fnWhois(data) {
	var nick = data.nick;

	var channels = data.channels;
	var size = Object.keys(channels).length;

	var content = '<span style="font-style:italic;">L\'utilisateur ' + nick + ' est actuellement dans ' + size;

	if(size > 1)
		content += ' salons : ';
	else
		content += ' salon : ';

	var i = 1;
	Object.keys(channels).forEach(function(channel) {
		if(size == i)
			content += channel;
		else
			content += channel + ', ';
		i++;
	});

	content += '</span>';
	var hour = fnGetTime();

	fnPrintMessage(actualTab, content, hour);
}

/* Permet de retourner l'heure actuelle */
function fnGetTime() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();

	if(h < 10)
		h = '0' + h;

	if(m < 10)
		m = '0' + m;

	return '[' + h + ':' + m + '] ';
}

/* Permet d'afficher la liste des emotes utilisables */
function fnShowEmotes() {
	var content = '<span style="font-style:italic;">Liste des émoticônes disponibles : <br>';
	var hour = fnGetTime();

	Object.keys(helpEmotes).forEach(function(emote) {
		content += emote + ' <i class="fa fa-arrow-right" aria-hidden="true"></i> ' +
			'<img name="emote" style="vertical-align:middle;" ' +
			'src="emotes/' + helpEmotes[emote] + '" ' +
			'height="16px" width="16px" /><br>';
	});
	content += '</span>';

	fnPrintMessage(actualTab, content, hour);
}

/* Permet d'ajouter un onglet lors de la création d'un nouveau salon */
function fnAddChannelTab(name, type) {
	setActiveChannel(name + '-' + type);

	if(name == 'Accueil') {
		$('#ulTabs').append('<li class="tabs-ul" id="tabs-ul-' + actualTab + '">' +
			'<a href="#tabs-' + actualTab + '">' + name + '</a></li>');
	} else {
		$('#ulTabs').append('<li class="tabs-ul" id="tabs-ul-' + actualTab + '">' +
		'<a href="#tabs-' + actualTab + '">' + name + '</a>' +
		'<i id="tabs-close-' + actualTab + '" class="fa fa-times"></i>' +
		'</li>');
	}

	$('#tabs-ul-' + name + '-' + type + ' a').click(function() {
		setActiveChannel(name + '-' + type);
	});

	$('#tabs-close-' + name + '-' + type).click(function() {
		fnRemoveChannelTab(name, type);
	});

	$('#ulTabs').after('<div style="overflow-y:auto;border: 1px solid grey;border-radius:3px;" ' +
		'class="tabs" id="tabs-' + actualTab + '"></div>');
	$('#tbxMessage').focus();

	$('#divChat').tabs("refresh");
	$('#tabs-ul-' + actualTab + ' a').click();

	if(name == "Accueil")
		fnShowWelcomeMessage();

	$('.ui-tabs .ui-tabs-panel').css('padding', '0px');
	$('#tbxChannelname').val('');
}

/* Permet de supprimer un onglet lors de la suppression d'un salon */
function fnRemoveChannelTab(name, type) {
	var fullName = name + '-' + type;
	$('#tabs-ul-' + fullName).remove();
	$('#tabs-' + fullName).remove();
	$('#divChat').tabs("refresh");
	if(type == "normal")
		reqLeaveChannel(name);
	if(fullName == actualTab)
		$('#tabs-ul-Accueil-normal a').click();
}

/* Cette fonction est appelée lorsque l'utilisateur clic sur le bonton "buttonLeaveChannel" */
function fnClickLeaveChannel() {
	var name = getChannelName(actualTab);
	var type = getChannelType(actualTab);
	if(name == "Accueil")
		alert('Vous ne pouvez pas quitter le salon d\'accueil');
	else
		fnRemoveChannelTab(name, type);
}

/* Permet de filtrer les messages */
function fnFilterMessage(msg) {
	var filterMsg = msg.replace(/</g, "&lt;").replace(/>/g, "&gt;");

	var lien = filterMsg.split("://");
	if(lien[0] == "http" || lien[0] == "https") {
		return filterMsg;
	}
	else
	{
		Object.keys(emotes).forEach(function(emote) {
			while(filterMsg.match(new RegExp(emote, 'i')))
				filterMsg = filterMsg.replace(new RegExp(emote, 'i'), '<img name="emote" ' +
					'style="vertical-align:middle;" src="emotes/' + emotes[emote] + '" ' +
					'height="16px" width="16px" />');
		});
	}

	return filterMsg;
}

/* Permet d'afficher les messages dans le div de chat */
function fnShowWelcomeMessage() {
	var hour = fnGetTime();
	var nick = getUserName();
	var content = '<span style="font-style:italic;">Bienvenue ' + nick + ' dans le salon ' +
		'd\'Accueil du serveur de discussion Diskuss, ' +
		'pour afficher les différentes commandes utilisables entrez "/help"</span>';
	fnPrintMessage(actualTab, content, hour);
}

/* Permet de traiter les notifications */
function fnCheckNotice(notices) {
	for(var i = 0; i < notices.length; i++) {
		if(notices[i].type != "privateMessage")
			var chan = notices[i].channel.name;

		console.log(notices);

		var content = "";
		var nick = "";

		var type = getChannelType(actualTab);

		var time = notices[i].time.split("T");
		var heure = time[1].split(":");
		var h = parseInt(heure[0]) + 1;
		var m = parseInt(heure[1]);

		if(h < 10)
			h = '0' + h;
		if(m < 10)
			m = '0' + m;

		var hour = '[' + h + ':' + m + '] ';

		switch(notices[i].type) {
			case 'channelJoin':
				nick = notices[i].nick;
				content = '<span style="font-style:italic;">' + fnFilterMessage(nick) + ' a rejoint le salon</span>';
				fnPrintMessage(chan + '-normal', content, hour);
				break;
			case 'channelLeave':
				nick = notices[i].nick;
				content = '<span style="font-style:italic;">' + fnFilterMessage(nick) + ' a quitté le salon</span>';
				fnPrintMessage(chan + '-normal', content, hour);
				break;
			case 'channelMessage':
				nick = notices[i].nick;
				var msg = notices[i].message;
				content = '<span style="text-decoration:underline">' + fnFilterMessage(nick) + '</span> : ' + fnFilterMessage(msg);
				fnPrintMessage(chan + '-' + type, content, hour);
				break;
			case 'privateMessage':
				var sender = notices[i].sender;
				if(sender != getUserName()) {
					var message = notices[i].message;
					if(!$('#tabs-' + sender + '-prive').length)
						fnAddChannelTab(sender, 'prive');
					var tab_pv = sender + '-prive';
					content = '<span style="text-decoration:underline">' + fnFilterMessage(sender) + '</span> : ' + fnFilterMessage(message);
					fnPrintMessage(tab_pv, content, hour);
				} else {
					alert('Impossible de se contacter soi-même par message privé !');
				}
				$('#tbxMessage').blur();
				break;
			case 'channelDescription':
				nick = notices[i].nick;
				var new_desc = notices[i].channel.description;
				content = '<span style="font-style:italic;">' + fnFilterMessage(nick) + ' a changé la description en "' + fnFilterMessage(new_desc) + '"</span>';
				fnPrintMessage(chan + '-normal', content, hour);
				break;
			case 'channelKeep':
				nick = notices[i].nick;
				// console.log('Dans switch avant parse : ' + notices[i].channel.keep);
				var value = notices[i].channel.keep.toString();
				// console.log('Dans switch après parse : ' + value);
				content = '<span style="font-style:italic;">' + fnFilterMessage(nick) + ' a changé la persistance du salon en ' + fnFilterMessage(value) + '</span>';
				fnPrintMessage(chan + '-normal', content, hour);
				break;
			case 'channelOwner':
				nick = notices[i].nick;
				var owner = notices[i].channel.owner;
				content = '<span style="font-style:italic;">' + fnFilterMessage(nick) + ' a nommé ' + fnFilterMessage(owner) + ' propriétaire du salon</span>';
				fnPrintMessage(chan + '-normal', content, hour);
				break;
			default:
				console.log('Autre');
				break;
		}
	}
}

/* Permet d'afficher une liste des commandes utilisables */
function fnShowHelp() {
	var commandList = { '/help' : 'Affiche la liste des commande disponibles',
						'/mp "username" "message"' : 'Permet d\'envoyer un message privé à "username"',
						'/owner "username"': '"Username" devient propriétaire du salon',
						'/desc "description"': 'Change la description du salon en "description"',
						'/keep "value"': 'Permet de garder le salon une fois déconnecter, true pour activer, false pour désactiver',
						'/empty': 'Vide le tchat',
						'/users': 'Affiche la lsite des utilisateurs',
						'/channels': 'Affiche la lsite des salons',
						'/join "salon"' : 'Rejoint le salon "salon"',
						'/leave' : 'Quitte le salon actuel',
						'/disconnect' : 'Déconnecte le client',
						'/whois "username"' : 'Retourne les informations du client "username"',
						'/emotes' : 'Affiche la liste des émoticônes disponibles avec le texte correspondant',
	};

	var hour = fnGetTime();

	for(command in commandList) {
		var hour = fnGetTime();
		var nick = getUserName();
		var content = '<span style="font-style:italic;">' + command + ' : ' + commandList[command] + '</span>';
		fnPrintMessage(actualTab, content, hour)
	}
}

/* Permet de filtrer un message pour savoir si c'est un simple message ou une commande */
function fnCheckMessage(msg) {
	var type = getChannelType(actualTab);
	var chan = getChannelName(actualTab);
	var firstchar = msg.substring(0, 1);
	var message = msg.split('"')


	/* Si la première lettre du message est un slash on regarde si c'est une commande connue */
	if(firstchar == "/") {
		setLastMessage(msg);
		var name = "";

		/* Permet de vérifier si le contenu après le '/' correspond à une des commnades */
		Object.keys(commands).forEach(function(command) {
			if(msg.match(new RegExp(command, 'i'))) {
				name = commands[command];
				switch(name) {
					case 'help':
						fnShowHelp();
						break;
					case 'prive':
						reqSendPrivateMessage(message[3], message[1]);
						break;
					case 'users':
						reqUsers();
						break;
					case 'channels':
						reqChannels();
						break;
					case 'whois':
						reqWhois(message[1]);
						break;
					case 'description':
						reqChangeDescription(message[1]);
						break;
					case 'join':
						$('#tbxChannelname').val(message[1]);
						fnClickJoinChannel();
						break;
					case 'leave':
						fnClickLeaveChannel();
						break;
					case 'disconnect':
						reqDisconnect();
						break;
					case 'empty':
						$('#tabs-' + actualTab).empty();
						$('#tabs-' + actualTab).css('overflow', 'none');
						break
					case 'keep':
						reqKeepChannel(message[1]);
						break;
					case 'owner':
						reqGiveOwnership(message[1]);
						break;
					case 'emotes':
						fnShowEmotes();
						break;
					default:
						break;
				}
				$('#tbxMessage').val('');
			}
		});
	} else {
		/* Si ce n'est pas un slash, on regarde le type du salon actuel, dans le cas ou c'est un salon normal,
		on envoie un message normal et si c'est un salon privé on considère le message comme un message privé */
		if(type == 'normal')
			reqSendMessage(msg);
		else if(type == 'prive')
			reqSendPrivateMessage(msg, chan);
	}
}