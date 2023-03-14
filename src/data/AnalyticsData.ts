interface UploadedType {
    file: string;
    competition: string;
    players: string;
    time: string;
}

interface AllEventType {
    file: string;
    playerName: string;
    playerPosition: string;
    eventType: string;
    teams: string;
    jerseyNo: number;
    competition: string;
}
interface chatType {
    userAvatar: string;
    userName: string;
    chatTime: string;
    message: string;
    status: string;
    noOfUnreadChats: number;
}
interface matchStatsType {
    statsType: string;
    team1Stats: number;
    team2Stats: number;
}
interface playerStatsType {
    statsType: string;
    player1Stats: number;
    player2Stats: number;
}

export const matchAnalyticsType: string[] = [
    'Full match',
    'Goals',
    'Shot attempts',
    'Free kicks',
    'Penalties',
    'Overtime',
    'Long passes',
    'Short passes'
];

export const uploadedVideosData: UploadedType[] = [
    {
        file: '/manu-match.mp4',
        competition: 'Premier League',

        players: 'Manchester vs Chelsea',
        time: 'Just now'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Premier League',
        players: 'Manchester vs Chelsea',
        time: '1 hour ago'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Premier League',
        players: 'Manchester vs Chelsea',
        time: '13/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Premier League',
        players: 'Manchester vs Chelsea',
        time: '12/5/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    },
    {
        file: '/manu-match.mp4',
        competition: 'Champions League',
        players: 'Manchester vs Chelsea',
        time: '12/4/2021'
    }
];

export const allEventsData: AllEventType[] = [
    {
        file: '/manu-match.mp4',
        playerName: 'Edsion cavani',
        playerPosition: 'Striker',
        eventType: 'Goal',
        teams: 'Chelsea vs Barcelona',
        jerseyNo: 13,
        competition: 'Premier League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Dame Tomes',
        playerPosition: 'Forward',
        eventType: 'Penalties',
        teams: 'Mancity United vs Barcelona',
        jerseyNo: 12,
        competition: 'Champions League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Paul Pogba',
        playerPosition: 'Midfielder',
        eventType: 'Pass',
        teams: 'Barcelona vs Chelsea',
        jerseyNo: 11,
        competition: 'Premier League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Lionel Messi',
        playerPosition: 'Forward',
        eventType: 'Free Kicks',
        teams: 'Manchester United vs Chelsea',
        jerseyNo: 10,
        competition: 'Champions League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Edsion cavani',
        playerPosition: 'Striker',
        eventType: 'Goal',
        teams: 'Chelsea vs Barcelona',
        jerseyNo: 3,
        competition: 'Premier League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Dame Tomes',
        playerPosition: 'Forward',
        eventType: 'Penalties',
        teams: 'Mancity United vs Barcelona',
        jerseyNo: 8,
        competition: 'Champions League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Paul Pogba',
        playerPosition: 'Midfielder',
        eventType: 'Pass',
        teams: 'Barcelona vs Chelsea',
        jerseyNo: 7,
        competition: 'Premier League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Lionel Messi',
        playerPosition: 'Forward',
        eventType: 'Free Kicks',
        teams: 'Manchester United vs Chelsea',
        jerseyNo: 4,
        competition: 'Champions League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Harry Maguire',
        playerPosition: 'Striker',
        eventType: 'Goal',
        teams: 'Chelsea vs Barcelona',
        jerseyNo: 6,
        competition: 'Premier League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'De Gea',
        playerPosition: 'Forward',
        eventType: 'Penalties',
        teams: 'Mancity United vs Barcelona',
        jerseyNo: 9,
        competition: 'Champions League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Paul Pogba',
        playerPosition: 'Midfielder',
        eventType: 'Pass',
        teams: 'Barcelona vs Chelsea',
        jerseyNo: 2,
        competition: 'Premier League'
    },
    {
        file: '/manu-match.mp4',
        playerName: 'Lionel Messi',
        playerPosition: 'Forward',
        eventType: 'Free Kicks',
        teams: 'Manchester United vs Chelsea',
        jerseyNo: 5,
        competition: 'Champions League'
    }
];

export const chatData: chatType[] = [
    {
        userAvatar: '/images/imgs/avatar.svg',
        userName: 'Lily Aldrin',
        chatTime: 'Just Now',
        message: 'Hey Chief',
        status: 'Online',
        noOfUnreadChats: 1
    },
    {
        userAvatar: '/images/imgs/avatar.svg',
        userName: 'Jane Jake',
        chatTime: '1 hour ago',
        message: 'Good morning',
        status: 'Away',
        noOfUnreadChats: 0
    },
    {
        userAvatar: '/images/imgs/avatar.svg',
        userName: 'Lily Aldrin',
        chatTime: 'Just Now',
        message: 'Hey Chief',
        status: 'Online',
        noOfUnreadChats: 1
    },
    {
        userAvatar: '/images/imgs/avatar.svg',
        userName: 'Jane Jake',
        chatTime: '1 hour ago',
        message: 'Good morning',
        status: 'Away',
        noOfUnreadChats: 0
    }
];

export const matchStatsData: matchStatsType[] = [
    {
        statsType: 'Shot Attempts',
        team1Stats: 2,
        team2Stats: 0
    },
    {
        statsType: 'Ball Possession',
        team1Stats: 6,
        team2Stats: 4
    },
    {
        statsType: 'Free Kicks',
        team1Stats: 60,
        team2Stats: 40
    },
    {
        statsType: 'Penalties',
        team1Stats: 10,
        team2Stats: 8
    },
    {
        statsType: 'Fouls',
        team1Stats: 0,
        team2Stats: 1
    },
    {
        statsType: 'Yellow cards',
        team1Stats: 0,
        team2Stats: 0
    },
    {
        statsType: 'Red cards',
        team1Stats: 2,
        team2Stats: 1
    }
];

export const playerStatsData: playerStatsType[] = [
    {
        statsType: 'Ball Possession',
        player1Stats: 60,
        player2Stats: 40
    },
    {
        statsType: 'Long Pass Acc',
        player1Stats: 95,
        player2Stats: 95
    },
    {
        statsType: 'Short Pass Acc',
        player1Stats: 85,
        player2Stats: 80
    },

    {
        statsType: 'Speed',
        player1Stats: 85,
        player2Stats: 75
    }
];
