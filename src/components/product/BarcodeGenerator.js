import React, { useState, useEffect }from "react";
import { useLocation, NavLink, useParams} from 'react-router-dom';
import JsBarcode from "jsbarcode";
// import Loading from "../../../components/Loading";

import Barcode from 'react-barcode';
import { Page, Text, Image, View, Document,
  StyleSheet, Defs, ClipPath, LinearGradient, RadialGradient,
  Svg, Line, Polyline, Path, Rect, Ellipse, Tspan, G, Circle, Polygon, Stop } from '@react-pdf/renderer';
// import html2canvas from "html2canvas";


// Create styles
const styles = StyleSheet.create({

    page: {
      flexDirection: 'colum',
      backgroundColor: 'white'
    },
    section: {
      border: '1px solid red',
      width: '100%',
      flexDirection: 'row',
      padding: 10,
      margin:'0 auto',
      textAlign: 'center'
    },
    TextSection: {
      flexDirection: 'colum',
      textAlign: 'left',
      fontSize:'12pt',
      margin:'5px 0 0 5px'
    },
    cut:{
      border: '1px dashed red',
      padding:'3px 0 0 0',
      margin:'3px 0 3px 3px',
      flexDirection: 'row',
      width: '275px',
      height: '72px'
    }
  });


  const ReactPDFSvgBarcode = ({text}) => {

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    var barcode = JsBarcode(svg, text, {  displayValue: false, width:.7, height: 50});

    var jsxElment = (
      <View wrap={false} style={styles.cut}>
        
        <Svg wrap={false} style={{ width:'260', height: '72px', padding:'5px 0 0 5px'}}>
          {/* <Rect x='0' y='0' width='229' height='62px' style={{fill:'#ffffff'}}/> */}

          <G style={{width:'260px', height: '70px', transform:"translate(0,0)"}}>
          {
                Object.keys(svg.children[1].children).map( (index, item) => {
                return( <Rect style={{ fill:'black' }} key={item}
                        x={svg.children[1].children[item].attributes.x.value }
                        y={svg.children[1].children[item].attributes.y.value}
                        width={svg.children[1].children[item].attributes.width.value}
                        height={svg.children[1].children[item].attributes.height.value} >

                      </Rect>);
                })
            }
          </G>
      </Svg>
      <Svg viewBox="0 0 15 15" style={{ width:'10', height:'10', position: 'absolute', transform:`translate(260, 30)`}}  > 
          <Circle r="4" cx={7.5} cy={7.5} fill='red'/>
      </Svg>
      
      </View>
    )

    return jsxElment
  }


const BarcodeGenerator  = ({ productName, varientData, isLoading }) => {
    
    return(
        <Document>
            <Page size="A4" style={styles.page}>

              {
                !isLoading ? 
                  varientData?.map( item => {
                    return (
                      <View key={item.sku} style={styles.section}>
                        <ReactPDFSvgBarcode key={item.sku}  text={item.sku} ></ReactPDFSvgBarcode>
                        <View key={item.sku}  style={styles.TextSection}> 
                          <Text key={item.sku}> Name: {productName} </Text>
                          <Text key={item.sku}> color: {item.color} </Text>
                          <Text key={item.sku}> Talla:{item.size} </Text>
                        </View>
                      </View>
                    )
                  })
                  : <Text>  No Information </Text>
              }
            </Page>
        </Document>
    )
}



export default BarcodeGenerator;