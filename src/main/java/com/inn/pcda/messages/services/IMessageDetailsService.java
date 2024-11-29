package com.inn.pcda.messages.services;

import java.util.List;

import com.inn.pcda.messages.dto.MessageDTO;
import com.inn.pcda.messages.entity.MessagesDetails;

public interface IMessageDetailsService {

    public MessagesDetails addMessagesDetails(MessageDTO messagesDto) throws Exception;

    public MessagesDetails updateMessagesDetails(MessageDTO messageDTO, Long id) throws Exception;

    public List<MessagesDetails> getAllMessagesDetails() throws Exception;
}
