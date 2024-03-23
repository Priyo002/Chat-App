export const samplechats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Johnny",
        _id: "1",
        groupChat: false,
        members: ["1","2"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Doe",
        _id: "2",
        groupChat: true,
        members: ["1","2"],
    },
];

export const sampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Johnny",
        _id: "1",  
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Doe",
        _id: "2",
    },
];

export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Johnny",
        },
        _id: "1",  
    },
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "John Doe",
        },
        _id: "2",
    },
];

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: "asdsad",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "Hello I am Priyo",
        _id: "sfadfasff",
        sender: {
            _id : "user._id",
            name: "Don",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.6302",
    },
    {
        attachments: [
            {
                public_id: "asdsad",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "Hello I am Priyo",
        _id: "sfadfasdsfsff",
        sender: {
            _id : "user._id2",
            name: "Don",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.6302",
    },
];