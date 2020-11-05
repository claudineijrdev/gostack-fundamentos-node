import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const incomes = this.transactions.reduce((sum: number, { value, type }) => {
      if (type === 'income')
        return sum + value
      return sum
    },0)
    const outcomes = this.transactions.reduce((sum: number, { value, type }) => {
      if (type === 'outcome')
        return sum + value
      return sum
    },0)

    const balance: Balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes
    }
    return balance

  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
