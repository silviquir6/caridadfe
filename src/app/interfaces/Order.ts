import { AdditionalValues } from './AdditionalValues';
import { Buyer } from './Buyer';
import { ShippingAddress } from './ShippingAddress';

export interface Order {
    accountId: string;
    referenceCode: string;
    description: string;
    language: string;
    signature: string;
    notifyUrl: string;
    additionalValues: AdditionalValues;
    buyer: Buyer;
    shippingAddress: ShippingAddress;
  }