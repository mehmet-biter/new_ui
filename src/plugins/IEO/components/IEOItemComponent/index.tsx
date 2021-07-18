import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { currenciesFetch, selectCurrencies } from '../../../../modules';
import Countdown from 'react-countdown';
import NP from 'number-precision';
import millify from 'millify';
interface IEOItemProps {
	id: String;
	type: string;
	currencyId: string;
	startDate: string;
	endDate: string;
	description?: string;
	currencyAvailable: Array<string>;
	bonus?: string;
	remains: number;
	total: number;
	progress: number;
}
export const IEOItemComponent: React.FC<IEOItemProps> = props => {
	const dispatch = useDispatch();
	const dispatchFetchCurrencies = () => dispatch(currenciesFetch());
	const history = useHistory();
	const [progressState, setProgressState] = React.useState<number>(0);
	const [totalState, setTotalState] = React.useState<number>(0);
	const [remainsState, setRemainsState] = React.useState<number>(0);
	React.useEffect(() => {
		dispatchFetchCurrencies();
	}, []);

	React.useEffect(() => {
		const newProgress = Math.round(NP.minus(100, Number(props.progress)) * 100) / 100;
		setProgressState(newProgress);
		setTotalState(props.total);
		setRemainsState(props.remains);
	}, [props.progress]);
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

	// 	const renderProgress = () => {
	// 		return

	// 	}
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
	const getCryptoIcon = (currencyID: string): string => {
		const currency = currencies.find((cur: any) => cur.id === currencyID);
		try {
			return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${currencyID.toLowerCase()}.png`);
		} catch (err) {
			if (currency) {
				return currency.icon_url;
			}
			return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
		}
	};
	return (
		<div
			id="ieo-item"
			onClick={() => {
				const location = {
					pathname: `/ieo/detail/${props.id}`,
				};
				history.push(location);
			}}
		>
			<div className="ioe-item-header">
				{renderStatus(props.type)}
				<div className="ieo-item-coin-img">
					<img
						src={getCryptoIcon(props.currencyId.toUpperCase())}
						alt={`${props.currencyId}-icon`}
						style={{ width: '7rem', height: '7rem' }}
					/>
				</div>
				<div
					className="ieo-item-coin-remains col-12 d-flex flex-wrap justify-content-center text-center
            "
				>
					<p className="col-12 text-white h5">{`Remains Token : ${progressState}%`}</p>

					<div className="col-12" style={{ position: 'relative' }}>
						<div
							className="progress"
							style={{ width: '100%', background: 'rgba(132, 142, 156, 0.35)', height: '25px' }}
						>
							<div
								className="progress-bar progress-bar-striped progress-bar-animated"
								role="progressbar"
								aria-valuenow={remainsState}
								aria-valuemin={0}
								aria-valuemax={totalState}
								style={{ width: `${progressState}%` }}
							/>
							<div
								className="text-white d-flex justify-content-around align-items-center"
								style={{
									position: 'absolute',
									top: '0',
									left: '0',
									width: '100%',
									height: '100%',
									padding: '0 1rem',
									fontSize: '1rem',
								}}
							>
								<span>
									( IEO Bought ){' '}
									{`${
										Number(remainsState) > 100000000
											? millify(Number(remainsState), {
													precision: 2,
											  })
											: Number(remainsState)
									} `}
								</span>
								<span hidden={Number(totalState) <= 0}>{`  /  `}</span>
								<span hidden={Number(totalState) <= 0}>
									{' '}
									{Number(totalState) > 100000000
										? millify(Number(totalState), {
												precision: 2,
										  })
										: Number(totalState)}{' '}
									( Total )
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="ieo-item-content">
				<h3>{props.description}</h3>
				<div className="ieo-item-currencies d-flex flex-row flex-wrap">
					{props.currencyAvailable.map(currency => (
						<div key={currency} className="ieo-item-currency">
							<p>{currency}</p>
						</div>
					))}
				</div>
			</div>

			<div className="ioe-item-footer">
				<p className="ioe-item-footer-status">{`Buy ${props.currencyId.toUpperCase()}`}</p> <span>|</span>
				<p className="ioe-item-footer-bonus">{`Bonus ${!props.bonus ? 0 : props.bonus}%`}</p>
			</div>
		</div>
	);
};
