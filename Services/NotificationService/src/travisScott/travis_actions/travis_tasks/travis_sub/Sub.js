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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sub = void 0;
const Db_1 = require("../../../../Db/Db");
class Sub {
    createSub(email, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("\n\n entro 0 \n\n");
            const db = new Db_1.Db();
            try {
                const result = yield db.selectAll("Subs");
                console.log("\n\n entro 2 \n\n");
                console.log(result, typeof (result));
            }
            catch (e) {
                console.log(e);
                throw (e);
                //}finally {
                //    conn.end(() => {
                // close all connections
                //    })
            }
        });
    }
}
exports.Sub = Sub;
