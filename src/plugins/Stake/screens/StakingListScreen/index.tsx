import classnames from 'classnames';
import { useCurrenciesFetch } from 'hooks';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStakingList, stakingListFetch } from '../../../../modules';
import { StakingList } from '../../containers';

export const StakingListScreen = () => {
	// state
	const [filterStackingState, setFilterStackingState] = React.useState<'upcoming' | 'running' | 'all'>('all');
	const upcomingButtonClassName = classnames(
		'desktop-staking-list-screen__header__buttons-btn',
		filterStackingState === 'upcoming' ? 'desktop-staking-list-screen__header__buttons__upcoming' : '',
	);
	const runningButtonClassName = classnames(
		'desktop-staking-list-screen__header__buttons-btn',
		filterStackingState === 'running' ? 'desktop-staking-list-screen__header__buttons__running' : '',
	);
	const allButtonClassName = classnames(
		'desktop-staking-list-screen__header__buttons-btn',
		filterStackingState === 'all' ? 'desktop-staking-list-screen__header__buttons__all' : '',
	);

	// store
	const stakingList = useSelector(selectStakingList);

	const upcomingList = stakingList.filter(staking => staking.status === 'upcoming');
	const runningList = stakingList.filter(staking => staking.status === 'running');
	const endedList = stakingList.filter(staking => staking.status === 'ended');

	// dispatch
	const dispatch = useDispatch();
	const dispatchFetchStakingList = () => dispatch(stakingListFetch());

	useCurrenciesFetch();

	React.useEffect(() => {
		dispatchFetchStakingList();
	}, []);

	const [searchState, setSearchState] = React.useState('');

	React.useEffect(() => {
		setFilterStackingState('all');
	}, [searchState]);

	const renderStakingList = () => {
		if (searchState !== '') {
			return (
				<StakingList
					stakes={[...stakingList].filter(stake => stake.currency_id.toLowerCase().includes(searchState.toLowerCase()))}
				/>
			);
		}
		return filterStackingState === 'upcoming' ? (
			<StakingList stakes={[...upcomingList]} />
		) : filterStackingState === 'running' ? (
			<StakingList stakes={[...runningList]} />
		) : (
			<StakingList stakes={[...runningList, ...upcomingList, ...endedList]} />
		);
	};

	return (
		<div className="desktop-staking-list-screen">
			<div className=" container desktop-staking-list-screen__header">
				<div className="row">
					<div className="col-12">
						<h1
							style={{
								color: '#fff',
								fontSize: '35px',
								fontWeight: 500,
								lineHeight: '41px',
								marginBottom: '29px',
							}}
						>
							Stake
						</h1>
					</div>
				</div>
				<div className="d-flex flex-row justify-content-between">
					<div className="desktop-staking-list-screen__header__search">
						<input
							placeholder="Search currency"
							type="text"
							value={searchState}
							onChange={e => setSearchState(e.target.value)}
						/>
						<div className="icon-search">
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
									fill="#848E9C"
								/>
							</svg>
						</div>
					</div>
					<div className="desktop-staking-list-screen__header__buttons">
						<button onClick={() => setFilterStackingState('all')} className={allButtonClassName}>
							All <span hidden={filterStackingState != 'all'}>({stakingList.length})</span>
						</button>
						<button onClick={() => setFilterStackingState('upcoming')} className={upcomingButtonClassName}>
							Upcoming <span hidden={filterStackingState != 'upcoming'}>({upcomingList.length})</span>
						</button>
						<button onClick={() => setFilterStackingState('running')} className={runningButtonClassName}>
							Running <span hidden={filterStackingState != 'running'}>({runningList.length})</span>
						</button>
					</div>
				</div>
			</div>

			<div
				style={{ position: 'relative', paddingRight: '0px', paddingLeft: '0px' }}
				className="row m-auto container desktop-staking-list-screen__body"
			>
				{renderStakingList()}
			</div>
		</div>
	);
};
