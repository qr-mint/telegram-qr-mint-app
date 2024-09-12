import { AppRouter } from './router';
import './i18n';

export const App = () => {
	// const [ _, setOptions ] = useTonConnectUI();
	// useEffect(() => {
	// 	setOptions({ buttonRootId: 'connect' });
	// }, [setOptions]);
	return (
		<AppRouter />
	);
};
