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
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
const database = new index_1.Database();
class FeedbackService {
    getAllFeedbacks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.findAll('feedbacks');
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    editFeedbackStatus(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { $set: { status: feedback_info.status } });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.matchedCount < 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_UPDATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    editFeedbackCount(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { $push: { count_users: feedback_info.count_users }, $inc: { count: 1 } });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.matchedCount < 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_UPDATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    editFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { $set: { feedback: feedback_info.feedback } });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.matchedCount < 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_UPDATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    removeFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.deleteFeedback({ feedback_id: feedback_info.feedback_id });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.deletedCount !== 1) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                return { message: index_2.Messages.FEEDBACK_DELETED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    checkFeedbackExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let feedback_info = {};
                feedback_info[key] = value;
                const result = yield database.findFeedback(feedback_info);
                if (!result) {
                    throw new Error(index_2.Errors.FEEDBACK_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    addFeedback(feedback_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let new_feedback;
                if (feedback_info.user_id) {
                    new_feedback = {
                        feedback_id: index_2.helperFunctions.generateId(),
                        posted_by: feedback_info.posted_by,
                        name: feedback_info.name,
                        user_id: feedback_info.user_id,
                        feedback: feedback_info.feedback,
                        status: 'waiting',
                        created_on: new Date(),
                        count: 0,
                        count_users: []
                    };
                }
                else {
                    new_feedback = {
                        feedback_id: index_2.helperFunctions.generateId(),
                        posted_by: feedback_info.posted_by,
                        name: feedback_info.name,
                        technology_id: feedback_info.technology_id,
                        feedback: feedback_info.feedback,
                        status: 'waiting',
                        created_on: new Date(),
                        count: 0,
                        count_users: []
                    };
                }
                const result = yield database.insertFeedback(new_feedback);
                if (result.error || result.insertedCount < 1) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.FEEDBACK_CREATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    filterFeedbackKeys(feedback_array, key) {
        return feedback_array.filter((item) => item[key]);
    }
    filterFeedback(feedback_array, key, values) {
        let set = index_2.helperFunctions.convertArrayToSet(values);
        return feedback_array.filter((item) => item[key] && set.has(item[key]) ? true : false);
    }
    sortFeedback(feedback_array, key) {
        feedback_array.sort(function (a, b) {
            if (key === "created_on") {
                return b.created_on.getMilliseconds() - a.created_on.getMilliseconds();
            }
            if (key === "count") {
                return b.count - a.count;
            }
            return 0;
        });
        return feedback_array;
    }
}
exports.default = FeedbackService;
