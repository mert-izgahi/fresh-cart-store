export interface QueryType {
    status?: string;
    name?: string;
}
export interface ICartItem {
    name: string;
    image: string;
    price: number;
    quantity: number;
    productId: string;
}

export interface IShippingAddress {
    type: "ShippingAddress";
    address: string;
    postalCode: string;
}
