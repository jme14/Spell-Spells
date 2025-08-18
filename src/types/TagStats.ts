export default class TagStats {
    amount: number;
    constructor(amount?: number) {
        this.amount = amount || 0;
    }
    increment() {
        this.amount = this.amount + 1;
    }
    toString(): string {
        return `(${this.amount})`;
    }
}
