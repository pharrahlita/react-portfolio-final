import { useCallback, useState } from 'react';
import App from './App';
import LoadingScreen from './components/LoadingScreen';

const AppWrapper = () => {
	const [loading, setLoading] = useState(true);
	const [hasFinished, setHasFinished] = useState(false);

	const handleFinish = useCallback(() => {
		if (!hasFinished) {
			setHasFinished(true);
			setLoading(false);
		}
	}, [hasFinished]);

	return loading ? <LoadingScreen onFinish={handleFinish} /> : <App />;
};

export default AppWrapper;
