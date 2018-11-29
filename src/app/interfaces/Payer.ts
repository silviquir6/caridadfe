import { ShippingAddress } from './ShippingAddress';

export interface Payer {
    merchantPayerId: string;
    fullName: string;
    emailAddress: string;
    contactPhone: string;
    dniNumber: string;
    billingAddress: ShippingAddress;
  }