// tslint:disable-next-line
import { uniqBy } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { API, RequestOptions } from '../../../../api';
import { alertPush } from '../../../public/alert';
import { failHistory, historyAllData, HistoryAllFetch } from '../actions';

const config: RequestOptions = {
	apiVersion: 'peatio',
};

export function* historyAllDataSaga(action: HistoryAllFetch) {
	try {
		const { type, page, limit } = action.payload;
		const coreEndpoint = {
			deposits: '/account/deposits',
			withdraws: '/account/withdraws',
			trades: '/market/trades',
		};
		// lấy về trang đầu trả về 20 phần tử để render ra trước
		const params = `page=${page}&limit=${limit}`;
		let data = yield call(API.get(config), `${coreEndpoint[type]}?${params}`);

		if (data.length === limit) {
			// trả về 20 thang trueoc
			yield put(historyAllData({ list: data }));
			// loop tiếp đến khi hết data
			let index = 1;
			const max = 100;
			let checkData = yield call(API.get(config), `${coreEndpoint[type]}?page=${index}&limit=${max}`);
			if (checkData.length === max) {
				data = checkData;
				while (1) {
					checkData = yield call(API.get(config), `${coreEndpoint[type]}?page=${++index}&limit=${max}`);
					if (checkData.length === max) {
						// gooopj phân tử thì pahri lọc phần tử trùng
						data = data.concat(checkData);
						data = uniqBy(data , (e:any) => e.id );
					} else {
						data = data.concat(checkData);
						data = uniqBy(data , (e:any) => e.id );
						break;
					}
				}
			} else {
				data = checkData;
			}
		}
		yield put(historyAllData({ list: data }));
	} catch (error) {
		yield put(failHistory([]));
		yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
	}
}
