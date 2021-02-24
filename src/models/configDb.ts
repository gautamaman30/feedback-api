import {MongoClient} from "mongodb"


export class ConnectDb{
    private url: any;
    private db_name: any; ;
    private client: any;

    constructor(){
        this.url = process.env.DB_URL;
        this.db_name = process.env.DB_NAME;
        this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });        
    }

    getDb = async () => {
        if(!this.client.isConnected()){
            await this.client.connect();
        }
        return this.client.db(this.db_name);
    }    
} 