import React from 'react';
import { View, Button, Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import { useAuth } from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signIn } = useAuth()

  async function handleSignIn() {
    FingerprintScanner.isSensorAvailable()
      .then(() => {
        FingerprintScanner.authenticate({ description: 'Digitalize sua impressão digital no scanner do dispositivo para continuar' })
          .then(() => {
            signIn()
          })
          .catch(error => {
            Alert.alert('Erro na leitura da biometria')
          })
      })
      .catch(() => {
        Alert.alert('Não é possível logar pelo TouchID ou FaceID')
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }} >
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  )
}

export default SignIn;
