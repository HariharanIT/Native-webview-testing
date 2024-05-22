/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  useWindowDimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  Button,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';

const requestCameraPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  } catch (err) {
    console.warn(err);
  }
};

const RenderWebView = (props: {url: string}) => {
  const {height, width} = useWindowDimensions();

  if (!props?.url) {
    return;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1D1D1D'}}>
      <WebView
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        source={{
          uri: props.url,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          height: height,
          width: width,
        }}
      />
    </SafeAreaView>
  );
};

enum DisplayWebView {
  empty = 0,
  turnkey = 1,
  turnkeyWithCustomization = 2,
  embedSdkHost = 3,
  embedSdkAttendee = 4,
}

const WebViewURL = [
  '',
  'https://conferencing.agora.io/',
  'https://sample-apps-bzgayvol9-hariharanits-projects.vercel.app/',
  'https://appbuilder-simple-practice-demo-git-native-webvi-b0be6a-agoraio.vercel.app/',
  'https://appbuilder-simple-practice-demo-git-native-webvi-f495fe-agoraio.vercel.app/',
];

function App(): JSX.Element {
  const [webView, setWebView] = useState<DisplayWebView>(DisplayWebView.empty);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (webView === DisplayWebView.empty) {
    return (
      <View style={styles.container}>
        <Button
          title="Open Turnkey"
          onPress={() => {
            setWebView(DisplayWebView.turnkey);
          }}
        />
        <View style={styles.spacer} />
        <Button
          title="Open Turnkey with Customization"
          onPress={() => {
            setWebView(DisplayWebView.turnkeyWithCustomization);
          }}
        />
        <View style={styles.spacer} />
        <Button
          title="Open EmbedSdk as Host"
          onPress={() => {
            setWebView(DisplayWebView.embedSdkHost);
          }}
        />
        <View style={styles.spacer} />
        <Button
          title="Open EmbedSdk as Attendee"
          onPress={() => {
            setWebView(DisplayWebView.embedSdkAttendee);
          }}
        />
      </View>
    );
  } else {
    return <RenderWebView url={WebViewURL[webView]} />;
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  spacer: {
    height: 20,
    width: 'auto',
  },
});
