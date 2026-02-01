package com.scm.services.impl;

import com.scm.dto.ContactSearchDto;
import com.scm.entities.Contact;
import com.scm.entities.User;
import com.scm.repositories.ContactRepo;
import com.scm.repositories.UserRepo;
import com.scm.services.ContactService;
import com.scm.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepo contactRepo;
    private final UserRepo userRepo;
    private final ImageService imageService;

    @Override
    public Contact create(Contact contact, MultipartFile image, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        contact.setUser(user);

        if (image != null && !image.isEmpty()) {
            var upload = imageService.upload(image, "scm_contacts");
            contact.setPicture(upload.getUrl());
            contact.setCloudinaryImagePublicId(upload.getPublicId());
        }

        return contactRepo.save(contact);
    }

    @Override
    public Page<Contact> getContacts(String email, ContactSearchDto dto) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Sort sort = dto.getOrder().equalsIgnoreCase("DESC")
                ? Sort.by(dto.getOrderBy()).descending()
                : Sort.by(dto.getOrderBy()).ascending();

        Pageable pageable = PageRequest.of(dto.getSkip(), dto.getLimit(), sort);

        if (dto.getSearchTerm() != null && !dto.getSearchTerm().isBlank()) {
            return contactRepo.findByUserAndNameContaining(
                    user,
                    dto.getSearchTerm(),
                    pageable
            );
        }

        return contactRepo.findByUser(user, pageable);
    }

    @Override
    public Contact update(String id, Contact updated, MultipartFile image, String email) {

        Contact contact = contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!contact.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        if (updated.getName() != null) contact.setName(updated.getName());
        if (updated.getEmail() != null) contact.setEmail(updated.getEmail());
        if (updated.getPhoneNumber() != null) contact.setPhoneNumber(updated.getPhoneNumber());
        if (updated.getAddress() != null) contact.setAddress(updated.getAddress());
        if (updated.getDescription() != null) contact.setDescription(updated.getDescription());

        contact.setFavorite(updated.isFavorite());

        if (image != null && !image.isEmpty()) {
            if (contact.getCloudinaryImagePublicId() != null) {
                imageService.delete(contact.getCloudinaryImagePublicId());
            }
            var upload = imageService.upload(image, "scm_contacts");
            contact.setPicture(upload.getUrl());
            contact.setCloudinaryImagePublicId(upload.getPublicId());
        }

        return contactRepo.save(contact);
    }

    @Override
    public void delete(String id, String email) {

        Contact contact = contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!contact.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        if (contact.getCloudinaryImagePublicId() != null) {
            imageService.delete(contact.getCloudinaryImagePublicId());
        }

        contactRepo.delete(contact);
    }

    @Override
    public Contact toggleFavorite(String id, String email) {

        Contact contact = contactRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        if (!contact.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        contact.setFavorite(!contact.isFavorite());
        return contactRepo.save(contact);
    }

    @Override
    public List<Contact> getFavorites(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return contactRepo.findByUserAndFavoriteTrue(user);
    }
}
