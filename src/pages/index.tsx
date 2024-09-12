import { Card, Page } from 'konsta/react';
import { type FunctionComponent } from 'react';

import { Tabbar } from '@/components/Tabbar';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { HiQrcode, HiChevronRight } from 'react-icons/hi';
import { HiQrCode } from 'react-icons/hi2';

export const Home: FunctionComponent = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Page>
			<div className="pl-4-safe pr-4-safe mt-8 flex justify-center items-center -mb-6 font-semibold text-[1.5rem] mb-4">
				{t('home.title')}
			</div>
			<Card className="cursor-pointer" onClick={() => navigate('/qr-mint')}>
				<div className="flex justify-start items-center">
					<div className="mr-1 cursor-pointer">
						<HiQrcode size={36} />
					</div>
					<b>{t('home.menu.GenerateQRArt')}</b>
					<div style={{ marginLeft: 'auto' }}>
						<HiChevronRight size={16} />
					</div>
					<b>{t('home.menu.GenerateQRArt')}</b>
					<div style={{ marginLeft: 'auto' }}>
						<HiChevronRight size={16} />
					</div>
				</div>
			</Card>
			<Card className="cursor-pointer" onClick={() => navigate('/scanner')}>
				<div className="flex justify-start items-center">
					<div className="mr-1 cursor-pointer">
						<HiQrCode size={36} />
					</div>
					<b>{t('home.menu.Scanner')}</b>
					<div style={{ marginLeft: 'auto' }}>
						<HiChevronRight size={16} />
					</div>
				</div>
			</Card>
			<Tabbar />
		</Page>
	);
};
