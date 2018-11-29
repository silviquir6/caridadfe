import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_PAYU_PROD, URL_PAYU_SANDBOX } from '../../config/config';
import { Merchant } from '../../interfaces/Merchant';
import { RootObject } from '../../interfaces/RootObject';


@Injectable({
  providedIn: 'root'
})
export class PayuService {

  constructor(public http: HttpClient) { }


  authorizacionYcaptura() {

    let bodyFinal: any;

    let merchant : Merchant = {
      apiKey: "4Vj8eK4rloUd272L48hsrarnUA",
      apiLogin: "pRRXKOl8ikMmt9u"
   };

    let body : RootObject = {
      language: "es",
      command: "SUBMIT_TRANSACTION",
      merchant: merchant ,
      transaction: {
         order: {
            accountId: "512321",
            referenceCode: "TestPayU",
            description: "payment test",
            language: "es",
            signature: "7ee7cf808ce6a39b17481c54f2c57acc",
            notifyUrl: "http://www.tes.com/confirmation",
            additionalValues: {
               TX_VALUE: {
                  value: 20000,
                  currency: "COP"
            },
               TX_TAX: {
                  value: 3193,
                  currency: "COP"
            },
               TX_TAX_RETURN_BASE: {
                  value: 16806,
                  currency: "COP"
            }
            },
            buyer: {
               merchantBuyerId: "1",
               fullName: "First name and second buyer  name",
               emailAddress: "buyer_test@test.com",
               contactPhone: "7563126",
               dniNumber: "5415668464654",
               shippingAddress: {
                  "street1": "calle 100",
                  "street2": "5555487",
                  "city": "Medellin",
                  "state": "Antioquia",
                  "country": "CO",
                  "postalCode": "000000",
                  "phone": "7563126"
               }
            },
            shippingAddress: {
               street1: "calle 100",
               street2: "5555487",
               city: "Medellin",
               state: "Antioquia",
               country: "CO",
               postalCode: "0000000",
               phone: "7563126"
            }
         },
         payer: {
            merchantPayerId: "1",
            fullName: "First name and second payer name",
            emailAddress: "payer_test@test.com",
            contactPhone: "7563126",
            dniNumber: "5415668464654",
            billingAddress: {
               street1: "calle 93",
               street2: "125544",
               city: "Bogota",
               state: "Bogota DC",
               country: "CO",
               postalCode: "000000",
               phone: "7563126"
            }
         },
         creditCard: {
            number: "4097440000000004",
            securityCode: "321",
            expirationDate: "2019/12",
            name: "REJECTED"
         },
         extraParameters: {
            INSTALLMENTS_NUMBER: 1
         },
         type: "AUTHORIZATION_AND_CAPTURE",
         paymentMethod: "VISA",
         paymentCountry: "CO",
         deviceSessionId: "vghs6tvkcle931686k1900o6e1",
         ipAddress: "127.0.0.1",
         cookie: "pt1t38347bs6jc9ruv2ecpv7o2",
         userAgent: "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
      },
      test: false };
    
    

     console.log('body', body);
    
 
    

 //let  invocation = new XMLHttpRequest();

  


    console.log(body);

    let url = URL_PAYU_SANDBOX;
    return this.http.post(url, body)
      .pipe(map((resp: any) => {
        console.log(resp);
       // return resp;

      }));

  }
}
