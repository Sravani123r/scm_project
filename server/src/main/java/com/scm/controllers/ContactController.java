package com.scm.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scm.dto.*;
import com.scm.entities.Contact;
import com.scm.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;


    @PostMapping(
            value = "/save",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public Contact create(
            @RequestPart("data") String data,
            @RequestPart(value = "image", required = false) MultipartFile image,
            Authentication auth
    ) throws Exception {

        Contact contact = new ObjectMapper().readValue(data, Contact.class);
        return contactService.create(contact, image, auth.getName());
    }



    @GetMapping
    public PageResponseDto<Contact> getAll(
            Authentication auth,
            @ModelAttribute ContactSearchDto dto
    ) {
        Page<Contact> page = contactService.getContacts(auth.getName(), dto);

        return new PageResponseDto<>(
                page.getContent(),
                page.getTotalElements(),
                page.getNumber(),
                page.getSize()
        );
    }
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse update(
            @PathVariable String id,
            @RequestPart("data") String data,
            @RequestPart(value = "image", required = false) MultipartFile image,
            Authentication auth
    ) throws Exception {

        Contact contact = new ObjectMapper().readValue(data, Contact.class);
        contactService.update(id, contact, image, auth.getName());
        return new ApiResponse("Contact updated successfully", true);
    }

    @DeleteMapping("/{id}")
    public ApiResponse delete(
            @PathVariable String id,
            Authentication auth
    ) {
        contactService.delete(id, auth.getName());
        return new ApiResponse("Contact deleted successfully", true);
    }

    @GetMapping("/favorites")
    public Object getFavorites(Authentication auth) {
        return contactService.getFavorites(auth.getName());
    }

    @PatchMapping("/{id}/favorite")
    public ApiResponse toggleFavorite(
            @PathVariable String id,
            Authentication auth
    ) {
        contactService.toggleFavorite(id, auth.getName());
        return new ApiResponse("Favorite updated", true);
    }
}
