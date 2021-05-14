import styled from 'styled-components';

export const MarketTradingStyle = styled.div`
	background-color: #313445;
	height: 450px;
	padding: 15px 0;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.rc-tabs {
		overflow: hidden;
		flex: 1;
		.rc-tabs-tabpane {
			outline: none;
		}
		.rc-tabs-nav-operations {
			display: none;
		}
		.rc-tabs-nav {
			padding: 0 23px;
			.rc-tabs-nav-list {
				background-color: #e5e5e5;
				margin-top: 10px;
				margin-bottom: 10px;
				display: flex;
				color: #fff;
				background-color: #4e5463;
				.rc-tabs-ink-bar {
					display: none;
				}
				.rc-tabs-tab {
					flex: 1;
					height: 25px;
					border-radius: 2px;
					cursor: pointer;
					font-weight: 500;
					&-active {
						background-color: #2fb67e;
						font-weight: 600;
					}
					.rc-tabs-tab-btn {
						:focus {
							outline: none;
						}
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
`;

export const SearchBlockStyle = styled.div`
	padding: 0 23px 15px 23px;
	.search-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #848e9c;
		padding: 5px 0;

		.search-icon {
			margin-right: 20px;
		}
		.search-input {
			width: inherit;
			flex: 1;
			outline: none;
			background-color: transparent;
			border: none;
			color: #fff;
			::placeholder {
				color: #848e9c;
			}
		}
	}
	.select-wrapper {
		.select-item {
			cursor: pointer;
		}
		* {
			cursor: pointer;
		}
		i {
			box-sizing: border-box;
			margin: 0px 4px 0px 0px;
			min-width: 0px;
			display: flex;
			border: 1px solid #848e9c;
			border-radius: 99999px;
			::before {
				content: '';
				width: 6px;
				height: 6px;
				margin: 2px;
			}
			&.active {
				border: 1px solid #2fb67e;
				::before {
					content: '';
					width: 6px;
					height: 6px;
					margin: 2px;
					border-radius: 99999px;
					background-color: #2fb67e;
				}
			}
		}
	}
`;

export const StarBlockStyle = styled.div`
	padding: 0 23px;
	display: flex;
	align-items: center;
	img {
		margin-right: 14px;
	}
	button {
		border: none;
		border-radius: 2px;
		outline: none;
		background: transparent;
		padding: 5px 6px;
		font-weight: 600;

		color: #fff;
		&.active {
			background-color: rgba(132, 142, 156, 0.35);
		}
	}
`;

export const MarketsListTradingStyle = styled.div`
	/* .td-markets-list-container */
	.td-markets-list-container {
		overflow-x: hidden;
		overflow-y: scroll;
		&__negative {
			color: var(--asks);
		}
		&__positive {
			color: var(--bids);
		}
		.sort-icon svg {
			height: calc(0.5em * 1.67);
			height: calc(var(--gap) * 1.67);
			opacity: 1;
			padding-left: calc(0.5em * 0.5);
			padding-left: calc(var(--gap) * 0.5);
			vertical-align: middle;
			width: calc(0.5em * 2);
			width: calc(var(--gap) * 2);
		}
		.td-table {
			background-color: transparent;
			thead {
				background-color: transparent;
				tr {
					background-color: transparent;
					width: 100%;
					display: table;
					table-layout: fixed;
					cursor: pointer;
					th {
						color: #848e9c;
						background-color: transparent;
						padding-top: 0 0 7px 0 !important;
						padding-bottom: 0 0 7px 0 !important;
						text-align: right;
						width: calc(100% / 3);
						:first-child {
							text-align: left;
							> span {
								padding-left: 23px;
							}
						}
						:last-child {
							> span {
								padding-right: 23px;
							}
						}
					}
				}
			}
			tbody {
				background-color: transparent;
				tr {
					&.td-table__row--selected {
						background-color: #4e5463;
					}
					margin-bottom: 1px;
					background-color: transparent;
					td.td-table__empty:nth-child(2) {
						text-align: center;
					}
					td {
						background-color: transparent;
						width: calc(100% / 3);
						text-align: right;
						padding: unset !important;
						> span {
							display: block;
						}
						:first-child {
							text-align: left;
							color: #fff;
							> span {
								display: flex;
								padding-left: 23px;
								align-items: center;
								> span {
									margin-right: 5px;
								}
							}
						}
						:last-child {
							> span {
								padding-right: 23px;
							}
						}
					}
					:hover {
						background-color: #4e5463;
					}
				}
			}
		}
	}
`;