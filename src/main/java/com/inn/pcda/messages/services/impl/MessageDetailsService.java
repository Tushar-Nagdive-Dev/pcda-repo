package com.inn.pcda.messages.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.messages.dto.MessageDTO;
import com.inn.pcda.messages.entity.MessagesDetails;
import com.inn.pcda.messages.repos.MessagesDeatilsRepo;
import com.inn.pcda.messages.services.IMessageDetailsService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MessageDetailsService implements IMessageDetailsService {

    @Autowired
    private MessagesDeatilsRepo messageRepo;

    @Override
    public MessagesDetails addMessagesDetails(MessageDTO messagesDto) {
        log.info("Adding message details");
        MessagesDetails message = convertToEntity(messagesDto);
        return messageRepo.save(message);
    }

    @Override
    public MessagesDetails updateMessagesDetails(MessageDTO messageDTO, Long id) {
        log.info("Updating message details with id: {}", id);

        MessagesDetails existingMessage = messageRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Message with id " + id + " not found"));

        updateEntityFromDto(existingMessage, messageDTO);

        return messageRepo.save(existingMessage);
    }

    @Override
    public List<MessagesDetails> getAllMessagesDetails() {
        log.info("Fetching all message details");
        return messageRepo.findAll();
    }

    /**
     * Helper method to convert MessageDTO to MessagesDetails entity.
     *
     * @param dto the MessageDTO
     * @return the MessagesDetails entity
     */
    private MessagesDetails convertToEntity(MessageDTO dto) {
        return MessagesDetails.builder()
                .message(dto.getMessage())
                .flag(dto.getFlag())
                .status(dto.getStatus())
                .type(dto.getType())
                .build();
    }

    /**
     * Helper method to update an entity from a DTO.
     *
     * @param entity the existing MessagesDetails entity
     * @param dto    the MessageDTO
     */
    private void updateEntityFromDto(MessagesDetails entity, MessageDTO dto) {
        entity.setMessage(dto.getMessage());
        entity.setStatus(dto.getStatus());
        entity.setType(dto.getType());
        entity.setFlag(dto.getFlag());
    }
}
