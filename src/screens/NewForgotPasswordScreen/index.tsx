import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { NewEmailForm, LayoutRegisterAndLogin, TemplateTitleRegisterAndLogin } from '../../components';
import { StyleComponent } from './StyleForgotPassword';
import { EMAIL_REGEX, ERROR_INVALID_EMAIL, setDocumentTitle } from '../../helpers';
import { IntlProps } from '../../index';
import { forgotPassword, RootState, selectCurrentLanguage, selectForgotPasswordSuccess } from '../../modules';
import WarningIcon from './assets/Warning.png';
interface ReduxProps {
	success: boolean;
}

interface DispatchProps {
	forgotPassword: typeof forgotPassword;
}

interface ForgotPasswordState {
	email: string;
	emailError: string;
	emailFocused: boolean;
}

type Props = RouterProps & ReduxProps & DispatchProps & IntlProps;

class ForgotPasswordComponent extends React.Component<Props, ForgotPasswordState> {
	constructor(props: Props) {
		super(props);

		this.state = {
			email: '',
			emailError: '',
			emailFocused: false,
		};
	}

	public componentDidMount() {
		setDocumentTitle('Forgot password');
	}

	public render() {
		const { email, emailFocused, emailError } = this.state;
		const Information = (
			<div className="forgot_password_information col-11 m-auto">
				<img src={WarningIcon} className="warning-icon" />
				<p>For security purposes, no withdrawals are permitted for 24 hours after modification of security methods.</p>
			</div>
		);
		const ForgotPasswordScreen = (
			<StyleComponent className="col-md-5 col-12" onKeyPress={this.handleEnterPress}>
				<TemplateTitleRegisterAndLogin
					title="Forgot Password"
					className="forgot_password"
					classNameTitle="forgot_password_title"
					classNameContent="forgot_password_Content"
					content="Welcome to CiRCLEEX"
					Information={Information}
				/>
				<div className="forgot-password-screen__container">
					<div className="forgot-password___form">
						<NewEmailForm
							OnSubmit={this.handleChangeEmail}
							title={this.props.intl.formatMessage({ id: 'page.forgotPassword' })}
							emailLabel={
								'Enter the account details to reset the password' &&
								this.props.intl.formatMessage({ id: 'page.forgotPassword.email' })
							}
							buttonLabel={this.props.intl.formatMessage({ id: 'page.forgotPassword.send' })}
							email={email}
							emailFocused={emailFocused}
							emailError={emailError}
							message={this.props.intl.formatMessage({ id: 'page.forgotPassword.message' })}
							validateForm={this.validateForm}
							handleInputEmail={this.handleInputEmail}
							handleFieldFocus={this.handleFocusEmail}
							handleReturnBack={this.handleComeBack}
						/>
					</div>
				</div>
			</StyleComponent>
		);
		return <LayoutRegisterAndLogin className="Forgot_password" component={ForgotPasswordScreen} />;
	}

	private handleChangeEmail = () => {
		const { email } = this.state;
		this.props.forgotPassword({
			email,
		});
	};

	private handleFocusEmail = () => {
		this.setState({
			emailFocused: !this.state.emailFocused,
		});
	};

	private handleInputEmail = (value: string) => {
		this.setState({
			email: value,
		});
	};

	private validateForm = () => {
		const { email } = this.state;

		const isEmailValid = email ? email.match(EMAIL_REGEX) : true;

		if (!isEmailValid) {
			this.setState({
				emailError: ERROR_INVALID_EMAIL,
			});

			return;
		}
	};

	private handleComeBack = () => {
		this.props.history.goBack();
	};

	private handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();

			this.handleChangeEmail();
		}
	};
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
	success: selectForgotPasswordSuccess(state),
	i18n: selectCurrentLanguage(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
	forgotPassword: credentials => dispatch(forgotPassword(credentials)),
});

export const NewForgotPasswordScreen = compose(
	injectIntl,
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(ForgotPasswordComponent) as React.ComponentClass;
