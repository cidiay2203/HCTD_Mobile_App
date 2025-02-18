import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Text, Button, TextInput, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { COLORS } from '@/constants';
import LoadingOverlay from './LoadingOverlay';

interface OTPVerificationModalProps {
  visible: boolean;
  loadingOverlayMessage: string,
  onClose: () => void;
  onResend: () => void; // Callback khi gửi lại mã OTP
  onVerify: (otp: string) => void; // Callback khi xác thực mã OTP
}

interface OTPFormData {
  otp: string;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  visible,
  loadingOverlayMessage,
  onClose,
  onResend,
  onVerify,
}) => {
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Quản lý trạng thái chờ  
  const { control, handleSubmit, reset } = useForm<OTPFormData>({
    defaultValues: {
      otp: ''
    }
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend]);

  const handleResendOTP = async () => {
    setIsLoading(true); // Bật trạng thái chờ
    try {
      if (canResend) {
        setTimer(60);
        setCanResend(false);
        await onResend();
      }
    } catch (error) {
      console.error('Resend OTP thất bại:', error);
    } finally {
      setIsLoading(false); // Tắt trạng thái chờ
    }
    
  };

  const onSubmit = async  (data: OTPFormData) => {
    setIsLoading(true); // Bật trạng thái chờ
    try {      
      await onVerify(data.otp);
      reset(); // Reset form sau khi xác thực
    } catch (error) {
      console.error('Xác thực thất bại:', error);
    } finally {
      setIsLoading(false); // Tắt trạng thái chờ
    }
  };

  return (
    <Modal 
      visible={visible} 
      onDismiss={onClose} 
      transparent 
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.inputWrapper}>
            <Controller
              name="otp"
              control={control}
              rules={{
                required: 'Vui lòng nhập mã OTP',
                minLength: { value: 6, message: 'Mã OTP phải có 6 ký tự' },
                maxLength: { value: 6, message: 'Mã OTP phải có 6 ký tự' },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                  <TextInput
                    mode="outlined"
                    label=""
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="numeric"
                    maxLength={6}
                    placeholder="Nhập mã OTP"
                    style={styles.input}
                    error={!!error}
                  />
                  {error && <HelperText padding={"none"} type="error" visible={true}>{error.message}</HelperText>}
                </>
              )}
            />
          </View>
          <Button
            mode="text"
            onPress={handleResendOTP}
            disabled={!canResend}
            style={[styles.resendButton, !canResend && styles.disabledButton]}
          >
            {canResend ? 'Gửi lại mã OTP' : `Gửi lại mã OTP sau ${timer}s`}
          </Button>
          <View style={styles.buttonWrapper}>
            <Button 
              mode="contained" 
              onPress={handleSubmit(onSubmit)} 
              style={styles.button}
              disabled={isLoading} // Vô hiệu hóa khi đang chờ
              loading={isLoading}
            >
              Xác thực
            </Button>
            <Button 
              mode="contained" 
              onPress={onClose} 
              style={styles.button}
              disabled={isLoading} // Vô hiệu hóa khi đang chờ
            >
              Đóng
            </Button>
          </View>
        </View>
      </View>
      <LoadingOverlay isLoading={isLoading} message={loadingOverlayMessage} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '80%',
    height: 230,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    height: 30,
    padding: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonWrapper:{
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE
  },
  resendButton: {
    marginBottom: 10,
    width: '100%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default OTPVerificationModal;