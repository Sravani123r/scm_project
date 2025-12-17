package com.scm.services;

import com.scm.entities.Contact;

import java.util.List;

public interface ContactService {

    Contact create(Contact contact, String email);
    Contact update(String id, Contact contact, String email);
    Contact getById(String id);
    void delete(String contactId, String email);
    List<Contact> getByUserId(String userId);
}
