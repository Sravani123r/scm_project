package com.scm.repositories;

import com.scm.entities.Contact;
import com.scm.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactRepo extends JpaRepository<Contact, String> {

    Page<Contact> findByUser(User user, Pageable pageable);
    Page<Contact> findByUserAndNameContaining(
            User user,
            String searchTerm,
            Pageable pageable
    );
    List<Contact> findByUserAndFavoriteTrue(User user);
}
