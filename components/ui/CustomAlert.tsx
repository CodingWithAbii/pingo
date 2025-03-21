import React from 'react';
import { Modal, View, Text, StyleSheet, Platform, useColorScheme, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import Button from '@/components/ui/Button';

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: AlertButton[];
  onClose?: () => void;
  style?: 'default' | 'warning' | 'error' | 'success';
}

export const showAlert = (
  title: string, 
  message: string, 
  setAlertState: React.Dispatch<React.SetStateAction<CustomAlertProps>>,
  buttons?: AlertButton[],
  style?: 'default' | 'warning' | 'error' | 'success'
) => {
  setAlertState({
    visible: true,
    title,
    message,
    buttons,
    style,
  });
};

const getStyleColor = (style?: string) => {
  switch(style) {
    case 'warning':
      return '#FFA500';
    case 'error':
      return '#FF4444';
    case 'success':
      return '#00C851';
    default:
      return colors.primary;
  }
};

export default function CustomAlert({ 
  visible, 
  title, 
  message, 
  buttons = [{ text: 'U redu', onPress: () => {}, style: 'default' }],
  onClose,
  style = 'default'
}: CustomAlertProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styleColor = getStyleColor(style);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.centeredView} 
        onPress={onClose}
      >
        <Pressable style={[
          styles.modalView,
          { backgroundColor: isDark ? colors.dark.background : colors.light.background }
        ]}>
          <Text style={[
            styles.title,
            { color: isDark ? colors.dark.text : colors.light.text }
          ]}>{title}</Text>
          <Text style={[
            styles.message,
            { color: isDark ? colors.dark.text : colors.light.text }
          ]}>{message}</Text>
          <View style={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                title={button.text}
                onPress={() => {
                  button.onPress();
                  onClose?.();
                }}
                textColor={colors.light.background}
                style={[
                  styles.alertButton,
                  index > 0 && styles.buttonMargin,
                  button.style === 'destructive' && { backgroundColor: '#FF4444' },
                  button.style === 'cancel' && { backgroundColor: '#757575' },
                ]}
              />
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '90%',
    ...Platform.select({
      web: {
        maxWidth: 320,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
  alertButton: {
    width: '100%',
    minHeight: 50,
  },
  buttonMargin: {
    marginTop: 8,
  },
}); 