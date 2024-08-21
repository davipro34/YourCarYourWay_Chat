package fr.davipro34.yourcaryourway_chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import fr.davipro34.yourcaryourway_chat.model.ChatMessage;

@Controller
public class ChatController {

    // Méthode pour gérer l'envoi de messages. Elle écoute sur le point de terminaison "/chat.sendMessage".
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public") // Diffuse la valeur de retour à tous les abonnés de "/topic/public"
    public ChatMessage sendMessage(
            @Payload ChatMessage chatMessage
    ) {
        return chatMessage; // Retourne le message de chat reçu
    }

    // Méthode pour ajouter un nouvel utilisateur à la session de chat.
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public") // Diffuse la valeur de retour à tous les abonnés de "/topic/public"
    public ChatMessage addUser(
            @Payload ChatMessage chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        // Ajoute le nom d'utilisateur aux attributs de session WebSocket
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        // Retourne le message de chat reçu
        return chatMessage;
    }
}
