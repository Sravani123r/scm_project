package com.scm.controllers;

import com.scm.entities.Contact;
import com.scm.entities.User;
import com.scm.repositories.UserRepo;
import com.scm.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;
    private final UserRepo userRepo;

    @PostMapping("/save")
    public Contact addContact(
            @RequestBody Contact contact,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return contactService.create(contact, email);
    }

    @GetMapping
    public List<Contact> getAll(Authentication authentication) {
        String email=authentication.getName();
        User user=userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return contactService.getByUserId(user.getUserId());
    }

    @PutMapping("/{id}")
    public Contact updateContact(
            @PathVariable String id,
            @RequestBody Contact contact,
            Authentication authentication
    ) {
        String email = authentication.getName();
        return contactService.update(id, contact, email);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(
            @PathVariable String id,
            Authentication authentication
    ) {
        String email = authentication.getName();
        contactService.delete(id, email);
    }


}