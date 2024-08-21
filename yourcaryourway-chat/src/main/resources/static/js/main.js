'use strict';

// Sélection des éléments HTML que nous allons manipuler
var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

// Variables pour gérer la connexion et les messages
var stompClient = null; // Client STOMP pour gérer les WebSockets
var username = null;    // Nom d'utilisateur de la personne connectée

// Tableau de couleurs pour les avatars (chacune sera assignée en fonction de l'utilisateur)
var colors = ['#FF5733', '#C70039', '#900C3F', '#581845', '#28B463', '#1F618D', '#F1C40F', '#E67E22'];

/**
 * Fonction qui est appelée lorsque l'utilisateur soumet son nom d'utilisateur.
 * Elle établit la connexion WebSocket.
 */
function connect(event) {
    username = document.querySelector('#name').value.trim(); // Récupère et nettoie le nom d'utilisateur

    if (username) {
        // Cache la page de demande de nom d'utilisateur et affiche la page du chat
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        // Connexion via WebSocket avec SockJS
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        // Connexion au serveur WebSocket
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault(); // Empêche la soumission du formulaire de recharger la page
}

/**
 * Fonction appelée lorsque la connexion est établie avec succès.
 * Elle abonne l'utilisateur au topic public pour recevoir les messages.
 */
function onConnected() {
    // S'abonne au canal public pour recevoir les messages
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Notifie le serveur qu'un nouvel utilisateur a rejoint le chat
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    );

    // Cache l'indicateur de connexion en cours
    connectingElement.classList.add('hidden');
}

/**
 * Fonction appelée en cas d'erreur lors de la connexion WebSocket.
 * Elle affiche un message d'erreur à l'utilisateur.
 */
function onError(error) {
    connectingElement.textContent = 'Impossible de se connecter au serveur. Veuillez réessayer plus tard.';
    connectingElement.style.color = 'red'; // Le texte devient rouge pour signaler l'erreur
}

/**
 * Fonction appelée lorsque l'utilisateur envoie un message.
 * Elle envoie le message au serveur via WebSocket.
 */
function sendMessage(event) {
    var messageContent = messageInput.value.trim(); // Récupère le texte du message

    if (messageContent && stompClient) {
        // Crée un objet contenant les informations du message
        var chatMessage = {
            sender: username, // Le nom de l'expéditeur (l'utilisateur actuel)
            content: messageContent, // Le texte du message
            type: 'CHAT' // Type de message (ici un message de chat normal)
        };

        // Envoie le message au serveur
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = ''; // Réinitialise le champ de texte après envoi
    }
    event.preventDefault(); // Empêche le rechargement de la page
}

/**
 * Fonction appelée lorsqu'un message est reçu.
 * Elle affiche le message dans la liste des messages.
 */
function onMessageReceived(payload) {
    var message = JSON.parse(payload.body); // Analyse le message reçu au format JSON

    // Crée un nouvel élément de liste pour afficher le message
    var messageElement = document.createElement('li');

    // Différencie les types de messages : JOIN, LEAVE ou CHAT
    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message'); // Style différent pour les messages d'événement
        message.content = message.sender + ' a rejoint le chat !'; // Message informant de l'arrivée d'un utilisateur
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' a quitté le chat !'; // Message informant du départ d'un utilisateur
    } else {
        messageElement.classList.add('chat-message'); // Style pour un message normal

        // Crée un avatar pour l'utilisateur à partir de la première lettre de son nom
        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender); // Assigne une couleur aléatoire à l'avatar

        messageElement.appendChild(avatarElement);

        // Ajoute le nom d'utilisateur à côté de l'avatar
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    // Ajoute le contenu du message sous le nom d'utilisateur
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    // Ajoute le message dans la zone de messages
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight; // Fait défiler vers le bas pour afficher le dernier message
}

/**
 * Fonction qui génère une couleur en fonction du nom de l'utilisateur.
 * Cela permet de garder la même couleur pour chaque utilisateur.
 */
function getAvatarColor(messageSender) {
    var hash = 0;
    // Génère un hash à partir du nom de l'utilisateur
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    // Calcule un index basé sur le hash pour sélectionner une couleur dans le tableau
    var index = Math.abs(hash % colors.length);
    return colors[index]; // Retourne la couleur sélectionnée
}

// Écoute l'envoi du formulaire du nom d'utilisateur et appelle la fonction connect
usernameForm.addEventListener('submit', connect, true);
// Écoute l'envoi du formulaire de message et appelle la fonction sendMessage
messageForm.addEventListener('submit', sendMessage, true);
