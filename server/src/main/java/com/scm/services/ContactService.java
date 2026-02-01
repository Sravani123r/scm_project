package com.scm.services;

import com.scm.dto.ContactSearchDto;
import com.scm.entities.Contact;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ContactService {

    Contact create(Contact contact, MultipartFile image, String email);

    Contact update(String id, Contact contact, MultipartFile image, String email);

    void delete(String id, String email);

    Contact toggleFavorite(String id, String email);

    List<Contact> getFavorites(String email);

    Page<Contact> getContacts(String email, ContactSearchDto dto);
}
