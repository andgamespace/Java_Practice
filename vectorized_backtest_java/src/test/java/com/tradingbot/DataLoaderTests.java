package com.tradingbot.utils;

import org.apache.commons.csv.CSVRecord;
import org.apache.arrow.memory.RootAllocator;
import org.apache.arrow.vector.VectorSchemaRoot;
import org.apache.arrow.vector.file.JsonFileReader;
import org.apache.arrow.vector.util.Text;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class DataLoaderTests {

    @Autowired
    private DataLoader dataLoader;

    @Test
    public void testLoadCsvAndConcatenate() throws Exception {
        List<CSVRecord> records1 = dataLoader.loadCsv("time-series-AAPL-5min.csv");
        List<CSVRecord> records2 = dataLoader.loadCsv("time-series-AAPL-5min(1).csv");
        List<CSVRecord> records3 = dataLoader.loadCsv("time-series-AAPL-5min(2).csv");

        // Merge records into a single dataframe using Apache Arrow
        List<String[]> allData = new ArrayList<>();
        records1.forEach(record -> allData.add(getRecordAsArray(record)));
        records2.forEach(record -> allData.add(getRecordAsArray(record)));
        records3.forEach(record -> allData.add(getRecordAsArray(record)));

        // Perform assertions - test that data combines correctly
        assertNotNull(allData);
        assertEquals(records1.size() + records2.size() + records3.size(), allData.size());

        System.out.println("Data concatenated successfully. Data size: " + allData.size());
    }

    private String[] getRecordAsArray(CSVRecord record) {
        String[] result = new String[record.size()];
        for (int i = 0; i < record.size(); i++) {
            result[i] = record.get(i);
        }
        return result;
    }
}