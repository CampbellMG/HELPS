const workshop = {
    type: "object",
    required: [
        "id",
        "title",
        "time",
        "duration",
        "roomId",
        "maximum",
        "targetGroup",
        "description",
        "availablePlaces"
    ],
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
            maximum: 240
        },
        roomId: {
            type: "integer"
        },
        maximum: {
            type: 'integer'
        },
        targetGroup: {
            type: "string"
        },
        description: {
            type: "string"
        },
        availablePlaces: {
            type: "number"
        },
    }
};

const student = {
    type: "object",
    required: [
        "id",
        "name",
        "prefFirstName",
        "registeredDate",
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
        "CAFCompleted",
        "specialNeeds",
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
            faker: "name.firstName"
        },
        registeredDate: {
            type: "string",
            faker: "date.past"
        },
        faculty: {
            type: "string",
            faker: "name.jobTitle"
        },
        course: {
            type: "string",
            faker: "company.companyName"
        },
        email: {
            type: "string",
            faker: "internet.email"
        },
        homePhone: {
            type: "string",
            faker: "name.findName"
        },
        mobile: {
            type: "string",
            faker: "phone.phoneNumber"
        },
        bestContactNumber: {
            type: "string",
            faker: "phone.phoneNumber"
        },
        dob: {
            type: "string",
            faker: "date.past"
        },
        gender: {
            type: "string"
        },
        degree: {
            type: "string",
            faker: "company.companyName"
        },
        year: {
            type: "string"
        },
        status: {
            type: "string"
        },
        firstLanguage: {
            type: "string"
        },
        countryOfOrigin: {
            type: "string"
        },
        educationalBackground: {
            type: "string"
        },
        CAFCompleted: {
            type: "boolean"
        },
        specialNeeds: {
            type: "boolean"
        },
        other: {
            type: "string"
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

const session  = {
    type: "object",
    required: [
        "id",
        "startTime",
        "duration",
        "roomId",
        "advisorId",
        "studentId",
        "type"
    ],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        startTime: {
            type: "string",
            faker: "date.recent"
        },
        duration: {
            type: "integer",
            minimum: 0,
            maximum: 240
        },
        roomId: {
            type: "integer"
        },
        advisorId: {
            type: "integer"
        },
        studentId: {
            type: "integer"
        },
        type: {
            type: "string"
        }
    }
};

const advisor  = {
    type: "object",
    required: [
        "id",
        "email",
        "firstName",
        "lastName",
        "isActive"
    ],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        email: {
            type: "string",
            faker: "internet.email"
        },
        firstName: {
            type: "string",
            faker: "name.firstName"
        },
        lastName: {
            type: "string",
            faker: "name.lastName"
        },
        isActive: {
            type: "boolean"
        }
    }
};

const room  = {
    type: "object",
    required: [
        "id",
        "title"
    ],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        title: {
            type: "string"
        }
    }
};

const message  = {
    type: "object",
    required: [
        "id",
        "title",
        "content"
    ],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        title: {
            type: "string"
        },
        content: {
            type: "string"
        }
    }
};

const email  = {
    type: "object",
    required: [
        "id",
        "title",
        "content",
        "variables"
    ],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        title: {
            type: "string"
        },
        content: {
            type: "string"
        },
        variables: {
            type: "array",
            minItems: 5,
            maxItems: 20,
            items: {
                type: "object",
                required: [
                    "variable",
                    "example"
                ],
                properties: {
                    variable: {
                        type: "string"
                    },
                    example: {
                        type: "string"
                    }
                }
            }
        }
    }
};

const report  = {
    type: "object",
    required: [
        "id",
        "title",
        "skillSet",
        "topic"
    ],
    properties: {
        id: {
            type: "integer",
            initialOffset: 1,
            autoIncrement: true
        },
        title: {
            type: "string"
        },
        skillSet: {
            type: "string"
        },
        topic: {
            type: "string"
        }
    }
};

const schema = {
    type: "object",
    required: [
        "students",
        "workshops",
        "users",
        "studentWorkshops",
        "sessions",
        "advisors",
        "rooms",
        "messages",
        "emails",
        "reports"
    ],
    properties: {
        students: {
            type: "array",
            minItems: 5,
            maxItems: 20,
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
        },
        sessions: {
            type: "array",
            minItems: 5,
            maxItems: 20,
            items: session
        },
        advisors: {
            type: "array",
            minItems: 1,
            maxItems: 10,
            items: advisor
        },
        rooms: {
            type: "array",
            minItems: 5,
            maxItems: 20,
            items: room
        },
        messages: {
            type: "array",
            minItems: 1,
            maxItems: 10,
            items: message
        },
        emails: {
            type: "array",
            minItems: 1,
            maxItems: 10,
            items: email
        },
        reports: {
            type: "array",
            minItems: 1,
            maxItems: 5,
            items: report
        }
    }
};

module.exports = schema;