import { Empty } from 'antd';
import { ConvertUsd } from 'components';
import { calcWalletsData } from 'helpers';
import { useAllChildCurrenciesFetch, useDocumentTitle, useWalletsFetch } from 'hooks';
import { SearchIcon } from 'mobile/assets/icons';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';
import { selectAllChildCurrencies, selectWallets, Wallet } from '../../../modules';

export const NewWalletsMobileScreen = () => {
	useDocumentTitle('Wallets');

	useWalletsFetch();
	useAllChildCurrenciesFetch();

	const wallets = useSelector(selectWallets);
	const allChildCurrencies = useSelector(selectAllChildCurrencies);

	const [searchString, setSearchString] = useState<string>('');
	const [hideSmallBalance, setHideSmallBalance] = useState<boolean>(false);

	const data = calcWalletsData(wallets, allChildCurrencies).filter(
		({ currency, total }) =>
			currency.includes(searchString.toLowerCase().trim()) && (hideSmallBalance ? Number(total) > 0 : true),
	);

	const renderWalletList = (walletsParam: Wallet[]) => {
		return walletsParam.map(wallet => (
			<div className="td-mobile-wallets__list__item" key={wallet.currency}>
				<div className="td-mobile-wallets__list__item__top">
					<img className="td-mobile-wallets__list__item__top__icon" src={wallet.iconUrl} alt={wallet.name} />
					<span className="td-mobile-wallets__list__item__top__symbol">{wallet.currency.toUpperCase()}</span>
				</div>
				<div className="td-mobile-wallets__list__item__bottom">
					<div>
						<span className="td-mobile-wallets__list__item__bottom__text">Estimation</span>
						<span className="td-mobile-wallets__list__item__bottom__number">
							≈${' '}
							<ConvertUsd
								value={Number(wallet.total)}
								symbol={wallet.currency}
								precision={4}
								defaultValue={'0.00'}
							/>
						</span>
					</div>
					<div>
						<span className="td-mobile-wallets__list__item__bottom__text">Total</span>
						<span className="td-mobile-wallets__list__item__bottom__number">{wallet.total}</span>
					</div>
					<div>
						<span className="td-mobile-wallets__list__item__bottom__text">Availible</span>
						<span className="td-mobile-wallets__list__item__bottom__number">{wallet.balance}</span>
					</div>
				</div>
			</div>
		));
	};

	return (
		<div className="td-mobile-wallets">
			<div className="td-mobile-wallets__header">
				<label className="td-mobile-wallets__header__search-box" htmlFor="td-mobile-wallets-search-box">
					<SearchIcon className="td-mobile-wallets__header__search-box__icon" />
					<DebounceInput
						id="td-mobile-wallets-search-box"
						className="td-mobile-wallets__header__search-box__input"
						debounceTimeout={500}
						onChange={e => setSearchString(e.target.value)}
					/>
				</label>

				<div className="td-mobile-wallets__header__toggle">
					<span className="td-mobile-wallets__header__toggle__text">Hide small balance</span>
					<label className="td-mobile-wallets__header__toggle__checkbox" htmlFor="td-mobile-wallet-hide-small-balance">
						<input
							id="td-mobile-wallet-hide-small-balance"
							className="td-mobile-wallets__header__toggle__checkbox__input"
							type="checkbox"
							onChange={e => setHideSmallBalance(e.target.checked)}
						/>
						<div className="td-mobile-wallets__header__toggle__checkbox__dot" />
					</label>
				</div>
			</div>
			<div className="td-mobile-wallets__list">{data.length === 0 ? <Empty /> : renderWalletList(data)}</div>
		</div>
	);
};