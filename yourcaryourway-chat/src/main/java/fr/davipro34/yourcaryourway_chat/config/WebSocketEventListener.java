package fr.davipro34.yourcaryourway_chat.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import fr.davipro34.yourcaryourway_chat.model.ChatMessage;
import fr.davipro34.yourcaryourway_chat.model.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    // Injection de la dépendance pour envoyer des messages
    private final SimpMessageSendingOperations messagingTemplate;

    // Méthode pour gérer les événements de déconnexion WebSocket
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        // Récupération des en-têtes STOMP de l'événement
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        // Récupération du nom d'utilisateur à partir des attributs de session
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null) {
            log.info("user disconnected: {}", username);
            // Création d'un nouveau message de chat de type LEAVE
            var chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVE)
                    .sender(username)
                    .build();
            // Envoi du message à tous les abonnés du topic "/topic/public"
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }

}