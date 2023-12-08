import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { Center, HStack, Button as NBButton, Stack } from 'native-base';
import { useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';

import { usePinchGesture } from './usePinchGesture';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { pinchRef, zoom, onPinchGestureEvent } = usePinchGesture();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  const createTwoButtonAlert = async () => {
    console.log(cameraRef.current);
    if (cameraRef.current) {
      const { uri } = await (cameraRef.current as any).takePictureAsync(); // uriはローカルイメージURIで一時的にローカルに保

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log(asset);
      }

      // const savedFile = await FileSystem.moveAsync({
      //   from: uri,
      //   to: `${FileSystem.documentDirectory}photos/Photo_${Date.now()}.jpg`,
      // });
      // console.log('Saved photo:', savedFile);
      // CameraRoll.save(uri, { type: 'photo' })
      //   .then((uri: any) => console.log('Saved photo:', uri))
      //   .catch((error: any) => console.error('Error saving photo:', error));
    }
  };

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PinchGestureHandler ref={pinchRef} onGestureEvent={onPinchGestureEvent}>
          <Camera style={styles.camera} type={type} zoom={zoom} ref={cameraRef}>
            <HStack space={3} justifyContent='center'>
              <TouchableOpacity onPress={toggleCameraType}>
                <Ionicons name='ios-camera-reverse-sharp' size={60} color='black' />
              </TouchableOpacity>
              <TouchableOpacity>
                <NBButton
                  size='lg'
                  borderRadius='full'
                  onPress={createTwoButtonAlert}
                  bg={'red.500'}
                />
              </TouchableOpacity>
            </HStack>
          </Camera>
        </PinchGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
