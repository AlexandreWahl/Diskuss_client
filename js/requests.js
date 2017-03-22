/***********************************************************************************************/
/* Les fonctions avec le pr�fixe "req" sont les fonction qui font des requ�tes au serveur      */
/***********************************************************************************************/
var path = "";
var serverip = "";

function setServerPath(ip) {
    path = "http://" + ip + ":8081";
    serverip = ip;
}

//var path = "http://127.0.0.1:8081";
// var path = "http://157.26.174.174:8081";

/* Permet de conna�tre la version du serveur */
function reqVersion() {
    $.ajax({
        type: "GET",
        url: path + "/info/",
        success: function(data) {
            $('#pInfos').text('v' + data.version);
            $('#divAddress').hide();
            $('#divConnect').show();
        },
        error: function()
        {
            alert('Connexion avec ' + serverip + ' impossible');
        }
    });
}

/* Permet d'obtenir la liste des salon de discussion actifs */
function reqChannels() {
    $.ajax({
        type: "GET",
        url: path + "/channels/",
        success: function(data) {
            fnPrintChannelsList(data);
        },
        error: function()
        {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/* Permet d'obtenir la liste des utilisateurs connect�s au server */
function reqUsers() {
    $.ajax({
        type: "GET",
        url: path + "/users/",
        success: function(data) {
            fnPrintUsersList(data);
        },
        error: function()
        {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/* Permet de conna�tre les informations d'un utilisateur */
function reqWhois(username) {
    $.ajax({
        type: "GET",
        url: path + "/users/whois/" + username + "/",
        success: function(data) {
            fnWhois(data);
        },
        error: function()
        {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/* Permet de se connecter au serveur */
function reqConnect() {
    var name = getUserNameByInput();

    if(fnFilterUsername(name)) {
        $.ajax({
            type: "POST",
            url: path + "/users/register/" + name + "/",
            success: function (result) {
                fnNoticesInterval();
                fnRegisterUser(result.nick, result.id);
                fnTchatInterface();
                fnClickJoinChannel();
            },
            error: function () {
                $('#tbxUsername').val('');
                alert('Erreur lors de l\éxécution de la requête');
            }
        });
    } else {
        $('#tbxUsername').val('');
        alert('Veuillez entrer un nom valide');
    }
}

/* Permet de se d�connecter du serveur */
function reqDisconnect() {
    var id = getUserID();

    $.ajax({
        type: "DELETE",
        url: path + "/user/" + id + "/disconnect/",
        success: function(result) {
            fnClearIntervalNotices();
            fnDeleteUser();

            $('.tabs-ul').each(function(){
                $(this).remove();
            });

            $('.tabs').each(function(){
                $(this).remove();
            });

            $('#tbxUsername').val('');

            fnConnectInterface();
            setActiveChannel('');
            setFirstJoin(true);
        },
        error: function()
        {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/* Permet de rejoindre un salon de discussion */
function reqJoinChannel(name) {
    if(name == '') {
        alert('Veuillez entrer un nom de salon avant d\'essayer de le rejoindre !');
    } else {
        var id = getUserID();

        $.ajax({
            type: "PUT",
            url: path + "/user/" + id + "/channels/" + name + "/join/",
            success: function(result) {
                $('#buttonLeaveChannel').css({'display' : 'inline'});
                $('#divChat').css({'display' : 'inline-block'});
                $('#divActionsUser').css({ "display": "inline-block"});
                fnAddChannelTab(name, 'normal');
            },
            error: function() {
                alert('Erreur lors de l\éxécution de la requête');
            }
        });
    }
}

/* Permet de quitter un salon de discussion */
function reqLeaveChannel() {
    var name = getUserName();
    var id = getUserID();
    var actualTab = getActiveChannel();
    var tab = getChannelName(actualTab);


    if(tab != "Accueil") {
        $.ajax({
            type: "DELETE",
            url: path + "/user/" + id + "/channels/" + tab + "/leave/",
            success: function() {
                $('#tbxChannelname').val('');
                $('#pChannelName').text('');
                $('#divChatBox').empty();
                $('#divActionsUser').css({ "display": "none"});
            },
            error: function() {
                alert('Erreur lors de l\éxécution de la requête');
            }
        });
    } else {
        alert('Vous ne pouvez pas quitter le salon d\'accueil !');
    }
}

/* Permet d'envoyer un message dans un salon de discussion */
function reqSendMessage(msg) {
    var msg = getMessageByInput();

    if(msg == '') {
        alert('Veuillez entrer un message avant d\'essayer de l\'envoyer !')
    } else {
        var name = getUserName();
        var id = getUserID();
        var actualTab = getActiveChannel();
        var tab = getChannelName(actualTab);

        $.ajax({
            type: "PUT",
            url: path + "/user/" + id + "/channels/" + tab + "/say/",
            data: {message: msg},
            success: function(result) {
                $('#tbxMessage').val('');
                setLastMessage(msg);
            },
            error: function()
            {
                alert('Erreur lors de l\éxécution de la requête');
            }
        });
    }
}

/* Permet de v�rifier si une notification concernant l'utilisateur connect� existe */
function reqFetchNotices() {
    var id = getUserID();

    $.ajax({
        type: "GET",
        url: path + "/user/" + id + "/notices/",
        success: function(data) {
            if(data.length != 0) {
                fnCheckNotice(data);
            }
        }
    });
}

/* Permet de garder un salon ouvert m�me si il n'y a plus d'utilisateur dedans */
function reqKeepChannel(value) {
    var id = getUserID();
    var actualTab = getActiveChannel();
    var tab = getChannelName(actualTab);

    $.ajax({
        type: "PUT",
        url: path + "/user/" + id + "/channels/" + tab + "/keep/",
        data: {keep: value == "true"},
        success: function(result) {
            $('#tbxMessage').val('');
        },
        error: function()
        {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/* Permet de changer le propri�taire d'un salon de discussion */
function reqGiveOwnership(recipient) {
    var id = getUserID();
    var actualTab = getActiveChannel();
    var tab = getChannelName(actualTab);

    $.ajax({
        type: "PUT",
        url: path + "/user/" + id + "/channels/" + tab + "/owner/" + recipient + "/",
        success: function(result) {
            $('#tbxMessage').val('');
        },
        error: function()
        {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/* Permet de changer la description d'un salon de discussion */
function reqChangeDescription(desc) {
    var id = getUserID();
    var actualTab = getActiveChannel();
    var tab = getChannelName(actualTab);

    $.ajax({
        type: "PUT",
        url: path + "/user/" + id + "/channels/" + tab + "/description/",
        data: {description: desc},
        success: function(result) {
            $('#tbxMessage').val('');
        },
        error: function()
        {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}

/* Envoie un message priv� (msg) � un autre utilisateur (userTarget) */
function reqSendPrivateMessage(msg, userTarget) {
    var name = getUserName();
    var id = getUserID();

    $.ajax({
        type: "PUT",
        url: path + "/user/" + id + "/message/" + userTarget + "/",
        data: {message: msg},
        success: function (result) {
            fnTabPrivateMessage(msg, name, userTarget);
            $('#tbxMessage').val('');
        },
        error: function () {
            alert('Erreur lors de l\éxécution de la requête');
        }
    });
}