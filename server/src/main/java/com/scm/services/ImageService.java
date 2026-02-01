package com.scm.services;

import com.scm.dto.ImageUploadResult;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    ImageUploadResult upload(MultipartFile file, String folder);
    void delete(String publicId);
}
