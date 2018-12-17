import { Component, OnInit } from '@angular/core';
import { PayuService } from '../../services/payu/payu.service';
import { ActivatedRoute } from '@angular/router';
import { EsalService } from '../../services/esal/esal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Buyer } from '../../interfaces/Buyer';
import { Merchant } from '../../interfaces/Merchant';
import { RootObject } from '../../interfaces/RootObject';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import * as moment from 'moment-timezone';
import * as luhn from 'luhn-js';
import * as md5 from 'md5';
//import swal from 'sweetalert';
import { UtilsService } from '../../services/utils/utils.service';

declare var swal: any;

@Component({
   selector: 'app-donar-dashboard',
   templateUrl: './donar-dashboard.component.html',
   styleUrls: ['./donar-dashboard.component.css']
})
export class DonarDashboardComponent implements OnInit {


   id: string;
   esal: any= [];
   usuario: Usuario;
   placeholderCodigoSeguridadValue: string;
   //para la ip
   ipAddress: any;
   //para la firma
   
   referenceCode: string= 'TestPayU';
   apiKey: string= '4Vj8eK4rloUd272L48hsrarnUA';
   currency: string= 'COP';
   merchantId: number = 508029;
   tax: number= 3193;

   varLuhn: boolean;

   //Interfaces
   buyer: Buyer;

   //FormGroup
   donacionForm: FormGroup;
   tarjetaForm: FormGroup;

   //minimos y maximos
   private numberMin: number = 1000000000000;
   private numberMax: number = 9999999999999999;

   //transaccion datos
   valorTransaccion: number;

   //patterns
   //tarjetas
   visaCreditPattern: string = '^(4)(\\d{12}|\\d{15})$|^(606374\\d{10}$)';
   mastercardPattern: string = '^(5)[1-5]\\d{14}$|^(2(?:2(?:2[1-9]|[3-9]\\d)|[3-6]\\d\\d|7(?:[01]\\d|20))\\d{12}$)';
   amexPattern: string = '^(3[47]\\d{13})$';
   dinersPattern: string = '(^[35](?:0[0-5]|[68][0-9])[0-9]{11}$)|^30[0-5]{11}$|(^3095(\\d{10})$)|(^36{12}$)|(^3[89](\\d{12})$)';
   codensaPattern: string = '^590712(\\d{10})$';
   visaDebitPattern: string = '\\d{16}$';
   //otros
   numberPattern: string = '^[1-9][0-9]{0,15}$';
   monthPattern: string = '^(0?[1-9]|1[012])$';
   emailPattern: string = '^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$';
   alphaPattern: string = '^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$';


   constructor(public payuService: PayuService, public activatedRoute: ActivatedRoute,
      public esalService: EsalService, public usuarioService: UsuarioService, public utilsService: UtilsService) {


      this.obtenerIp();
      this.getJSessionId();


      this.usuario = this.usuarioService.usuario;
      this.activatedRoute.params.subscribe(params => {

         this.id = params['id'];

      });

      this.esalService.obtenerEsalPorId(this.id).subscribe((resp: any) => {

         console.log("Esal: ", resp);
         this.esal = resp.esal;

      });


      //forms

      this.donacionForm = new FormGroup({
         valoraDonar: new FormControl(null, Validators.required),
         otroCheck: new FormControl(null),
         otroValor: new FormControl(null, [this.valorMinValidation, this.valorMaxValidation])
      });

      this.tarjetaForm = new FormGroup({
         tipoTarjeta: new FormControl(null, Validators.required),
         numeroTarjeta: new FormControl(null, Validators.required),
         tipoDocumento: new FormControl(null, Validators.required),
         numeroDocumento: new FormControl(null, [Validators.required, Validators.pattern(this.numberPattern)]),
         anioVencimiento: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.pattern(this.numberPattern), this.anioVencimientoValidation]),
         mesVencimiento: new FormControl(null, [Validators.required, Validators.maxLength(2), Validators.pattern(this.monthPattern)]),
         codigoSeguridad: new FormControl(null, [Validators.required, Validators.pattern(this.numberPattern)]),
         nombreTarjeta: new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.pattern(this.alphaPattern)])
      });


      this.donacionForm.enable();
      this.tarjetaForm.disable();
      this.donacionForm.controls['otroValor'].disable();
      this.donacionForm.controls['otroValor'].setValue(10000);

   }

   ngOnInit() {

   }

   habilitarValidacionesMes() {

      console.log('habilitavalidacionesmes');
      this.tarjetaForm.controls['mesVencimiento'].setValidators([Validators.required, this.mesVencimientoValidation]);
      this.tarjetaForm.controls['mesVencimiento'].enable();
   }
   habilitarOtroValor() {
      console.log(this.donacionForm.value);
      if (this.donacionForm.controls['valoraDonar'].enabled) {
         this.donacionForm.controls['valoraDonar'].disable();
         this.donacionForm.controls['otroValor'].enable();
      }
      else {
         this.donacionForm.controls['valoraDonar'].enable();
         this.donacionForm.controls['otroValor'].disable();

      }
   }

   habilitarValidacionesNumeroDocumento() {

      if (this.tarjetaForm.value.tipoDocumento === 'CC') {
         console.log('CC');
         this.tarjetaForm.controls['numeroDocumento'].setValidators([Validators.required, Validators.pattern(this.numberPattern)]);
      }
      if (this.tarjetaForm.value.tipoDocumento === 'TI') {
         console.log('TI');
         this.tarjetaForm.controls['numeroDocumento'].setValidators([Validators.required, Validators.pattern(this.numberPattern)]);
      }

   }

   GuardarDonacion() {
      console.log(this.donacionForm);


      if (this.donacionForm.value.otroCheck === true) {
         this.valorTransaccion = this.donacionForm.value.otroValor;

      }
      if (this.donacionForm.value.otroCheck === null || this.donacionForm.value.otroCheck === false) {
         console.log('DONACION: ', this.donacionForm.value.valoraDonar);

         if (this.donacionForm.value.valoraDonar === '10.000') {
            this.valorTransaccion = 10000;
         }
         if (this.donacionForm.value.valoraDonar === '20.000') {
            this.valorTransaccion = 20000;
         }
         if (this.donacionForm.value.valoraDonar === '30.000') {
            this.valorTransaccion = 30000;
         }
         if (this.donacionForm.value.valoraDonar === '40.000') {
            this.valorTransaccion = 40000;
         }
         if (this.donacionForm.value.valoraDonar === '50.000') {
            this.valorTransaccion = 50000;
         }
         if (this.donacionForm.value.valoraDonar === '60.000') {
            this.valorTransaccion = 60000;
         }
         if (this.donacionForm.value.valoraDonar === '70.000') {
            this.valorTransaccion = 70000;
         }
         if (this.donacionForm.value.valoraDonar === '80.000') {
            this.valorTransaccion = 80000;
         }
         if (this.donacionForm.value.valoraDonar === '90.000') {
            this.valorTransaccion = 90000;
         }
         if (this.donacionForm.value.valoraDonar === '100.000') {
            this.valorTransaccion = 100000;
         }
         if (this.donacionForm.value.valoraDonar === '200.000') {
            this.valorTransaccion = 200000;
         }
         if (this.donacionForm.value.valoraDonar === '300.000') {
            this.valorTransaccion = 300000;
         }

      }
      swal({
         title: "Estas seguro?",
         text: "Deseas donar " + this.valorTransaccion + "?",
         icon: "info",
         buttons: true,
         dangerMode: true,
      })
         .then((willDelete) => {
            if (willDelete) {
               swal("Gracias, hemos guardado el valor a donar!", {
                  icon: "success",
               });
               this.donacionForm.disable();
               this.tarjetaForm.enable();
            }
         });

      console.log('Valor transaccion: ', this.valorTransaccion);

   }
   GuardarTarjeta() {

      this.habilitarValidacionLuhn();

      if (this.varLuhn) {
         swal("Muy bien!", "La tarjeta fue verificada correctamente!", "success");

         console.log(this.tarjetaForm.value);







      }
      else {
         swal("Upps!", "La tarjeta debe ser modificada!", "error");
      }

   }

   habilitarValidacionesTarjeta() {

      if (this.tarjetaForm.value.tipoTarjeta === 'VISA') {
         console.log('visa');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.visaCreditPattern), Validators.min(this.numberMin), Validators.max(this.numberMax)]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
         this.tarjetaForm.controls['codigoSeguridad'].setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(this.numberPattern)]);
         this.tarjetaForm.controls['codigoSeguridad'].enable();
         this.placeholderCodigoSeguridadValue = '000';
      }
      if (this.tarjetaForm.value.tipoTarjeta === 'VISA_DEBIT') {
         console.log('visa');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.visaDebitPattern), Validators.min(this.numberMin), Validators.max(this.numberMax)]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
         this.tarjetaForm.controls['codigoSeguridad'].disable();
        // this.tarjetaForm.value.codigoSeguridad = '0';
      }
      if (this.tarjetaForm.value.tipoTarjeta === 'MASTERCARD') {
         console.log('mastercard');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.mastercardPattern), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
         this.tarjetaForm.controls['codigoSeguridad'].setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(this.numberPattern)]);
         this.tarjetaForm.controls['codigoSeguridad'].enable();
         this.placeholderCodigoSeguridadValue = '000';

      }
      if (this.tarjetaForm.value.tipoTarjeta === 'AMEX') {
         console.log('AmericanExpress');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.amexPattern), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
         this.tarjetaForm.controls['codigoSeguridad'].setValidators([Validators.required, Validators.maxLength(4), Validators.pattern(this.numberPattern)]);
         this.tarjetaForm.controls['codigoSeguridad'].enable();
         this.placeholderCodigoSeguridadValue = '0000';

      }
      if (this.tarjetaForm.value.tipoTarjeta === 'DINERS') {
         console.log('DinersClub');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.dinersPattern), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
         this.tarjetaForm.controls['codigoSeguridad'].setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(this.numberPattern)]);
         this.tarjetaForm.controls['codigoSeguridad'].enable();
         this.placeholderCodigoSeguridadValue = '000';

      }
      if (this.tarjetaForm.value.tipoTarjeta === 'CODENSA') {
         console.log('CreditoFacilCodensa');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.codensaPattern), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
         this.tarjetaForm.controls['codigoSeguridad'].setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(this.numberPattern)]);
         this.tarjetaForm.controls['codigoSeguridad'].enable();
         this.placeholderCodigoSeguridadValue = '000';

      }

   }


   authorizacionYcaptura() {

    

      this.buyer = {
         merchantBuyerId: this.usuarioService.usuario._id,
         fullName: this.usuarioService.usuario.nombre,
         emailAddress: this.usuarioService.usuario.email,
         contactPhone: "7563126",
         dniNumber: "5415668464654",
         shippingAddress: {
            "street1": "null",
            "street2": "5555487",
            "city": "Medellin",
            "state": "Antioquia",
            "country": "CO",
            "postalCode": "000000",
            "phone": "7563126"
         }
      };

      let merchant: Merchant = {
         apiKey: this.apiKey,
         apiLogin: "pRRXKOl8ikMmt9u"
      };

      let body: RootObject = {
         language: "es",
         command: "SUBMIT_TRANSACTION",
         merchant: merchant,
         transaction: {
            order: {
               accountId: "512321",
               referenceCode: this.referenceCode,
               description: "payment test",
               language: "es",
               signature: this.convertirAmd5(),
               notifyUrl: "http://www.tes.com/confirmation",
               additionalValues: {
                  TX_VALUE: {
                     value: this.valorTransaccion,
                     currency: this.currency
                  },
                  TX_TAX: {
                     value: this.tax,
                     currency: this.currency
                  },
                  TX_TAX_RETURN_BASE: {
                     value: 0,
                     currency: this.currency
                  }
               },
               buyer: this.buyer,
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
               dniNumber: this.tarjetaForm.value.numeroDocumento.toString(),
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
               number: this.tarjetaForm.value.numeroTarjeta.toString(),
               securityCode: this.tarjetaForm.value.codigoSeguridad.toString(),
               expirationDate: this.tarjetaForm.value.anioVencimiento.toString() + '/' + this.tarjetaForm.value.mesVencimiento.toString(),
               name: this.tarjetaForm.value.nombreTarjeta.toString()
            },
            extraParameters: {
               INSTALLMENTS_NUMBER: 1
            },
            type: "AUTHORIZATION_AND_CAPTURE",
            paymentMethod: this.tarjetaForm.value.tipoTarjeta,
            paymentCountry: "CO",
            deviceSessionId: "vghs6tvkcle931686k1900o6e1",
            ipAddress: this.ipAddress,
            cookie: "pt1t38347bs6jc9ruv2ecpv7o2",
            userAgent: "Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0"
         },
         test: false
      };

      let  bodystring =  JSON.stringify(body);
      console.log('body:', bodystring);
      this.payuService.authorizacionYcaptura(body).subscribe();
   }

   valorMinValidation(control: FormControl): { [s: string]: boolean } {

      if (control.value <= 8647) {
         return { valormin: true }
      }
      return null;
   }

   valorMaxValidation(control: FormControl): { [s: string]: boolean } {

      if (control.value > 14412000) {
         return { valormax: true }
      }
      return null;
   }

   anioVencimientoValidation(control: FormControl): { [s: string]: boolean } {

      const now = new Date();
      console.log('Fecha', now);
      console.log('año', now.getFullYear());

      if (control.value < now.getFullYear()) {
         return { anioError: true }
      }
      return null;
   }
   mesVencimientoValidation = (control: FormControl) => {

      let hoy = moment();// creating obj.
      hoy.tz('America/Bogota').format('hh : mm : ss a z');

      console.log('AÑO ACTUAL', hoy.get('year'));
      console.log('MES ACTUAL', (hoy.get('month') + 1));
      //convertir de string a number
      var mesIngresado = +control.value;
      console.log('mesIngresado', mesIngresado);

      if (this.tarjetaForm.controls['anioVencimiento'].value === hoy.get('year')) {

         if (mesIngresado < (hoy.get('month') + 1)) {
            return { mesError: true };
         }
         return null;
      }
   }


   habilitarValidacionLuhn() {

      if (this.tarjetaForm.value.tipoTarjeta === 'VISA_DEBIT') {
         console.log('visa');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.visaDebitPattern), Validators.min(this.numberMin), Validators.max(this.numberMax), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
      }
      if (this.tarjetaForm.value.tipoTarjeta === 'VISA') {
         console.log('visa');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.visaCreditPattern), Validators.min(this.numberMin), Validators.max(this.numberMax), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
      }
      if (this.tarjetaForm.value.tipoTarjeta === 'MASTERCARD') {
         console.log('mastercard');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.mastercardPattern), Validators.min(this.numberMin), Validators.max(this.numberMax), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
      }
      if (this.tarjetaForm.value.tipoTarjeta === 'AMEX') {
         console.log('AmericanExpress');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.amexPattern), Validators.min(this.numberMin), Validators.max(this.numberMax), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
      }
      if (this.tarjetaForm.value.tipoTarjeta === 'DINERS') {
         console.log('DinersClub');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.dinersPattern), Validators.min(this.numberMin), Validators.max(this.numberMax), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
      }
      if (this.tarjetaForm.value.tipoTarjeta === 'CODENSA') {
         console.log('CreditoFacilCodensa');
         this.tarjetaForm.controls['numeroTarjeta'].setValidators([Validators.required, Validators.pattern(this.codensaPattern), Validators.min(this.numberMin), Validators.max(this.numberMax), this.validacionLuhn]);
         this.tarjetaForm.controls['numeroTarjeta'].setValue(this.tarjetaForm.controls['numeroTarjeta'].value);
      }


   }
   validacionLuhn = (control: FormControl) => {

      if (this.tarjetaForm.controls['numeroTarjeta'].value !== null) {

         if (!luhn.isValid(this.tarjetaForm.controls['numeroTarjeta'].value.toString())) {

            this.varLuhn = false;


            return { luhnError: true };

         }
      }
      this.varLuhn = true;
      return null;
   }

   convertirAmd5() {
      console.log('MD5:', md5('' + this.apiKey + '~' + this.merchantId + '~' +  this.referenceCode + '~' + this.valorTransaccion + '~' + this.currency));
         return md5('' + this.apiKey + '~' + this.merchantId + '~' +  this.referenceCode + '~' + this.valorTransaccion + '~' + this.currency);
   }
   getJSessionId() {
      let jsId = document.cookie.match(/JSESSIONID=[^;]+/);
      console.log("Session Id:", jsId);
      /*   if(jsId != null) {
            if (jsId instanceof Array)
                jsId = jsId[0].substring(11);
            else
                jsId = jsId.substring(11);
        }
        return jsId; */
   }
   obtenerIp() {

      this.utilsService.obtenerIp().subscribe(data => {
         console.log('th data', data.ip);
         this.ipAddress = data.ip;
      });

   }


}