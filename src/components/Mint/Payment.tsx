import { Block, Button, Sheet, Toolbar, Link } from 'konsta/react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useNotification } from '@/providers/notification';
import BigNumber from 'bignumber.js';

import { getCollection } from '../../api/nft';
import { useEffect, useState } from 'react';

export const Payment = ({ sheetOpened, onClose, onAfterPaid, t }) => {
	const { notify } = useNotification();
	const [ loading, setLoading ] = useState(true);
	const [connector] = useTonConnectUI();
	const [ data, setData ] = useState();
	const fetchCollection = async () => {
		try {
			const _data = await getCollection();
			_data.mint_price;
			setData(_data);
		} catch (err) {
			notify({
				type: 'error',
				message: (err as Error).message
			});
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (loading) {
			fetchCollection();
		}
	}, []);
	const onPayment = async () => {
		try {
			setLoading(true);
			const myTransaction = {
				validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
				messages: [
					{
						address: data?.address,
						amount: data?.mint_price,
					},
				]
			};
			await connector.sendTransaction(myTransaction);
			onAfterPaid();
		} catch (err) {
			notify({
				type: 'error',
				message: (err as Error).message
			});
		}
	};
	const amount = new BigNumber(data?.mint_price || 0).div(10 ** 9).toString();
	return (
		<Sheet
			className="pb-safe w-full"
			opened={sheetOpened}
			onBackdropClick={onClose}
		>
			<Toolbar top>
				<div className="left" />
				<div className="right">
					<Link toolbar onClick={onClose}>
						{t('qrmint.close')}
					</Link>
				</div>
			</Toolbar>
			<Block>
				<p className="font-bold">
					{t('qrmint.payment.description', { amount })}
				</p>
				<div className="mt-4">
					<Button disabled={loading} outline onClick={onPayment}>{t('qrmint.pay', { amount })}</Button>
				</div>
			</Block>
		</Sheet>
	);
};