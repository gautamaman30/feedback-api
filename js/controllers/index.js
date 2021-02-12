"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const index_1 = require("../data-access/index");
const index_2 = require("../utils/index");
class Controller {
    getUserById(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            let index = this.checkUserExist("user_id", user_id);
            if (index !== null) {
                res.status(200);
                res.send(index_1.users[index]);
            }
            else
                throw new Error("Not found");
        }
        catch (e) {
            console.log(e.message);
            res.status(404);
            res.send({ error: e.message });
        }
    }
    getTechnology(req, res) {
        try {
            const name = req.params.name;
            if (!name)
                throw new Error("Bad request");
            let index = this.checkTechnologyExist("name", name);
            if (index !== null) {
                res.status(200);
                res.send(index_1.technologies[index]);
            }
            else
                throw new Error("Not found");
        }
        catch (e) {
            console.log(e.message);
            res.status(404);
            res.send({ error: e.message });
        }
    }
    getFeedbacks(req, res) {
        try {
            let result = index_1.feedbacks;
            result = this.filterFeedback(result, "status", ['approved']);
            if (req.query.filter) {
                if (req.query.filter === "user") {
                    result = this.filterFeedback(result, "feedback_type", ['user']);
                }
                else if (req.query.filter === "technology") {
                    result = this.filterFeedback(result, "feedback_type", ['technology']);
                }
            }
            if (req.query.sort) {
                if (req.query.sort === "date") {
                    result = this.sortFeedback(result, "created_on");
                }
                else if (req.query.sort === "count") {
                    result = this.sortFeedback(result, "count");
                }
            }
            res.status(200);
            res.send({ "feedbacks": result });
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    getFeedbacksByUser(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("User id is required");
            let index = this.checkUserExist("user_id", user_id);
            if (index !== null) {
                let result = this.filterFeedback(index_1.feedbacks, "posted_by", [user_id]);
                result = this.filterFeedback(result, "status", ['approved']);
                res.status(200);
                res.send({ feedbacks: result });
            }
            else
                throw new Error("User not found");
        }
        catch (e) {
            console.log(e.message);
            res.status(404);
            res.send({ error: e.message });
        }
    }
    postNewUser(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Admin id is required");
            if (!req.body.name)
                throw new Error("User name is required");
            const admin_index = this.checkUserExist("user_id", user_id);
            if (admin_index === null)
                throw new Error("Admin not found");
            if (index_1.users[admin_index].role === 'admin') {
                const user_inex = this.checkUserExist("name", req.body.name);
                if (user_inex !== null)
                    throw new Error("User with this name already exist");
                const result = this.addNewUser(req.body);
                res.status(201);
                res.send(result);
            }
            else
                throw new Error("Only admin can add new users");
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    postFeedback(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.name)
                throw new Error("User or technology name is required as feedback name");
            if (!req.body.feedback_type)
                throw new Error("type of feedback is required");
            if (!(req.body.feedback_type === 'user' || req.body.feedback_type === 'technology'))
                throw new Error("feedback type can be 'user' or 'technology' only");
            if (!req.body.content)
                throw new Error("feedback content cannot be empty");
            const index = this.checkUserExist("user_id", user_id);
            if (index === null)
                throw new Error("User not found");
            if (index_1.users[index].role === 'employee') {
                const result = this.addNewFeedback(user_id, req.body);
                if (result === null)
                    throw new Error(`${req.body.feedback_type} not found`);
                res.status(201);
                res.send({ feedback: result });
            }
            else
                throw new Error("Only admin can add new users");
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    postTechnology(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.name)
                throw new Error("Bad request");
            const index = this.checkUserExist("user_id", user_id);
            if (index === null)
                throw new Error("Admin not found");
            if (index_1.users[index].role === 'admin') {
                if (this.checkTechnologyExist("name", req.body.name) !== null)
                    throw new Error("Technology already exists");
                const result = this.addNewTechnology(req.body);
                res.status(201);
                res.send(result);
            }
            else
                throw new Error("Only admin can add new technologies");
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    updateFeedback(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.feedback_id)
                throw new Error("Feedback id is required");
            if (!req.body.content)
                throw new Error("Feedback content is required");
            const user_index = this.checkUserExist("user_id", user_id);
            if (user_index === null)
                throw new Error('User not found');
            if (index_1.users[user_index].role === 'admin')
                throw new Error("Only user can edit feedbacks");
            const feedback_index = this.checkFeedbackExist("feedback_id", req.body.feedback_id);
            if (feedback_index === null)
                throw new Error('Feedback not found');
            if (index_1.feedbacks[feedback_index].posted_by !== index_1.users[user_index].user_id)
                throw new Error("Cannot update other's feedback");
            index_1.feedbacks[feedback_index].content = req.body.content;
            res.status(200);
            res.send({ "message": "feedback updated successfully" });
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    updateTechnology(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.name)
                throw new Error("Bad request");
            if (!req.body.details)
                throw new Error("Bad request");
            const index = this.checkUserExist("user_id", user_id);
            if (index === null)
                throw new Error("Admin not found");
            if (index_1.users[index].role === 'admin') {
                const technology_index = this.checkTechnologyExist("name", req.body.name);
                if (technology_index === null)
                    throw new Error("Technology not found");
                index_1.technologies[technology_index].details = req.body.details;
                res.status(200);
                res.send(index_1.technologies[technology_index]);
            }
            else
                throw new Error("Only admin can edit technologies");
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    updateFeedbackStatus(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.feedback_id)
                throw new Error("Feedback id is required");
            if (!req.body.status)
                throw new Error("Status is required");
            if (!(req.body.status === 'approved' || req.body.status === 'rejected'))
                throw new Error("Status can be 'approved' or 'rejected' only");
            const admin_index = this.checkUserExist("user_id", user_id);
            if (admin_index === null)
                throw new Error('Admin not found');
            if (index_1.users[admin_index].role === 'employee')
                throw new Error("Only admin can change feedback's status");
            const feedback_index = this.checkFeedbackExist("feedback_id", req.body.feedback_id);
            if (feedback_index === null)
                throw new Error('Feedback not found');
            index_1.feedbacks[feedback_index].status = req.body.status;
            res.status(200);
            res.send({ "message": `feedback ${req.body.status} successfully` });
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    updateFeedbackCount(req, res) {
        try {
            const feedback_id = req.params.feedback_id;
            if (!req.body.name)
                throw new Error("User name is required to add count");
            const feedback_index = this.checkFeedbackExist("feedback_id", feedback_id);
            if (feedback_index === null)
                throw new Error('Feedback not found');
            const user_index = this.checkUserExist("name", req.body.name);
            if (user_index === null)
                throw new Error('User not found');
            for (let i of index_1.feedbacks[feedback_index].count) {
                if (i === req.body.name) {
                    throw new Error("Count already exist");
                }
            }
            index_1.feedbacks[feedback_index].count.push(req.body.name);
            res.status(200);
            res.send({ feedback: index_1.feedbacks[feedback_index] });
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    deleteUser(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.user_id)
                throw new Error("Bad request");
            const admin_index = this.checkUserExist("user_id", user_id);
            if (admin_index === null)
                throw new Error('Admin not found');
            if (index_1.users[admin_index].role === 'employee')
                throw new Error("Only admin can delete users");
            const user_index = this.checkUserExist("user_id", req.body.user_id);
            if (!user_index)
                throw new Error('User not found');
            if (index_1.users[user_index].role === 'employee') {
                index_1.users.splice(user_index, 1);
                res.status(200);
                res.send({ "message": "User deleted successfully" });
            }
            else
                throw new Error("Admin cannot delete another admin");
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    deleteTechnology(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.name)
                throw new Error("Bad request");
            const admin_index = this.checkUserExist("user_id", user_id);
            if (admin_index === null)
                throw new Error('Admin not found');
            if (index_1.users[admin_index].role === 'employee')
                throw new Error("Only admin can delete technoloies");
            const technology_index = this.checkTechnologyExist("name", req.body.name);
            if (technology_index === null)
                throw new Error("Technology not found");
            index_1.technologies.splice(technology_index, 1);
            res.status(200);
            res.send({ "message": "technology deleted successfully" });
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    deleteFeedback(req, res) {
        try {
            const user_id = req.params.user_id;
            if (!user_id)
                throw new Error("Bad request");
            if (!req.body.feedback_id)
                throw new Error("Bad request");
            const admin_index = this.checkUserExist("user_id", user_id);
            if (admin_index === null)
                throw new Error('Admin not found');
            if (index_1.users[admin_index].role === 'employee')
                throw new Error("Only admin can delete feedbacks");
            const feedback_index = this.checkFeedbackExist("feedback_id", req.body.feedback_id);
            if (feedback_index === null)
                throw new Error('Feedback not found');
            index_1.feedbacks.splice(feedback_index, 1);
            res.status(200);
            res.send({ "message": "feedback deleted successfully" });
        }
        catch (e) {
            console.log(e.message);
            res.status(400);
            res.send({ error: e.message });
        }
    }
    logUpdatedData(req, res, next) {
        console.log("users");
        console.log(index_1.users);
        console.log("feedbacks");
        console.log(index_1.feedbacks);
        console.log("technologies");
        console.log(index_1.technologies);
        next();
    }
    checkUserExist(key, value) {
        let check = -1;
        for (let i = 0; i < index_1.users.length; i++) {
            let temp = index_1.users[i];
            if (temp[key] === value) {
                return i;
            }
        }
        return null;
    }
    checkTechnologyExist(key, value) {
        let check = -1;
        for (let i = 0; i < index_1.technologies.length; i++) {
            let temp = index_1.technologies[i];
            if (temp[key] === value) {
                return i;
            }
        }
        return null;
    }
    checkFeedbackExist(key, value) {
        let check = -1;
        for (let i = 0; i < index_1.feedbacks.length; i++) {
            let temp = index_1.feedbacks[i];
            if (temp[key] === value) {
                return i;
            }
        }
        return null;
    }
    addNewUser(user_info) {
        let user;
        user = {
            user_id: index_2.generateId(),
            name: user_info.name,
            role: 'employee'
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
    addNewTechnology(technology_info) {
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
    addNewFeedback(user_id, feedback_info) {
        let feedback;
        if (feedback_info.feedback_type === 'user') {
            const user_index = this.checkUserExist("name", feedback_info.name);
            if (user_index === null)
                return null;
            feedback = {
                feedback_id: index_2.generateId(),
                posted_by: user_id,
                name: feedback_info.name,
                feedback_type: 'user',
                user_id: index_1.users[user_index].user_id,
                content: feedback_info.content,
                status: 'waiting',
                created_on: new Date(),
                count: []
            };
        }
        else {
            const technology_index = this.checkTechnologyExist("name", feedback_info.name);
            if (technology_index === null)
                return null;
            feedback = {
                feedback_id: index_2.generateId(),
                posted_by: user_id,
                name: feedback_info.name,
                feedback_type: 'technology',
                technology_id: index_1.technologies[technology_index].technology_id,
                content: feedback_info.content,
                status: 'waiting',
                created_on: new Date(),
                count: []
            };
        }
        index_1.feedbacks.push(feedback);
        return feedback;
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
                return b.count.length - a.count.length;
            }
            return 0;
        });
    }
}
exports.controller = new Controller();
