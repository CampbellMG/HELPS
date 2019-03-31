const workshop = {
    type: "object",
    required: ["id", "studentId", "name"],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        studentId: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        name: {
            type: "string",
            faker: "name.jobDescriptor"
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
    required: ["students", "workshops", "users"],
    properties: {
        students: {
            type: "array",
            minItems: 50,
            maxItems: 50,
            items: student
        },
        workshops: {
            type: "array",
            minItems: 50,
            maxItems: 50,
            items: workshop
        },
        users: {
            type: "array",
            minItems: 1,
            maxItems: 5,
            items: user
        }
    }
};

module.exports = schema;