export enum Role {
    Admin = "ADMIN",
    Vendor = "Vendor",
    InventoryManager = "InventoryManager",
    SuperUser = "SuperUser",
}

export const roles = [
    { value: Role.Admin, view_value: "Admin"},
    { value: Role.Vendor, view_value: "Vendor"},
    { value: Role.InventoryManager, view_value: "Inventory Manager"},
    { value: Role.SuperUser, view_value: "Super User"},
];