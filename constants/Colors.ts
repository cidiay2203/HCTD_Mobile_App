const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const COLORS = {
  // Các màu cố định không tùy thuộc vào chủ đề
  PRIMARY: '#FF2156',  // Màu chính (Đỏ đậm)
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  LITE_DARK: '#7E7E7E',
  LITE_DARK2: '#5E5E5E',
  LITE_DARK3: '#272A2F',
  INFO: '#689593',
  LITE_GRAY: "#F0F0F0",

  // Theme mẫu cho chế độ Light
  light: {
    text: '#11181C',
    background: '#FFFFFF',  // nền sáng
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  
  // Theme mẫu cho chế độ Dark
  dark: {
    text: '#ECEDEE',
    background: '#151718',  // nền tối
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },

  // Các màu bổ sung (dùng chung hoặc có thể điều chỉnh theo yêu cầu dark/light)
  RED: '#FF4D4D',       // Màu đỏ
  DARK_RED: '#C82333',  // Đỏ đậm

  YELLOW: '#FFD700',    // Màu vàng
  GOLD: '#FFC107',      // Màu vàng kim

  GREEN: '#28A745',     // Màu xanh lá
  DARK_GREEN: '#1E7E34',// Xanh lá đậm
  LIGHT_GREEN: '#D4EDDA', // Xanh lá nhạt

  BLUE: '#007BFF',      // Màu xanh dương
  LIGHT_BLUE: '#5BC0DE',// Xanh dương nhạt
  DARK_BLUE: '#004085', // Xanh dương đậm

  ORANGE: '#FFA500',    // Màu cam
  DARK_ORANGE: '#D35400', // Cam đậm

  PURPLE: '#6F42C1',    // Màu tím
  DARK_PURPLE: '#4A148C', // Tím đậm

  PINK: '#E83E8C',      // Màu hồng
  DARK_PINK: '#C2185B', // Hồng đậm

  GRAY: '#B0B0B0',      // Màu xám
  DARK_GRAY: '#343A40', // Xám đậm

  // Nếu cần thiết, bạn có thể bổ sung thêm một object riêng cho Dark Mode cụ thể đối với "các màu bổ sung"  
  // (ví dụ: nếu muốn nền, chữ, icon… có giá trị khác so với chế độ Light)
  darkColors: {
    PRIMARY: '#FF2156', // có thể giữ nguyên hoặc tùy chỉnh
    WHITE: '#FFFFFF',   // trong Dark Mode có thể sử dụng màu xanh đen thay cho trắng nếu muốn
    BLACK: '#000000',
    // Các màu khác có thể điều chỉnh theo gu dark (ở đây mình giữ nguyên vì đã phù hợp)
  }
};
