"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseConnection = void 0;
const client_1 = require("@prisma/client");
class DataBaseConnection {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.prisma = new client_1.PrismaClient();
    }
    async connectToDatabase() {
        try {
            await this.prisma.$connect();
        }
        catch (error) {
            window.location.reload();
            console.error('Error connecting to the database:', error);
        }
    }
}
exports.DataBaseConnection = DataBaseConnection;
//# sourceMappingURL=databaseconnection.js.map