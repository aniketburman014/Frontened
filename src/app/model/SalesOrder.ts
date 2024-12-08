export interface SalesOrder {
    orderId: number; // Unique identifier for the sales order
    customerId: number; // ID of the customer
    carModelId: number; // ID of the car model
    orderDate: Date; // Date when the order was placed
    deliveryDate?: Date; 
    price: number; 
    status: string; 
  }
  