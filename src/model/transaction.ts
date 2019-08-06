import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Transaction {
    transactionId: number;
    fromAccountId: number;
    toAccountId: number;
    amount: number;
    memo: string;
    userId: number;
    localDateTime: Date; 
}
