import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CsvViewer({
  zipFiles,
  selectedZipIndex,
  csvFiles,
  selectedCsv,
  setSelectedCsv,
  csvData,
  setCsvData
}) {
  const handleCsvSelect = async (name) => {
    setSelectedCsv(name);
    if (!name) {
      setCsvData(null);
      return;
    }
    const zip = zipFiles[selectedZipIndex].zip;
    const file = zip.files[name];
    if (file) {
      const content = await file.async('string');
      const rows = content.split('\n').map(row => row.split(','));
      setCsvData(rows);
    }
  };

  if (selectedZipIndex === null) {
    return <Text>Please select a zip file first on the Upload Zip page.</Text>;
  }

  return (
    <View style={{ width: '100%' }}>
      <Picker
        selectedValue={selectedCsv || ''}
        onValueChange={handleCsvSelect}
        style={{ height: 50, width: '100%' }}
      >
        <Picker.Item label="select parameter" value="" />
        {csvFiles.map((name, i) => (
          <Picker.Item key={i} label={name} value={name} />
        ))}
      </Picker>
      {csvData && (
        <ScrollView horizontal>
          <View>
            {csvData.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((cell, j) => (
                  <Text key={j} style={styles.cell}>{cell}</Text>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 6,
    minWidth: 80
  }
});
