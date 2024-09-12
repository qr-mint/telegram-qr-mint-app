import React from 'react';

import { useAuthStore } from '../store/auth'; // Adjust the path as needed
import { Connect } from '../pages/connect';

export const withAuth = (WrappedComponent) => {
	const WithAuthComponent = (props) => {
		const { access_token, user } = useAuthStore();

		if (access_token && user) {
			return <WrappedComponent {...props} />;
		}

		return <Connect />;
	};

	WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

	return WithAuthComponent;
};

export default withAuth;