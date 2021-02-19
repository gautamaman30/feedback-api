"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
class Service {
    getAllUsers() {
        return index_1.users;
    }
    getAllTechnologies() {
        return index_1.technologies;
    }
    getAllFeedbacks() {
        return index_1.feedbacks;
    }
    editFeedbackStatus(feedback_info) {
        for (let i = 0; i < index_1.feedbacks.length; i++) {
            if (index_1.feedbacks[i].feedback_id === feedback_info.feedback_id) {
                index_1.feedbacks[i].status = feedback_info.status;
                return index_1.feedbacks[i];
            }
        }
        return { error: "Feedback not found" };
    }
    removeFeedback(feedback_info) {
        for (let i = 0; i < index_1.feedbacks.length; i++) {
            if (index_1.feedbacks[i].feedback_id === feedback_info.feedback_id) {
                index_1.feedbacks.splice(i, 1);
                return { message: "Feedback deleted successfully" };
            }
        }
        return { error: "Feedback not found" };
    }
    editFeedback(feedback_info) {
        for (let i = 0; i < index_1.feedbacks.length; i++) {
            if (index_1.feedbacks[i].feedback_id === feedback_info.feedback_id) {
                index_1.feedbacks[i].feedback = feedback_info.feedback;
                return index_1.feedbacks[i];
            }
        }
        return { error: "Feedback not found" };
    }
    removeTechnology(technology_info) {
        for (let i = 0; i < index_1.technologies.length; i++) {
            if (index_1.technologies[i].name === technology_info.name) {
                index_1.technologies.splice(i, 1);
                return { message: "Technology deleted successfully" };
            }
        }
        return { error: "Technology not found" };
    }
    removeUser(user_info) {
        for (let i = 0; i < index_1.users.length; i++) {
            if (index_1.users[i].user_id === user_info.user_id) {
                index_1.users.splice(i, 1);
                return { message: "User deleted successfully" };
            }
        }
        return { error: "User not found" };
    }
    editTechnology(technology_info) {
        for (let i = 0; i < index_1.technologies.length; i++) {
            if (index_1.technologies[i].name === technology_info.name) {
                index_1.technologies[i].details = technology_info.details;
                return index_1.technologies[i];
            }
        }
        return { error: "Technology not found" };
    }
    checkUserExist(key, value) {
        for (let i = 0; i < index_1.users.length; i++) {
            if (index_1.users[i][key] === value) {
                return index_1.users[i];
            }
        }
        return { error: "User not found" };
    }
    checkTechnologyExist(key, value) {
        for (let i = 0; i < index_1.technologies.length; i++) {
            if (index_1.technologies[i][key] === value) {
                return index_1.technologies[i];
            }
        }
        return { error: "Technology not found" };
        ;
    }
    checkFeedbackExist(key, value) {
        for (let i = 0; i < index_1.feedbacks.length; i++) {
            if (index_1.feedbacks[i][key] === value) {
                return index_1.feedbacks[i];
            }
        }
        return { error: "Feedback not found" };
        ;
    }
    addUser(user_info) {
        let user;
        user = {
            user_id: index_2.generateId(),
            name: user_info.name,
        };
        if (user_info.email)
            user.email = user_info.email;
        if (user_info.title)
            user.title = user_info.title;
        if (user_info.date_of_birth)
            user.date_of_birth = user_info.date_of_birth;
        index_1.users.push(user);
        return user;
    }
    addTechnology(technology_info) {
        let technology;
        technology = {
            technology_id: index_2.generateId(),
            name: technology_info.name,
        };
        if (technology_info.details)
            technology.details = technology_info.details;
        index_1.technologies.push(technology);
        return technology;
    }
    addFeedback(feedback_info) {
        let new_feedback;
        if (feedback_info.user_id) {
            new_feedback = {
                feedback_id: index_2.generateId(),
                posted_by: feedback_info.posted_by,
                name: feedback_info.name,
                user_id: feedback_info.user_id,
                feedback: feedback_info.feedback,
                status: 'waiting',
                created_on: new Date(),
                count: 0
            };
        }
        else {
            new_feedback = {
                feedback_id: index_2.generateId(),
                posted_by: feedback_info.posted_by,
                name: feedback_info.name,
                technology_id: feedback_info.technology_id,
                feedback: feedback_info.feedback,
                status: 'waiting',
                created_on: new Date(),
                count: 0
            };
        }
        index_1.feedbacks.push(new_feedback);
        return new_feedback;
    }
    filterFeedback(feedback_array, key, values) {
        let set = index_2.convertArrayToSet(values);
        return feedback_array.filter((item) => item[key] && set.has(item[key]) ? true : false);
    }
    sortFeedback(feedback_array, key) {
        return feedback_array.sort((a, b) => {
            if (key === "created_on") {
                return b.created_on.getMilliseconds() - a.created_on.getMilliseconds();
            }
            if (key === "count") {
                return b.count - a.count;
            }
            return 0;
        });
    }
}
exports.Service = Service;
