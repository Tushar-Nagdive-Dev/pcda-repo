package com.inn.pcda.messages.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Status, String> {

    @Override
    public String convertToDatabaseColumn(Status status) {
        if(status != null) {
            return status.getValue();
        }
        return null;
    }

    @Override
    public Status convertToEntityAttribute(String dbData) {
        if(dbData != null) {
            return Status.fromValue(dbData);
        }

        return null;
    }
    
}
