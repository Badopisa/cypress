import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { msgReducer } from './msgReducer';
import { teamReducer } from './teamReducer';
import { playerReducer } from '@/store/reducers/playerReducer';
import { staffReducer } from '@/store/reducers/staffReducer';
import { playerStatisticReducer } from '@/store/reducers/playerStatisticsReducer';
import { analyticsReducer } from './analyticsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    msg: msgReducer,
    staff: staffReducer,
    player: playerReducer,
    team: teamReducer,
    analytics: analyticsReducer,
    category: categoryReducer,
    playersStatistics: playerStatisticReducer
});

export default rootReducer;
