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
                const user_id = req.body.user_id;
                const feedback_id = req.query.feedback_id;
                const filter = req.query.filter;
                const sort = req.query.sort;
                let feedbacks = [];
                if (feedback_id) {
                    const feedback = yield index_1.feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                    if (feedback.error) {
                        throw new Error(feedback.error);
                    }
                    feedbacks[0] = feedback;
                }
                else if (filter || sort) {
                    feedbacks = yield index_1.feedbackService.getFeedbacksFilteredAndSorted(filter, sort);
                }
                else {
                    feedbacks = yield index_1.feedbackService.getAllFeedbacks();
                }
                if (feedbacks.error) {
                    throw new Error(feedbacks.error);
                }
                let user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles !== "admin") {
                    feedbacks = index_1.feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
                }
                feedbacks = index_2.helperFunctions.removeSensitiveData(feedbacks);
                res.status(200);
                res.send({ feedbacks });
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
                const user_id = req.body.user_id;
                const email = req.query.email;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                let feedbacks;
                if (user.roles !== "admin") {
                    feedbacks = yield index_1.feedbackService.getFeedbacks({ "posted_by": email, "status": 'approved' });
                }
                else {
                    feedbacks = yield index_1.feedbackService.getFeedbacks({ "posted_by": email });
                }
                if (feedbacks.error) {
                    throw new Error(feedbacks.error);
                }
                feedbacks = index_2.helperFunctions.removeSensitiveData(feedbacks);
                res.status(200);
                res.send({ feedbacks });
            }
            catch (e) {
                console.log(e.message);
                res.status(404);
                res.send({ error: e.message });
            }
        });
    }
    postUserFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                const feedback = req.body.feedback;
                const email = req.body.email;
                let name = req.body.name;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_POST_FEEDBACK);
                }
                let feedback_info = { name, feedback, posted_by: user.email, entity: 'user' };
                const check_user = yield index_1.userService.checkUserExist("email", email);
                if (check_user.error) {
                    throw new Error(check_user.error);
                }
                if (check_user.user_id === user_id) {
                    throw new Error(index_2.Errors.USER_POST_OWN_FEEDBACK);
                }
                feedback_info.entity_id = check_user.user_id;
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
    postTechnologyFeedback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                const feedback = req.body.feedback;
                let name = req.body.name;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_POST_FEEDBACK);
                }
                let feedback_info = { name, feedback, posted_by: user.email, entity: 'technology' };
                const technology = yield index_1.technologyService.checkTechnologyExist("name", name);
                if (technology.error) {
                    throw new Error(technology.error);
                }
                feedback_info.entity_id = technology.technology_id;
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
                const user_id = req.body.user_id;
                const feedback_id = req.body.feedback_id;
                const feedback = req.body.feedback;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_EDIT_FEEDBACK);
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
                const admin_id = req.body.user_id;
                const feedback_id = req.body.feedback_id;
                let status = req.body.status;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                status = status.toLowerCase();
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
                const user_id = req.body.user_id;
                const feedback_id = req.body.feedback_id;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_EDIT_FEEDBACK);
                }
                const feedback = yield index_1.feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if (feedback.error) {
                    throw new Error(feedback.error);
                }
                for (let i of feedback.count_users) {
                    if (i === user.name) {
                        throw new Error(index_2.Errors.FEEDBACK_USER_COUNT_EXIST);
                    }
                }
                const result = yield index_1.feedbackService.editFeedbackCount({ feedback_id, count_users: user.name });
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
                const admin_id = req.body.user_id;
                const feedback_id = req.body.feedback_id;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                const feedback = yield index_1.feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if (feedback.error) {
                    throw new Error(feedback.error);
                }
                const result = yield index_1.feedbackService.removeFeedback({ feedback_id });
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
}
exports.default = FeedbackController;
