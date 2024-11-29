package com.inn.pcda.messages.controller;

import com.inn.pcda.messages.dto.MessageDTO;
import com.inn.pcda.messages.entity.MessagesDetails;
import com.inn.pcda.messages.services.IMessageDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessagesDetailsController {

    @Autowired
    private IMessageDetailsService messageService;

    /**
     * Create a new message.
     *
     * @param messageDTO the message data
     * @return the created message
     * @throws Exception in case of errors during creation
     */
    @PostMapping
    public ResponseEntity<MessagesDetails> addMessage(@RequestBody MessageDTO messageDTO) throws Exception {
        MessagesDetails message = messageService.addMessagesDetails(messageDTO);
        return ResponseEntity.ok(message);
    }

    /**
     * Update an existing message by ID.
     *
     * @param id         the ID of the message to update
     * @param messageDTO the new message data
     * @return the updated message
     * @throws Exception in case of errors during update
     */
    @PutMapping("/{id}")
    public ResponseEntity<MessagesDetails> updateMessage(
            @PathVariable Long id,
            @RequestBody MessageDTO messageDTO) throws Exception {
        MessagesDetails updatedMessage = messageService.updateMessagesDetails(messageDTO, id);
        return ResponseEntity.ok(updatedMessage);
    }

    /**
     * Retrieve all messages.
     *
     * @return a list of all messages
     * @throws Exception in case of errors during retrieval
     */
    @GetMapping
    public ResponseEntity<List<MessagesDetails>> getAllMessages() throws Exception {
        List<MessagesDetails> messages = messageService.getAllMessagesDetails();
        return ResponseEntity.ok(messages);
    }

    /**
     * Retrieve a message by ID.
     *
     * @param id the ID of the message
     * @return the message with the specified ID
     * @throws Exception in case the message is not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<MessagesDetails> getMessageById(@PathVariable Long id) throws Exception {
        MessagesDetails message = messageService.getAllMessagesDetails()
                .stream()
                .filter(msg -> msg.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Message not found with ID: " + id));
        return ResponseEntity.ok(message);
    }

    /**
     * Delete a message by ID.
     *
     * @param id the ID of the message to delete
     * @return a success response
     * @throws Exception in case of errors during deletion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) throws Exception {
        messageService.getAllMessagesDetails()
                .stream()
                .filter(msg -> msg.getId().equals(id))
                .findFirst()
                .ifPresent(msg -> {
                    try {
                        messageService.getAllMessagesDetails().remove(msg);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });
        return ResponseEntity.ok("Deleted message with ID: " + id);
    }
}
