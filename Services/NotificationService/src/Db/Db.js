"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const mysql2_1 = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Db {
    constructor() {
        this._dbConfig = {
            host: process.env.DB_HOST || '',
            user: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || '',
        };
        // insert
        // update
        // delete
    }
    openConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = (0, mysql2_1.createPool)(this._dbConfig);
            return connection;
        });
    }
    // selectAll
    //TODO: teste result and add proper generic type
    selectAll(table) {
        return __awaiter(this, void 0, void 0, function* () {
            const con = yield this.openConnection();
            try {
                console.log("chicha penico");
                const sql = `SELECT * FROM ${table}`;
                const res = yield con.promise().execute(sql);
                return res[0];
            }
            catch (e) {
                console.log(e);
                throw e;
            }
            finally {
                con.end(() => { });
            }
        });
    }
}
exports.Db = Db;
