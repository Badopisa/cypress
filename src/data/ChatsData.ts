interface ChatsType {
    id: number,
    sender: string,
    message: string,
    receiver: string,
    senderStatus: string,
    receiverStatus: string,
    time: string
}
interface ContactsType {
    id: number,
    name: string,
    role: string,
    email: string
}
interface GroupTypes {
    id: number,
    groupName: string,
    groupMembers: string[],
    messages: any,
}
interface HistoryTypes {
    id: number,
    name: string,
    day: string,
    time: string,
    event: string,
    eventType: string,
}
export const historyData: HistoryTypes[] = [
    {
        id: 1,
        name: 'Dan Vin',
        day: 'Yesterday',
        time: '12pm',
        event: 'call',
        eventType: 'incoming'
    },
    {
        id: 2,
        name: 'Lily Aldrin',
        day: 'Yesterday',
        time: '2:30pm',
        event: 'video',
        eventType: 'outgoing'
    },
    {
        id: 3,
        name: 'Dan Vin',
        day: 'Yesterday',
        time: '12:10pm',
        event: 'call',
        eventType: 'incoming'
    },
    {
        id: 4,
        name: 'Lily Aldrin',
        day: 'Today',
        time: '9am',
        event: 'call',
        eventType: 'incoming'
    },
    {
        id: 5,
        name: 'Dan Vin',
        day: '12/4/2021',
        time: '3pm',
        event: 'call',
        eventType: 'incoming'
    }
]
export const groupChats: GroupTypes[] = [
    {
        id: 1,
        groupName: 'Under 21',
        groupMembers: ['Lilly Adrian', 'Victor James', 'Jane Wich'],
        messages: [
            {
                id: 1,
                sender: 'Joh Vick',
                message: ' Thanks for yesterday',
                timeSent: '10:00am'
            },
            {
                id: 2,
                sender: 'Nena Milch',
                message: ' You are welcome',
                timeSent: '10:10am'
            },
            {
                id: 3,
                sender: 'Jane Wich',
                message: ' Good morning guys',
                timeSent: '10:14am'
            },
            {
                id: 4,
                sender: 'Joh Vick',
                message: ' Thanks for yesterday',
                timeSent: '10:150am'
            },
            {
                id: 5,
                sender: 'Nena Milch',
                message: ' You are welcome',
                timeSent: '10:20am'
            },
            {
                id: 6,
                sender: 'Jane Wich',
                message: ' Good morning guys'
            }
        ]


    },
    {
        id: 2,
        groupName: 'Strikers Magic',
        groupMembers: ['Joh Vick', 'Nena Milch', 'Jane Wich'],
        messages: [
            {
                id: 1,
                sender: 'Joh Vick',
                message: ' Thanks for yesterday',
                timeSent: '10:00am'
            },
            {
                id: 2,
                sender: 'Nena Milch',
                message: ' You are welcome',
                timeSent: '10:10am'
            },
            {
                id: 3,
                sender: 'Jane Wich',
                message: ' Good morning guys',
                timeSent: '10:14am'
            },
            {
                id: 4,
                sender: 'Joh Vick',
                message: ' Thanks for yesterday',
                timeSent: '10:150am'
            },
            {
                id: 5,
                sender: 'Nena Milch',
                message: ' You are welcome',
                timeSent: '10:20am'
            },
            {
                id: 6,
                sender: 'Jane Wich',
                message: ' Good morning guys'
            }
        ]

    },
    {
        id: 3,
        groupName: 'Under 21',
        groupMembers: ['Lilly Adrian', 'Victor James', 'Jane Wich'],
        messages: [
            {
                id: 1,
                sender: 'Joh Vick',
                message: ' Thanks for yesterday',
                timeSent: '10:00am'
            },
            {
                id: 2,
                sender: 'Nena Milch',
                message: ' You are welcome',
                timeSent: '10:10am'
            },
            {
                id: 3,
                sender: 'Jane Wich',
                message: ' Good morning guys',
                timeSent: '10:14am'
            },
            {
                id: 4,
                sender: 'Joh Vick',
                message: ' Thanks for yesterday',
                timeSent: '10:150am'
            },
            {
                id: 5,
                sender: 'Nena Milch',
                message: ' You are welcome',
                timeSent: '10:20am'
            },
            {
                id: 6,
                sender: 'Jane Wich',
                message: ' Good morning guys'
            }
        ]


    }

]

export const chatsData: ChatsType[] = [
    {
        id: 1,
        sender: 'John',
        message: 'Hi',
        time: '12:00',
        receiver: 'Joy',
        senderStatus: 'online',
        receiverStatus: 'offline'

    },
    {
        id: 2,
        sender: 'Joy',
        message: 'Good morning Chief',
        time: '12:00',
        receiver: 'John',
        senderStatus: 'offline',
        receiverStatus: 'online'

    },
    {
        id: 3,
        sender: 'John',
        message: 'Good morning Coach',
        time: '12:00',
        receiver: 'Joy',
        senderStatus: 'online',
        receiverStatus: 'offline'

    },
    {
        id: 4,
        sender: 'Joy',
        message: 'Hi',
        time: '12:00',
        receiver: 'John',
        senderStatus: 'offline',
        receiverStatus: 'online'

    },
]
export const contacts: ContactsType[] = [
    {
        id: 1,
        name: 'John Smith',
        role: 'Coach',
        email: 'john@gmail.com'
    },
    {
        id: 2,
        name: 'Lionel Messi',
        role: 'Player',
        email: 'messi@gmail.com'
    },
    {
        id: 3,
        name: 'David Michael',
        role: 'Player',
        email: 'david@gmail.com'
    },
    {
        id: 4,
        name: 'Michael Scott',
        role: 'Coach',
        email: 'mikky@gmail.com'
    },
    {
        id: 5,
        name: 'Dan Vin',
        role: 'Player',
        email: 'dan@gmail.com'
    },
    {
        id: 6,
        name: 'Dan Vin',
        role: 'Player',
        email: 'dan@gmail.com'
    },
    {
        id: 7,
        name: 'Dan Vin',
        role: 'Player',
        email: 'dan@gmail.com'
    },
    {
        id: 8,
        name: 'Dan Vin',
        role: 'Player',
        email: 'dan@gmail.com'
    }
]