import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@profile';
export interface Profile {
  id: number;
  hoVaTen: string;
}

export const saveProfile = async (profile: Profile): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(profile); // Chuyển User thành chuỗi JSON
    await AsyncStorage.setItem(key, jsonValue);
    console.log('Profile data saved successfully!');
  } catch (e) {
    console.error('Failed to save Profile data:', e);
  }
};

// Lấy dữ liệu Profile
export const getProfile = async (): Promise<Profile | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to fetch Profile data:', e);
    return null;
  }
};

// Xóa dữ liệu User
export const removeProfile = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('User data removed successfully!');
  } catch (e) {
    console.error('Failed to remove user data:', e);
  }
};