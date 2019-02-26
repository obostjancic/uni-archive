package com.example.dal.exceptions;

public class MultipleResultsException extends Exception {

    public MultipleResultsException() {
    }

    public MultipleResultsException(String message) {
        super(message);
    }

    public MultipleResultsException(String message, Throwable cause) {
        super(message, cause);
    }
}