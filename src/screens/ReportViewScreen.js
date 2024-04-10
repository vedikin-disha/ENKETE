import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Pdf from 'react-native-pdf';
import Container from '../components/Container';
import { getObjectData } from '../helpers';

const ReportViewScreen = ({ route, navigation }) => {

    const { surveyId, userID } = route.params;
    const [pdfPath, setPdfPath] = React.useState('');

    useEffect(() => {
        const pdfPath = "https://cortexsolutions.in/surveyfirebase/public/reports/report-" + userID + "-" + surveyId + ".pdf";
        console.log('pdfPath: ', pdfPath)
        setPdfPath(pdfPath);
    }, []);
    
    console.log(pdfPath);

    return (
        <Container>
            <Pdf
                trustAllCerts={false}
                source={{
                    uri: pdfPath,
                    cache: true,
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={error => {
                    console.log(error);
                }}
                onPressLink={uri => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={styles.pdf}
            />
        </Container>
    )
}

export default ReportViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})