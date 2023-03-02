"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    // When the order has been created,but the product has not been reserved
    OrderStatus["Created"] = "created";
    // The product has been reserved, but the user has not paid for it yet
    // The order expires before payment
    OrderStatus["Cancelled"] = "cancelled";
    // The order has successfully reserved the product
    OrderStatus["AwaitingPayment"] = "awaiting:payment";
    // The order has reserved the product and the user has paid
    OrderStatus["Complete"] = "complete";
})(OrderStatus || (OrderStatus = {}));
exports.OrderStatus = OrderStatus;
