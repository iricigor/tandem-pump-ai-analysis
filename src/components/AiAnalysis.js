import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AiAnalysis() {
  const [apiKey, setApiKey] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  const handleAiAnalysis = () => {
    setAiMessage('not implemented yet');
    setTimeout(() => setAiMessage(''), 5000);
  };

  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.label}>API key</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Paste your API key"
        value={apiKey}
        onChangeText={setApiKey}
      />
      <Button title="AI analysis" onPress={handleAiAnalysis} />
      {aiMessage ? <Text style={styles.aiMessage}>{aiMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginVertical: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  aiMessage: {
    marginTop: 10,
    color: 'red'
  }
});
