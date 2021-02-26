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
const index_1 = require("../services/index");
const index_2 = require("../utils/index");
class FeedbackController {
    getFeedbacks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const feedback_id = req.query.feedback_id;
                const filter = req.query.filter;
                const sort = req.query.sort;
                let admin;
                if (admin_key) {
                    admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                    if (admin.error)
                        throw new Error(admin.error);
                }
                let feedbacks = yield index_1.feedbackService.getAllFeedbacks();
                if (feedback_id) {
                    const feedback = yield index_1.feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                    if (feedback.error)
                        throw new Error(feedback.error);
                    feedbacks = feedback;
                }
                else if (filter || sort) {
                    if (filter) {
                        if (filter === "user") {
                            feedbacks = index_1.feedbackService.filterFeedbackKeys(feedbacks, "user_id");
                        }
                        else if (filter === "technology") {
                            feedbacks = index_1.feedbackService.filterFeedbackKeys(feedbacks, "technology_id");
                        }
                        else if (filter === "status") {
                            feedbacks = index_1.feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
                        }
                    }
                    if (sort) {
                        if (sort === "date") {
                            feedbacks = index_1.feedbackService.sortFeedback(feedbacks, "created_on");
                        }
                        else if (sort === "count") {
                            feedbacks = index_1.feedbackService.sortFeedback(feedbacks, "count");
                        }
                    }
                }
                if (!admin) {
                    feedbacks = index_1.feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
                }
                res.status(200);
                res.send({ "feedbacks": feedbacks });
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    getFeedbacksByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const user_id = req.query.user_id;
                if (!user_id) {
                    throw new Error(index_2.Errors.USER_ID_REQUIRED);
                }
                let admin;
                if (admin_key) {
                    admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                    if (admin.error)
                        throw new Error(admin.error);
                }
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error)
                    throw new Error(user.error);
                let feedbacks = yield index_1.feedbackService.getAllFeedbacks();
                feedbacks = index_1.feedbackService.filterFeedback(feedbacks, "posted_by", [user_id]);
                if (!admin) {
                    feedbacks = index_1.feedbackService.filterFeedback(feedbacks, "status", ['approved']);
                }
                res.status(200);
                res.send({ "feedbacks": feedbacks });
            }
            catch (e) {
                console.log(e.message);
                res.status(404);
                res.send({ error: e.message });
            }
        });
    }
    postFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const user_id = req.body.user_id;
                const feedback = req.body.feedback;
                let name = req.body.name;
                if (admin_key) {
                    throw new Error(index_2.Errors.ADMIN_POST_FEEDBACK);
                }
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                name = name.toLowerCase();
                let feedback_info = { name, feedback, posted_by: user_id };
                const check_user = yield index_1.userService.checkUserExist("name", name);
                if (!(check_user.error)) {
                    if (check_user.user_id === user_id) {
                        throw new Error(index_2.Errors.USER_POST_OWN_FEEDBACK);
                    }
                    feedback_info.user_id = check_user.user_id;
                }
                else {
                    const check_technology = yield index_1.technologyService.checkTechnologyExist("name", name);
                    if (check_technology.error) {
                        throw new Error(index_2.Errors.NAME_NOT_FOUND);
                    }
                    feedback_info.technology_id = check_technology.technology_id;
                }
                const result = yield index_1.feedbackService.addFeedback(feedback_info);
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(201);
                res.send(result);
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    updateFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const user_id = req.body.user_id;
                const feedback_id = req.body.feedback_id;
                const feedback = req.body.feedback;
                if (admin_key) {
                    throw new Error(index_2.Errors.ADMIN_EDIT_FEEDBACK);
                }
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                const check_feedback = yield index_1.feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if (check_feedback.error) {
                    throw new Error(check_feedback.error);
                }
                if (check_feedback.posted_by !== user.user_id) {
                    throw new Error(index_2.Errors.USER_EDIT_OTHERS_FEEDBACK);
                }
                const result = yield index_1.feedbackService.editFeedback({ feedback_id, feedback });
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(200);
                res.send(result);
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    updateFeedbackStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const feedback_id = req.body.feedback_id;
                let status = req.body.status;
                if (!admin_key) {
                    throw new Error(index_2.Errors.ADMIN_KEY_REQUIRED);
                }
                status = index_2.helperFunctions.lowerCaseStrings(status);
                const admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                if (admin.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(admin.error);
                }
                if (admin.error) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                const feedback = yield index_1.feedbackService.editFeedbackStatus({ feedback_id, status });
                if (feedback.error) {
                    throw new Error(feedback.error);
                }
                res.status(200);
                res.send(feedback);
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    updateFeedbackCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const feedback_id = req.body.feedback_id;
                let name = req.body.name;
                if (admin_key) {
                    throw new Error(index_2.Errors.ADMIN_EDIT_FEEDBACK);
                }
                name = index_2.helperFunctions.lowerCaseStrings(name);
                const user = yield index_1.userService.checkUserExist("name", name);
                if (user.error) {
                    throw new Error(user.error);
                }
                const feedback = yield index_1.feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if (feedback.error)
                    throw new Error(feedback.error);
                for (let i of feedback.count_users) {
                    if (i === name) {
                        throw new Error(index_2.Errors.FEEDBACK_USER_COUNT_EXIST);
                    }
                }
                const result = yield index_1.feedbackService.editFeedbackCount({ feedback_id, count_users: name });
                if (feedback.error) {
                    throw new Error(feedback.error);
                }
                res.status(200);
                res.send(result);
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    deleteFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const feedback_id = req.body.feedback_id;
                if (!admin_key) {
                    throw new Error(index_2.Errors.ADMIN_KEY_REQUIRED);
                }
                if (!feedback_id) {
                    throw new Error(index_2.Errors.FEEDBACK_ID_REQUIRED);
                }
                const admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                if (admin.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(admin.error);
                }
                if (admin.error) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                const feedback = yield index_1.feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if (feedback.error) {
                    throw new Error(feedback.error);
                }
                const result = yield index_1.feedbackService.removeFeedback({ feedback_id });
                if (result.error)
                    throw new Error(result.error);
                res.status(200);
                res.send(result);
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
}
exports.default = FeedbackController;
