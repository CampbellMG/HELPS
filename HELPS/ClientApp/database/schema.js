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
    required: [
        "id",
        "name",
        "prefFirstName",
        "faculty",
        "course",
        "email",
        "homePhone",
        "mobile",
        "bestContactNumber",
        "dob",
        "gender",
        "degree",
        "year",
        "status",
        "firstLanguage",
        "countryOfOrigin",
        "educationalBackground",
        "other",
    ],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        name: {
            type: "string",
            faker: "name.findName"
        },
        prefFirstName: {
            type: "string",
            faker: "name.findName"
        },
        faculty: {
            type: "string",
            faker: "name.findName"
        },
        course: {
            type: "string",
            faker: "name.findName"
        },
        email: {
            type: "string",
            faker: "name.findName"
        },
        homePhone: {
            type: "string",
            faker: "name.findName"
        },
        mobile: {
            type: "string",
            faker: "name.findName"
        },
        bestContactNumber: {
            type: "string",
            faker: "name.findName"
        },
        dob: {
            type: "string",
            faker: "name.findName"
        },
        gender: {
            type: "string",
            faker: "name.findName"
        },
        degree: {
            type: "string",
            faker: "name.findName"
        },
        year: {
            type: "string",
            faker: "name.findName"
        },
        status: {
            type: "string",
            faker: "name.findName"
        },
        firstLanguage: {
            type: "string",
            faker: "name.findName"
        },
        countryOfOrigin: {
            type: "string",
            faker: "name.findName"
        },
        educationalBackground: {
            type: "string",
            faker: "name.findName"
        },
        other: {
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