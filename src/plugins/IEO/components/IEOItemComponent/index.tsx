import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { currenciesFetch, selectCurrencies } from '../../../../modules';
import Countdown from 'react-countdown';

interface IEOItemProps {
	id: String;
	type: string;
	currencyId: string;
	startDate: string;
	endDate: string;
	description?: string;
	currencyAvailable: Array<string>;
	bonus?: string;
}
export const IEOItemComponent: React.FC<IEOItemProps> = props => {
	const dispatch = useDispatch();
	const dispatchcFetchCurrencies = () => dispatch(currenciesFetch());
	const history = useHistory();
	React.useEffect(() => {
		dispatchcFetchCurrencies();
	}, []);
	const status = (color, type: string, date: Date) => {
		return (
			<div className="ieo-item-coin-time" style={{ background: `${color}` }}>
				<p>
					{type}
					<Countdown date={date} renderer={renderer} />
				</p>
			</div>
		);
	};
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		return !completed ? (
			<span>
				{days} d : {hours} h : {minutes} m : {seconds} s
			</span>
		) : (
			<></>
		);
	};
	const renderStatus = (type: string) => {
		switch (type) {
			case 'ongoing':
				return status(`linear-gradient(90deg, #0E33CA 0%, #FD0056 100%)`, `Ends in `, new Date(props.endDate));
			case 'upcoming':
				return status(`#FF6400`, `Start in `, new Date(props.startDate));
			case 'ended':
				return status(`#858E9D`, 'Ended ', new Date());
			default:
				return `#ffff`;
		}
	};
	const currencies = useSelector(selectCurrencies);
	const findIcon = (code: string): string => {
		const currency = currencies.find(currencyParam => currencyParam.id === code);
		try {
			return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
		} catch (err) {
			if (currency) {
				return currency.icon_url;
			}

			return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
		}
	};
	return (
		<div id="ieo-item">
			<div className="ioe-item-header">
				{renderStatus(props.type)}
				<div
					className="ieo-item-coin-img"
					onClick={() => {
						const location = {
							pathname: `/ieo/detail/${props.id}`,
						};
						history.push(location);
					}}
				>
					<img src={findIcon(props.currencyId)} />
				</div>
			</div>

			<div className="ieo-item-content">
				<h3>{props.description}</h3>
				<div className="ieo-item-currencies d-flex flex-row flex-wrap">
					{props.currencyAvailable.map(currency => (
						<div className="ieo-item-currency">
							<p>{currency}</p>
						</div>
					))}
				</div>
			</div>

			<div className="ioe-item-footer">
				<p className="ioe-item-footer-status">List Confirm </p> <span>|</span>
				<p className="ioe-item-footer-bonus">Bonus 10%</p>
			</div>
		</div>
	);
};
