export declare class ConnectDb {
    private url;
    private db_name;
    private client;
    constructor();
    getDb: () => Promise<any>;
}
