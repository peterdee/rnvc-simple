import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  fill: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const device = useCameraDevice('back');

  const {hasPermission, requestPermission} = useCameraPermission();
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const fp = useFrameProcessor(frame => {
    'worklet';
    console.log(frame);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {!device && (
        <View>
          <Text>Camera is not available!</Text>
        </View>
      )}
      {device && (
        <View style={styles.fill}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            frameProcessor={fp}
            isActive={true}
            fps={30}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default App;
