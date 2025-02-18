import apiClient from './apiClient';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform } from 'react-native';
import { Buffer } from 'buffer';

const downloadAndOpenFile = async (url: string): Promise<void> => {
  try {
    // Lấy tên file từ URL
    const fileName = url.split('/').pop();
    if (!fileName) {
      throw new Error('Không thể lấy tên file từ URL.');
    }
    // Đường dẫn lưu file trong hệ thống Expo
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    // Tải file sử dụng axios
    const response = await apiClient.get(url, {
      responseType: 'arraybuffer',
    });

    // Ghi dữ liệu file xuống hệ thống
    const base64Data = Buffer.from(response.data, 'binary').toString('base64');
    await FileSystem.writeAsStringAsync(fileUri, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log(`File đã tải xuống tại: ${fileUri}`);

    // Mở file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.error('Tính năng chia sẻ không khả dụng trên thiết bị này.');
    }

  } catch (error) {
    console.error('Lỗi khi tải hoặc mở file:', error);
    throw error;
  }
};

export default downloadAndOpenFile;