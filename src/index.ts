import express, {Express} from "express"
import { controller } from "./controllers/index";


const app: Express = express();
app.use(express.json());
app.use(controller.logUpdatedData.bind(controller));


app.get('/api/user/:user_id', controller.getUserById.bind(controller));
app.get('/api/feedback/', controller.getFeedbacks.bind(controller));
app.get('/api/user/feedback/:user_id', controller.getFeedbacksByUser.bind(controller));
app.get('/api/technology/:name', controller.getTechnology.bind(controller));

app.post('/api/user/:user_id', controller.postNewUser.bind(controller));
app.post('/api/technology/:user_id', controller.postTechnology.bind(controller));
app.post('/api/feedback/:user_id', controller.postFeedback.bind(controller));

app.delete('/api/user/:user_id', controller.deleteUser.bind(controller));
app.delete('/api/technology/:user_id', controller.deleteTechnology.bind(controller));
app.delete('/api/feedback/:user_id', controller.deleteFeedback.bind(controller));

app.put('/api/technology/:user_id', controller.updateTechnology.bind(controller));
app.put('/api/feedback/:user_id', controller.updateFeedback.bind(controller));
app.put('/api/count/feedback/:feedback_id', controller.updateFeedbackCount.bind(controller));
app.put('/api/status/feedback/:user_id', controller.updateFeedbackStatus.bind(controller));



const PORT = process.env.PORT || process.argv[2] || 3000;
app.listen(PORT, () => console.log(`server is running at ${PORT}`));