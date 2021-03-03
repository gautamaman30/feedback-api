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
exports.Database = void 0;
const configDb_1 = require("./configDb");
const getDb = new configDb_1.ConnectDb().getDb;
class Database {
    findAll(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection(`${collectionName}`).find({}).toArray();
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    insertUser(user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('users').insertOne(user_info);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    updateUser(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const updateDoc = {
                    $set: update
                };
                const result = yield db.collection('users').updateOne(filter, updateDoc);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    deleteUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('users').deleteOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    findUser(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('users').findOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    findUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('users').find(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    findTechnology(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('technologies').findOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    updateTechnology(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const updateDoc = {
                    $set: update
                };
                const result = yield db.collection('technologies').updateOne(filter, updateDoc);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    deleteTechnology(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('technologies').deleteOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    insertTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('technologies').insertOne(technology_info);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    findFeedback(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('feedbacks').findOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    findFeedbacks(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection("feedbacks").find(query).toArray();
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    findFeedbacksSorted(query, sortField) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const sortQuery = {};
                sortQuery[sortField] = -1;
                const result = yield db.collection("feedbacks").find(query).sort(sortQuery).toArray();
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    updateFeedback(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const updateDoc = {
                    $set: update
                };
                const result = yield db.collection('feedbacks').updateOne(filter, updateDoc);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    updateFeedbackCount(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const updateDoc = {
                    $push: update,
                    $inc: { "count": 1 }
                };
                const result = yield db.collection('feedbacks').updateOne(filter, updateDoc);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    insertFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('feedbacks').insertOne(feedback_info);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
    deleteFeedback(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let db;
            try {
                db = yield getDb();
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
            try {
                const result = yield db.collection('feedbacks').deleteOne(query);
                return result;
            }
            catch (e) {
                console.log(e);
                return { error: e.message };
            }
        });
    }
}
exports.Database = Database;
