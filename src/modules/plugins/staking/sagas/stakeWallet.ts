import { put } from 'redux-saga/effects';
import { alertPush } from '../../..';
import axios from '../../../../plugins/api/index';

import { stakeWalletData, StakeWalletFetch } from '../actions';
import { StakeWallet } from '../types';

export function* fetchStakeWallet(action: StakeWalletFetch) {
	yield put(
		stakeWalletData({
			payload: [],
			loading: true,
		}),
	);
	try {
		const { uid, currency_id } = action.payload;
		if (uid && currency_id) {
			const wallets = yield axios.get<StakeWallet[]>(`stake/wallet/fetch/uid=${uid}/currency_id=${currency_id}`);
			yield put(
				stakeWalletData({
					payload: [...wallets.data],
					loading: false,
				}),
			);
		} else {
			yield put(
				stakeWalletData({
					payload: [],
					loading: false,
				}),
			);
		}
	} catch (error) {
		yield put(
			stakeWalletData({
				payload: [],
				loading: false,
			}),
		);
		yield put(alertPush({ message: [error.message], code: error.code, type: 'error' }));
	}
}