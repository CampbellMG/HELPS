const workshop = {
    type: "object",
    required: [
        "id",
        "title",
        "time",
        "duration",
        "room",
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
        room: {
            type: "string"
        },
        targetGroup: {
            type: "string"
        },
        description: {
            type: "string"
        },
        availablePlaces: {
            type: "string"
        },
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
            faker: "name.firstName"
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