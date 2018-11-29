import { Transaction } from './Transaction';
import { Merchant } from './Merchant';

export interface RootObject {
    language: string;
    command: string;
    merchant: Merchant;
    transaction: Transaction;
    test: boolean;
  }
