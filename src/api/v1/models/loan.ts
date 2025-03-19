/**
 * @interface Loan
 * @description Represents an loan object.
 */
export type Loan = {
    id: string;
    name: string;
    description: string;
    price?: number;
    created_at: Date;
    update_at: Date;
    is_reviewed: Boolean;
    is_approved: Boolean
};
