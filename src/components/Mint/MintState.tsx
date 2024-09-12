import { Block, Page, Button, Card } from 'konsta/react';
import ConfettiExplosion from 'react-confetti-explosion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useMint, steps } from './provider/mint';
import { useNavigate } from 'react-router-dom';

const Container = styled(Page)`
  display: flex;
  flex-direction: column;

	.invalid-feedback {
		color: red;
	}
`;

const Timeline = styled.ul`
  display: grid;
	height: 100%;
	li {
	  padding-bottom: 1.5rem;
    border-left: 1px solid white;
    position: relative;
    padding-left: 20px;
    margin-left: 10px;
		&:last-child {
    	border-left: 0 !important;
		}
		&:before {
			content: "";
    	width: 15px;
    	height: 15px;
    	background: white;
    	border: 1px solid white;
    	border-radius: 50%;
    	position: absolute;
    	left: -8px;
    	top: 0px;
		}
		.timestamp {
    	position: relative;
    	width: 100px;
    	font-size: 14px;
		}
	}
`;

const Footer = styled.div`
  margin-top: auto;
  margin-bottom: 30px;
`;

const statusColor = {
	waiting: '#faa05a',
	done: '#1d8cf8',
};

const TimelineItem = styled.li`
	transition: 1s;
	${(props) => `
		${props.status === 'done'
		? `border-left: 1px solid ${statusColor.done} !important;`
		: 'border-left: 1px solid white !important;'}
		&:before {
    	background:  ${statusColor[props.status]} !important;
    	border: 1px solid ${statusColor[props.status]} !important;
		}
	`}
`;

const Error = ({ message, t }) => {
	return (
		<Container>
			<div className="pl-4-safe pr-4-safe mt-8 flex justify-center items-center -mb-6 font-semibold text-[1.5rem] text-center">
				{t('qrmint.mintState.error.title')}
			</div>
			<Block>
				<p className="text-center">
					{t('qrmint.mintState.error.subtitle')}
				</p>
				<Card className="text-center">{message}</Card>
				<Button
					outline
					large
					rounded
					className="mt-5"
					onClick={() => {
						window.Telegram.WebApp.openTelegramLink('https://t.me/qrmint_support');
					}}
				>
					Support
				</Button>
			</Block>
		</Container>
	);
};


const Success = ({ t }) => {
	const navigate = useNavigate();
	return (
		<Container>
			<div className="pl-4-safe pr-4-safe mt-8 flex justify-center items-center -mb-6 font-semibold text-[1.5rem] text-center">
				{t('qrmint.mintState.success.title')}
				<ConfettiExplosion />
			</div>
			<Block>
				<p className="text-center">
					{t('qrmint.mintState.success.subtitle')}
				</p>
			</Block>
			<Footer className="mx-4">
				<button
					type="submit"
					onClick={() => navigate('/')}
					className="flex text-center justify-center items-center appearance-none py-1 transition-colors focus:outline-none cursor-pointer select-none overflow-hidden z-10 w-full flex relative uppercase duration-100 font-semibold px-2 rounded text-black bg-primary active:bg-ios-primary-shade h-11"
					role="button"
					tabIndex={0}
				>
					{t('qrmint.home')}
				</button>
			</Footer>
		</Container>
	);
};

export const MintState = () => {
	const { t } = useTranslation();
	const { error, step, address } = useMint();

	if (error) {
		return <Error message={error} t={t} />;
	} else if (step === steps.success) {
		return <Success address={address} t={t} metadataUrl={''} />;
	}
	return (
		<Container>
			<div className="pl-4-safe pr-4-safe mt-8 flex justify-center items-center -mb-6 font-semibold text-[1.5rem] text-center">
				{t('qrmint.mintState.title')}
			</div>
			<Block>
				<p className="text-center">
					{t('qrmint.mintState.subtitle')}
				</p>
			</Block>
			
			<Timeline className="mx-5"> 
				<TimelineItem status={[ steps.deploy, steps.transfer ].includes(step) ? 'done' : 'waiting'}>
					<span className="timestamp">{t('qrmint.mintState.step1.title')}</span>
					<div className="timeline-text">{t('qrmint.mintState.step1.subtitle')}</div>
				</TimelineItem>
				<TimelineItem status={step === steps.deploy ? 'waiting' : step === steps.transfer ? 'done' : ''}>
					<span className="timestamp">{t('qrmint.mintState.step2.title')}</span>
					<div className="timeline-text">{t('qrmint.mintState.step2.subtitle')}</div>
				</TimelineItem>
				<TimelineItem status={step === steps.transfer ? 'waiting' : step === steps.success ? 'done' : ''}>
					<span className="timestamp">{t('qrmint.mintState.step3.title')}</span>
					<div className="timeline-text">{t('qrmint.mintState.step3.subtitle')}</div>
				</TimelineItem>
			</Timeline>
		</Container>
	);
};

