<!DOCTYPE html
     PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="description" content="Diskuss_client_v1">
		<meta name="date" content="12.09.2016">
		<meta name="author" content="Alexandre Wahl">
		<meta name="version" content="1.0">
		<link rel="stylesheet" href="css/style.css" />
		<link rel="stylesheet" href="jqueryui/jquery-ui.min.css" />
		<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
        <title></title>
		<script src="js/jquery-3.1.0.min.js"></script>
		<script src="jqueryui/jquery-ui.min.js"></script>
		<script src="js/checkSaisie.js" defer></script>
		<script src="js/requests.js" defer></script>
		<script src="js/function.js" defer></script>
    </head>
	<body onload="fnTitleTimerStart()">

		<div id="mainPage">
			<h1 id="title">Diskuss client</h1>
			<div id="divAddress">
				<label for="tbxAddress">Adresse IP : </label><input id="tbxAddress" name="tbxAddress" type="text" value="127.0.0.1" />
				<input id="buttonPath" type="button" onclick="fnPath()" value="Valider" />
			</div>
			<div id="divConnect">
				<label for="tbxUsername">Nom d'utilisateur : </label><input id="tbxUsername" name="tbxUsername" type="text" value="" />
				<input id="buttonConnect" type="button" onclick="reqConnect()" value="Se connecter" />
			</div>
			<div id="divChannel">
				<div id="divChannelName"><label for="tbxChannelname">Nom du salon : </label><input id="tbxChannelname" name="tbxChannelname" type="text" value="" /></div>
				<input id="buttonJoinChannel" type="button" onclick="fnClickJoinChannel()" value="Rejoindre le salon" />
				<input id="buttonLeaveChannel" type="button" onclick="fnClickLeaveChannel()" value="Quitter le salon actuel" />
				<label for="cbxAutoScroll">Auto Scroll : </label><input type="checkbox" id="cbxAutoScroll" onchange="fnCheckAutoScroll()" checked/>
			</div>
			<div id="divChat">
				<ul id="ulTabs"></ul>
				<input class="tbxMessage" id="tbxMessage" placeholder="Entrez /help pour afficher les commandes" name="message" type="text" value="" />
			</div>
			<div id="divNomUser">
				<p name="infoNomUser"></p>
				<input id="buttonDisconnect" type="button" onclick="reqDisconnect()" value="Se déconnecter" />
			</div>
			<div id="divActionsUser">
				<input id="buttonUsers" type="button" onclick="reqUsers()" value="Liste des utilisateurs" />
				<input id="buttonChannels" type="button" onclick="reqChannels()" value="Liste des salons" />
			</div>
		</div>
			<p id="pInfos"></p>
	</body>
</html>