import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import JSZip from 'jszip';

export default function ZipUploader({
  zipFiles,
  setZipFiles,
  selectedZipIndex,
  setSelectedZipIndex,
  setCsvFiles,
  setSelectedCsv,
  setCsvData
}) {
  const handleZipUpload = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/zip',
      copyToCacheDirectory: true
    });
    if (result.type === 'success') {
      try {
        const response = await fetch(result.uri);
        const arrayBuffer = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        setZipFiles(prev => [...prev, { name: result.name, zip }]);
      } catch (e) {
        alert('Invalid zip file');
      }
    }
  };

  const selectZip = (index) => {
    setSelectedZipIndex(index);
    setSelectedCsv(null);
    setCsvData(null);
    const zip = zipFiles[index].zip;
    const csvNames = Object.keys(zip.files).filter(f => f.endsWith('.csv'));
    setCsvFiles(csvNames);
  };

  return (
    <View style={{ width: '100%' }}>
      <Button title="Upload Zip File" onPress={handleZipUpload} />
      <FlatList
        data={zipFiles}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.zipItem, selectedZipIndex === index && styles.selected]}
            onPress={() => selectZip(index)}
          >
            <Text style={[styles.zipItemText, selectedZipIndex === index && { color: '#fff' }]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  zipItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    borderRadius: 5
  },
  selected: {
    backgroundColor: '#007bff'
  },
  zipItemText: {
    fontSize: 16
  }
});
