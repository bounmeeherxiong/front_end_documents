import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';
const PDFPrintComponent = () => {
    return (
      <Document>
        <Page>
          <Text>This is the contsdfsdfsfdent to be converted to PDF.</Text>
        </Page>
      </Document>
    );
  };
  export default PDFPrintComponent;