import React, { useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";

import { Document, Page, Text, View, StyleSheet, Font }from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";

// font 
import incosolataLight from '../../../../utils/fonts/InconsolataLight.ttf';
import inconsolataSemiBold from '../../../../utils/fonts/InconsolataSemiBold.ttf';

import { formatCurrecy } from "../../../../utils/currencyFormatter";

const PrintReceipt = () => {

    const { state } = useLocation();
    const receiptInfo = state;
    const navigate = useNavigate();

    useEffect( () => {
        if(receiptInfo === null || receiptInfo === undefined) {
            navigate('/point-of-sales', { replace: true });
        }
    }, []);

    const receiptData = receiptInfo?.receiptInfo;

    Font.register({
        family: 'Inconsolata',
        format: 'truetype',
        fonts: [
            {
                src: incosolataLight,
                fontWeight: 300
            },
            {
                src: inconsolataSemiBold,
                fontWeight: 500
            },
        ]
    })

    const styles = StyleSheet.create( {
        page: {
            fontFamily: 'Inconsolata',
            fontSize: 10,
            paddingTop: 8,
            paddingBottom: 8, 
            paddingLeft: 5,
            paddingRight: 5, 
            flexDirection: 'colum',
        },
        topSection: {
            marginTop: 5,
            marginBottom: 5,
            paddingBottom: 5,
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 500,
            fontSize: 15,
            borderBottom: '1px dashed black',
        },

        // Style for the container
        middleSection: {
            display: 'flex',
            flexDirection: 'colum',
        },
        // Style for each product line
        middleSectionProduct: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 3,
            paddingBottom: 3,
        },
        prodInfo: {
            maxWidth: '100em',
            display: 'flex',
            flexDirection: 'row',
        },

        spacingRight: {
            paddingRight: 5,
        },

        amount: {
            maxWidth: '45%',
            overflow: 'ellipsis'
        },


        bottomSection: {
            borderTop:'1px dashed black',
            display: 'flex',
            flexDirection: 'colum',
            fontWeight: 500,
            fontSize: 12,
            paddingTop:3,
            marginTop: 5,
            marginBottom: 5,
        },
        paymentInfo: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },

        thanYouSec: {
            borderTop: '1px dashed black',
            fontWeight: 500,
            fontSize: 12,
            textAlign: 'center'
        },
    });


    const Receipt = () => {
        return (
        <Document>
            <Page size={{width: 200}} style={styles.page}>
                <View style={styles.topSection}>
                    <Text>RECIBO</Text>
                </View>
                {/* This is where the products will go */}
                <View style={styles.middleSection}>

                    {
                        receiptData?.lineItems.map( item => {
                            return ( <view style={styles.middleSectionProduct}>
                                        <View style={styles.prodInfo}>
                                            <view style={styles.spacingRight}> 
                                                <Text>{item?.qty}x</Text> 
                                            </view>
                                            
                                        </View>
                                        <View style={styles.amount}> 
                                            <Text>{formatCurrecy((Number(item?.price )* Number(item?.qty)))}</Text> 
                                        </View>
                                    </view>)

                        })
                    }

                </View>
                
                    {/* Grand total */}
                <View style={styles.bottomSection}>
                    <view style={styles.paymentInfo}>
                        <Text>Monto Total</Text>
                        <Text>{formatCurrecy(receiptData?.receipt?.grandTotal)}</Text>
                    </view>
                </View>
                    {/* Transaction type */}
                <View style={styles.paymentInfo}>
                    <Text>tipo de transac.</Text>
                    <Text>{receiptData?.receipt?.transaction_type}</Text>
                </View>
                    {/* How much customer paide */}
                <View style={styles.bottomSection}>
                    <view style={styles.paymentInfo}>
                        <Text>Pagado</Text>
                        <Text>{formatCurrecy(receiptData?.receipt?.TotalReceived)}</Text>
                    </view>

                    <view style={styles.paymentInfo}>
                        <Text>Cambio</Text>
                        <Text>{formatCurrecy(0)}</Text>
                    </view>
                    
                </View>

                <View style={styles.thanYouSec}>
                    <Text>Gracias por tu Compra</Text>
                </View>

                <View style={styles.thanYouSec}>
                    <Text>4EVER</Text>
                </View>

            </Page>
        </Document>);
    }
    return (
        <PDFViewer  className="main-container" style={{ width: '85%', height: '50em' }}>
            <Receipt />
        </PDFViewer>
    );
}

export default PrintReceipt;
