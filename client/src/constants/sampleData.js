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
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Chaman",
        _id: "3",  
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Chaman2",
        _id: "4",
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
export const dashboardData={
    users:[
        {
            name:"John Doe",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"1",
            userName:"john_doe",
            friends:20,
            groups:5,
        },
        {
            name:"John Boi",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"2",
            userName:"john_boi",
            friends:20,
            groups:25,
        },
    ],

    chats:[
        {
            name:"LabdasBass Group",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"1",
            groupChat:false,
            members:[
                {_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
                {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"}
            ],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"John Doe",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            },
        },
        {
            name:"L*da Luston Group",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"2",
            groupChat:true,
            members:[
                {_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
                {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"}
            ],
            totalMembers:2,
            totalMessages:20,
            creator:{
                name:"John Boi",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            },
        }
    ],

    messages:[
        {
            attachments:[],
            content:"Hello I am Priyo",
            _id:"sfadfasff",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Chaman",
            },
            chat:"chatId",
            groupChat:false,
            createdAt:"2024-02-12T10:41:30.630Z",
        },
        {
            attachments:[
                {
                    public_id:"asdsad 2",
                    url:"https://www.w3schools.com/howto/img_avatar.png",
                },
            ],
            content:"Hello I am Sreejita",
            _id:"sfadfasfff",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Chaman 2",
            },
            chat:"chatId",
            groupChat:true,
            createdAt:"2024-02-12T10:41:30.630Z",
        },
    ]
}