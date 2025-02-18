import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface LoadingOverlayProps {
  isLoading: boolean; // Quyết định hiển thị overlay
  message?: string;   // Dòng thông báo tùy chỉnh
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message = 'Đang xử lý...' }) => {
  if (!isLoading) {
    return null; // Không hiển thị nếu isLoading = false
  }

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default LoadingOverlay;
