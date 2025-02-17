package com.tradingbot.utils;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader {

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);
    private final ResourceLoader resourceLoader;

    public DataLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public List<CSVRecord> loadCsv(String fileName) {
        List<CSVRecord> records = new ArrayList<>();
        logger.info("Starting to load CSV data from file: {}", fileName);
        try {
            Resource resource = resourceLoader.getResource("classpath:test-data/" + fileName);

            if (!resource.exists() || !resource.isReadable()) {
                logger.error("File not found or is not readable: {}", fileName);
                throw new FileNotFoundException("File not found: " + fileName);
            }

            try (Reader reader = new InputStreamReader(resource.getInputStream())) {
                Iterable<CSVRecord> csvRecords = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(reader);
                csvRecords.forEach(records::add);

                logger.info("Successfully loaded {} records from file: {}", records.size(), fileName);
            }
        } catch (Exception e) {
            logger.error("Failed to load CSV file: {}", fileName, e);
            throw new RuntimeException("An error occurred while loading the file: " + fileName, e);
        }

        return records;
    }
}