import { Route, Routes } from 'react-router-dom';
import { type FunctionComponent, useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

import { Home } from '@/pages';
import { Scanner } from '@/pages/scanner';
import { QRMint } from '@/pages/qr-mint';
import { SettingsRouter } from '@/pages/settings/router';
import { Connect } from '@/pages/connect';
import { useAuthStore } from '@/store/auth';
import { Onboarding } from '@/components/Onboarding';
import { Partners } from '@/pages/partners';


export const AppRouter: FunctionComponent = () => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [connector] = useTonConnectUI();
	const { getMe, setTonConnector, access_token } = useAuthStore();
	useEffect(() => {
		if (connector) setTonConnector(connector);
	}, [ connector, setTonConnector ]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				await getMe();
			} finally {
				setIsLoading(false);
			}
		};
		let timer;
		if (!isLoading) {
			setIsLoading(true);
			timer = setTimeout(fetchUser, 1500);
		}
		
		return () => {
			clearTimeout(timer);
		};
	}, [ connector.connected, access_token ]);

	if (isLoading) {
		return <Onboarding />;
	}
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/scanner" element={<Scanner />} />
			<Route path="/partners" element={<Partners />} />
			<Route path="/qr-mint" element={<QRMint />} />
			<Route path="/settings/*" element={<SettingsRouter />} />
			<Route path="/connect" element={<Connect />} />
		</Routes>
	);
};

