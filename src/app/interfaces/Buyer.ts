import { ShippingAddress } from './ShippingAddress';

export interface Buyer {
    merchantBuyerId: string;
    fullName: string;
    emailAddress: string;
    contactPhone: string;
    dniNumber: string;
    shippingAddress: ShippingAddress;
  }