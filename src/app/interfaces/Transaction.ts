import { Order } from './Order';
import { Payer } from './payer';
import { CreditCard } from './CreditCard';
import { ExtraParameters } from './ExtraParameters';

export  interface Transaction {
    order: Order;
    payer: Payer;
    creditCard: CreditCard;
    extraParameters: ExtraParameters;
    type: string;
    paymentMethod: string;
    paymentCountry: string;
    deviceSessionId: string;
    ipAddress: string;
    cookie: string;
    userAgent: string;
  }