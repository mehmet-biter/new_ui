import * as React from 'react';

import { StyleCustomInput } from './CustomInputStyle';
export interface NewCustomInputProps {
	className?: string;
	type: string;
	label: string;
	defaultLabel: string;
	handleChangeInput?: (value: string) => void;
	inputValue: string | number;
	handleFocusInput?: () => void;
	placeholder: string;
	classNameLabel?: string;
	classNameInput?: string;
	autoFocus?: boolean;
	onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	readOnly?: boolean;
	id?: string;
	handleClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
	isDisabled?: boolean;
	labelVisible?: boolean;
}

interface OnChangeEvent {
	target: {
		value: string;
	};
}
type Props = NewCustomInputProps;

const NewCustomInput: React.FC<Props> = props => {
	const handleChangeValue = (e: OnChangeEvent) => {
		props.handleChangeInput && props.handleChangeInput(e.target.value);
	};
	return (
		<StyleCustomInput className={props.className || ''}>
			<label htmlFor="email" className={props.classNameLabel}>
				{props.label}
				{(props.labelVisible || '') && (props.label || props.defaultLabel)}
			</label>
			<div className="col-12">
				<input
					className={'form-control success ' + props.classNameInput}
					name="email"
					required
					type={props.type.toString()}
					// value={props.inputValue.toString()}
					placeholder={props.placeholder}
					autoFocus={props.autoFocus}
					onFocus={props.handleFocusInput}
					onBlur={props.handleFocusInput}
					onChange={e => handleChangeValue(e)}
					readOnly={props.readOnly}
					id={props.id}
					onClick={props.handleClick}
					disabled={props.isDisabled}
					onKeyPress={props.onKeyPress}
				/>
			</div>
		</StyleCustomInput>
	);
};
export { NewCustomInput };
