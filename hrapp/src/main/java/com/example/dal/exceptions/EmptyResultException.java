package com.example.dal.exceptions;

public class EmptyResultException extends Exception {

    public EmptyResultException() {
    }

    public EmptyResultException(String message) {
        super(message);
    }

    public EmptyResultException(String message, Throwable cause) {
        super(message, cause);
    }
}