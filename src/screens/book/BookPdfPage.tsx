import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'react-native-blob-util';

type Props = {
  route: any;
};

const BookPdfPage = ({route}: Props) => {
  const [localPdf, setLocalPdf] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadPdf = async () => {
      if (!route?.params?.pdfLink) return;

      const {dirs} = RNFetchBlob.fs;
      const path = `${dirs.DocumentDir}/temp.pdf`;

      try {
        await RNFetchBlob.config({
          fileCache: true,
          path,
        }).fetch('GET', route.params.pdfLink);

        setLocalPdf(path);
      } catch (error) {
        console.error('Download error: ', error);
      } finally {
        setLoading(false);
      }
    };

    downloadPdf();
  }, [route?.params?.pdfLink]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : localPdf ? (
        <Pdf
          source={{uri: localPdf}}
          trustAllCerts={true}
          style={styles.pdf}
          onLoadComplete={numberOfPages =>
            console.log(`Pages: ${numberOfPages}`)
          }
          onError={error => console.error(error)}
        />
      ) : null}
    </View>
  );
};

export default BookPdfPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
