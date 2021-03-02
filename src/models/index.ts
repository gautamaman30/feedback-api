import { ConnectDb } from "./configDb"
const getDb = new ConnectDb().getDb;


export class Database{

    async findAll(collectionName: string){
        try{
            const db = await getDb();
            const result = await db.collection(`${collectionName}`).find({}).toArray();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacksSorted(query, sortField){
        try{

            const sortQuery = {};
            sortQuery[sortField] = -1;

            const db = await getDb();
            const result = await db.collection("feedbacks").find(query).sort(sortQuery).toArray();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacksByKeySorted(query, sortField){
        try{
            let filterQuery: any = {};
            filterQuery[query] = { $exists: true };

            const sortQuery = {};
            sortQuery[sortField] = -1;

            const db = await getDb();
            let result = await db.collection("feedbacks").find(filterQuery);
            result = await result.sort(sortField).toArray();

            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacks(query){
        try{
            const db = await getDb();
            const result = await db.collection("feedbacks").find(query).toArray();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedbacksByKey(query){
        try{
            let filterQuery: any = {};
            filterQuery[query] = { $exists: true };

            const db = await getDb();
            const result = await db.collection("feedbacks").find(filterQuery).toArray();
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateFeedback(filter, update){
        try{
            const updateDoc = {
                $set: update
            }
            const db = await getDb();
            const result = await db.collection('feedbacks').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateFeedbackCount(filter, update){
        try{
            const updateDoc = {
                $push: update,
                $inc: { "count": 1}
            }
            const db = await getDb();
            const result = await db.collection('feedbacks').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateUser(filter, update){
        try{
            const updateDoc = {
                $set: update
            }
            const db = await getDb();
            const result = await db.collection('users').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async updateTechnology(filter, update){
        try{
            const updateDoc = {
                $set: update
            }
            const db = await getDb();
            const result = await db.collection('technologies').updateOne(filter, updateDoc);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteFeedback(query){
        try{
            const db = await getDb();
            const result = await db.collection('feedbacks').deleteOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteTechnology(query){
        try{
            const db = await getDb();
            const result = await db.collection('technologies').deleteOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async deleteUser(query){
        try{
            const db = await getDb();
            const result = await db.collection('users').deleteOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findUser(query){
        try{
            const db = await getDb();
            const result = await db.collection('users').findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findUsers(query){
        try{
            const db = await getDb();
            const result = await db.collection('users').find(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findTechnology(query){
        try{
            const db = await getDb();
            const result = await db.collection('technologies').findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async findFeedback(query){
        try{
            const db = await getDb();
            const result = await db.collection('feedbacks').findOne(query);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertUser(user_info){
        try{
            const db = await getDb();
            const result = await db.collection('users').insertOne(user_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertTechnology(technology_info){
        try{
            const db = await getDb();
            const result = await db.collection('technologies').insertOne(technology_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }

    async insertFeedback(feedback_info){
        try{
            const db = await getDb();
            const result = await db.collection('feedbacks').insertOne(feedback_info);
            return result;
        } catch(e){
            console.log(e);
            return {error: e.message};
        }
    }
}
