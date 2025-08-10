import { useState } from 'react';
import App from './App';
import LoadingScreen from './components/LoadingScreen';

const AppWrapper = () => {
	const [loading, setLoading] = useState(true);

	return loading ? (
		<LoadingScreen onFinish={() => setLoading(false)} />
	) : (
		<App />
	);
};

export default AppWrapper;
