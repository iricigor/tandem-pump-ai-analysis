import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import HamburgerMenu from './components/HamburgerMenu';
import ZipUploader from './components/ZipUploader';
import CsvViewer from './components/CsvViewer';
import AiAnalysis from './components/AiAnalysis';

export default function App() {
  const [page, setPage] = useState('first');
  const [zipFiles, setZipFiles] = useState([]); // {name, zip}
  const [selectedZipIndex, setSelectedZipIndex] = useState(null);
  const [csvFiles, setCsvFiles] = useState([]);
  const [selectedCsv, setSelectedCsv] = useState(null);
  const [csvData, setCsvData] = useState(null);

  return (
    <View style={styles.container}>
      <HamburgerMenu page={page} setPage={setPage} />
      <Text style={styles.header}>Tandem Pump AI Analysis</Text>
      <Text style={styles.disclaimer}>
        Disclaimer: This app is not affiliated with or endorsed by Tandem Diabetes Care, Inc.
      </Text>
      {page === 'first' && (
        <ZipUploader
          zipFiles={zipFiles}
          setZipFiles={setZipFiles}
          selectedZipIndex={selectedZipIndex}
          setSelectedZipIndex={setSelectedZipIndex}
          setCsvFiles={setCsvFiles}
          setSelectedCsv={setSelectedCsv}
          setCsvData={setCsvData}
        />
      )}
      {page === 'second' && (
        <CsvViewer
          zipFiles={zipFiles}
          selectedZipIndex={selectedZipIndex}
          csvFiles={csvFiles}
          selectedCsv={selectedCsv}
          setSelectedCsv={setSelectedCsv}
          csvData={csvData}
          setCsvData={setCsvData}
        />
      )}
      {page === 'third' && <AiAnalysis />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 30 : 50,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#007bff'
  },
  disclaimer: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 20
  }
});
