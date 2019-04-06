const workshop = {
    type: "object",
    required: ["id", "title", "time", "duration"],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        studentId: {
            type: "integer"
        },
        title: {
            type: "string",
            faker: "name.jobDescriptor"
        },
        time: {
            type: "string",
            faker: "date.recent"
        },
        duration: {
            type: "integer",
            minimum: 0,
            maximum: 120
        }
    }
};

const student = {
    type: "object",
    required: ["id", "name"],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        name: {
            type: "string",
            faker: "name.findName"
        }
    }
};

const user = {
    type: "object",
    required: ["id", "username", "password"],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        username: {
            type: "string",
            faker: "internet.userName"
        },
        password: {
            type: "string",
            faker: "internet.password"
        }
    }
};

const schema = {
    type: "object",
    required: ["students", "workshops", "users", "studentWorkshops"],
    properties: {
        students: {
            type: "array",
            minItems: 50,
            maxItems: 50,
            items: student
        },
        workshops: {
            type: "array",
            minItems: 5,
            maxItems: 20,
            items: workshop
        },
        users: {
            type: "array",
            minItems: 1,
            maxItems: 5,
            items: user
        },
        studentWorkshops: {
            type: "array",
            minItems: 0,
            maxItems: 0,
            items: workshop
        }
    }
};

module.exports = schema;