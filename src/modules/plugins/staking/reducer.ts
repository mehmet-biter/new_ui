import { CREATE_STAKE_DATA, STAKE_HISTORY_DATA, STAKE_HISTORY_FETCH, STAKE_WALLET_DATA } from './constants';
// import { sliceArray } from '../../../../helpers';
import { StakingActions } from './actions';
import { STAKING_LIST_FETCH, STAKING_LIST_DATA, STAKING_LIST_ERROR, STAKE_WALLET_FETCH } from './constants';
import { StakingListState, StakeWalletState, StakeHistoryState, CreateStakeState } from './types';

export const initialCreateStake: CreateStakeState = {
	loading: false,
};

export const initialStakingList: StakingListState = {
	payload: [],
	loading: false,
};

export const initialStakeWallet: StakeWalletState = {
	payload: [],
	loading: false,
};

export const initialStakeHistory: StakeHistoryState = {
	payload: [],
	loading: false,
};

export const stakingListReducer = (state = initialStakingList, action: StakingActions): StakingListState => {
	switch (action.type) {
		case STAKING_LIST_FETCH:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case STAKING_LIST_DATA:
			const { payload, loading } = action.payload;

			return {
				...state,
				payload: payload,
				loading: loading,
				error: undefined,
			};
		case STAKING_LIST_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export const stakeWalletReducer = (state = initialStakeWallet, action: StakingActions): StakeWalletState => {
	switch (action.type) {
		case STAKE_WALLET_FETCH:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case STAKE_WALLET_DATA:
			const { payload, loading } = action.payload;

			return {
				...state,
				payload: payload,
				loading: loading,
				error: undefined,
			};
		default:
			return state;
	}
};

export const stakeHistoryReducer = (state = initialStakeHistory, action: StakingActions): StakeHistoryState => {
	switch (action.type) {
		case STAKE_HISTORY_FETCH:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case STAKE_HISTORY_DATA:
			const { payload, loading } = action.payload;

			return {
				...state,
				payload: payload,
				loading: loading,
				error: undefined,
			};
		default:
			return state;
	}
};

export const createStakeReducer = (state = initialCreateStake, action: StakingActions): CreateStakeState => {
	switch (action.type) {
		case CREATE_STAKE_DATA:
			const { loading } = action.payload;

			return {
				...state,
				loading: loading,
				error: undefined,
			};
		default:
			return state;
	}
};
