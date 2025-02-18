import { router } from "expo-router";

const handleError = (error: any) => {
  console.error('Lỗi:', error);
  router.replace('/(login)');
};

export default handleError;