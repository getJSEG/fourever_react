import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";

import { Document, Page, Text, View, StyleSheet, Font, Image }from '@react-pdf/renderer';
import { PDFViewer } from "@react-pdf/renderer";

import image from "../../../../static/images/company-logo-drak-gray-trans.png";

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

        const [changeDue, setChangeDue] = useState(0);
        const [amountPaid, setAmountPaid] = useState(0);

        useEffect( () => {
            const transactionType = receiptData?.paymentMethod?.transactionType

            if (transactionType == "bank_transfer") {
                setAmountPaid(receiptData?.paymentMethod?.transferPaymentMethod?.amount)
            }else if (transactionType == "credit_card") {
                setAmountPaid(receiptData?.paymentMethod?.creditcardPaymentMethod?.amount)
            }else {
                setAmountPaid(receiptData?.paymentMethod?.cashPaymentMethod?.amount)
                setChangeDue(receiptData?.paymentMethod?.cashPaymentMethod?.changeDue)
            }

        }, [receiptData])

        return (
        <Document>
            <Page size={{width: 200}} style={styles.page}>
                <View style={styles.topSection}>
                    <View>
                        <Image src={image} style={{ width: 150, margin:"auto" }}/>
                    </View>
                    <Text>RECIBO</Text>
                </View>
                {/* This is where the products will go */}
                <View style={styles.middleSection}>

                    {
                        receiptData?.OrderLine?.map( item => {
                            return ( <view style={styles.middleSectionProduct}>
                                        <View style={styles.prodInfo}>
                                            <view style={styles.spacingRight}> 
                                                <Text>{item?.quantity}x</Text> 
                                            </view>
                                            <view style={styles.spacingRight}> 
                                                <Text>{item?.name}</Text> 
                                            </view>
                                            
                                        </View>
                                        <View style={styles.amount}> 
                                            <Text>{formatCurrecy(item?.subtotal)}</Text> 
                                        </View>
                                    </view>)

                        })
                    }

                </View>
                
                    {/* Grand total */}
                <View style={styles.bottomSection}>
                    <view style={styles.paymentInfo}>
                        <Text>Monto Total</Text>
                        <Text>{formatCurrecy(receiptData?.totalAmount)}</Text>
                    </view>
                </View>
                    {/* Transaction type */}
                <View style={styles.paymentInfo}>
                    <Text>tipo de transac.</Text>
                    <Text>{receiptData?.paymentMethod?.transactionType}</Text>
                </View>
                    {/* How much customer paide */}
                <View style={styles.bottomSection}>
                    <view style={styles.paymentInfo}>
                        <Text>Pagado</Text>
                        <Text>{formatCurrecy(amountPaid)}</Text>
                    </view>

                    <view style={styles.paymentInfo}>
                        <Text>Cambio</Text>
                        <Text>{formatCurrecy(changeDue || 0)}</Text>
                    </view>
                    
                </View>

                <View style={styles.thanYouSec}>
                    <Text>Gracias por tu Compra</Text>
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
