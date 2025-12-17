package com.scm.services.impl;

import com.scm.entities.Contact;
import com.scm.entities.User;
import com.scm.repositories.ContactRepo;
import com.scm.repositories.UserRepo;
import com.scm.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.boot.autoconfigure.pulsar.PulsarProperties;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepo contactRepo;
    private final UserRepo userRepo;

    @Override
    public Contact create(Contact contact, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        contact.setUser(user);
        return contactRepo.save(contact);
    }

    @Override
    public List<Contact> getByUserId(String userId) {
        return contactRepo.findByUser_UserId(userId);
    }

    @Override
    public Contact update(String id, Contact updatedContact, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Contact existing = contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!existing.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Unauthorized");
        }

        existing.setName(updatedContact.getName());
        existing.setEmail(updatedContact.getEmail());
        existing.setPhoneNumber(updatedContact.getPhoneNumber());
        existing.setAddress(updatedContact.getAddress());
        existing.setDescription(updatedContact.getDescription());
        existing.setFavorite(updatedContact.isFavorite());
        existing.setWebsiteLink(updatedContact.getWebsiteLink());
        existing.setLinkedInLink(updatedContact.getLinkedInLink());

        return contactRepo.save(existing);
    }


    @Override
    public Contact getById(String id) {
        return contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    @Override
    public void delete(String contactId, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Contact contact = contactRepo.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        // 🔒 Security check (very important)
        if (!contact.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("You are not allowed to delete this contact");
        }

        contactRepo.delete(contact);
    }

}
