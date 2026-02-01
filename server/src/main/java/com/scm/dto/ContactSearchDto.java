package com.scm.dto;

import lombok.Data;

@Data
public class ContactSearchDto {
    private int skip = 0;
    private int limit = 10;
    private String orderBy = "name";
    private String order = "ASC";
    private String searchTerm;
}