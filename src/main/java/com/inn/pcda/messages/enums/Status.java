package com.inn.pcda.messages.enums;

public enum Status {
    ZERO("0"),
    ONE("1"),
    TWO("2");

    private final String value;

    // Constructor to associate a string value with the enum constant
    Status(String value) {
        this.value = value;
    }

    // Getter to retrieve the associated value
    public String getValue() {
        return value;
    }

    // Static method to get Status by value
    public static Status fromValue(String value) {
        for (Status status : Status.values()) {
            if (status.value.equals(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid status value: " + value);
    }
}
