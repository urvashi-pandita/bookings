let logModel = () => {
    dataBase.createCollection("log", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                properties: {
                    booking_id:{
                        bsonType: "string",
                        description: "This must be string"
                    },
                    desc: {
                        bsonType: "string",
                        description: "This must be a string"
                    },
                    date: {
                        bsonType: "string",
                        description: "This must be a datey"
                    }
                }
            }
        }
    });
}

module.exports = logModel;