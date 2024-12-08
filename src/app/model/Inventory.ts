export interface Inventory {
    inventoryId: number;       // Unique identifier for the inventory
    componentName: string;     // Name of the component
    quantity: number;          // Quantity available in inventory
    supplierId: number;        // ID of the supplier providing the component
    stockLevel: number;        // Current stock level of the component
    reorderThreshold: number;  // Threshold at which to reorder the component
  }
  