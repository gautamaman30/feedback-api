import { ConnectDb } from "./configDb"
const getDb = new ConnectDb().getDb;


export class Database{

    async findAll(collectionName: string){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
        try{
            const result = await db.collection(`${collectionName}`).find({}).toArray();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertUser(user_info){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('users').insertOne(user_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateUser(filter, update){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const updateDoc = {
                $set: update
            }
            const result = await db.collection('users').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteUser(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('users').deleteOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findUser(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('users').findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findUsers(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('users').find(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findTechnology(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('technologies').findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateTechnology(filter, update){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const updateDoc = {
                $set: update
            }
            const result = await db.collection('technologies').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteTechnology(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('technologies').deleteOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertTechnology(technology_info){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('technologies').insertOne(technology_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedback(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('feedbacks').findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacks(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection("feedbacks").find(query).toArray();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacksSorted(query, sortField){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const sortQuery = {};
            sortQuery[sortField] = -1;

            const result = await db.collection("feedbacks").find(query).sort(sortQuery).toArray();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateFeedback(filter, update){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const updateDoc = {
                $set: update
            }
            const result = await db.collection('feedbacks').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateFeedbackCount(filter, update){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const updateDoc = {
                $push: update,
                $inc: { "count": 1}
            }
            const result = await db.collection('feedbacks').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertFeedback(feedback_info){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('feedbacks').insertOne(feedback_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteFeedback(query){
        let db: any;
        try {
            db = await getDb();
        } catch(e){
            console.log(e);
            return {error: e.message};
        }

        try{
            const result = await db.collection('feedbacks').deleteOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }
}
