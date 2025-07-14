import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function HamburgerMenu({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      {menuOpen && (
        <View style={styles.menuList}>
          <TouchableOpacity onPress={() => { setPage('first'); setMenuOpen(false); }}>
            <Text style={styles.menuItem}>Upload Zip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setPage('second'); setMenuOpen(false); }}>
            <Text style={styles.menuItem}>View CSV</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setPage('third'); setMenuOpen(false); }}>
            <Text style={styles.menuItem}>AI Analysis</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 10
  },
  menuButton: {
    padding: 10
  },
  menuIcon: {
    fontSize: 28,
    color: '#007bff'
  },
  menuList: {
    backgroundColor: '#e9ecef',
    padding: 10,
    marginTop: 10,
    borderRadius: 8
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 8,
    color: '#007bff'
  }
});
