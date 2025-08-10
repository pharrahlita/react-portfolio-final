import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const LoadingScreenContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	padding: 20px;
	text-align: center;
	user-select: none;
	-webkit-user-select: none;
`;

const TerminalLines = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 90%;
	width: 100%;
	color: #aaac9b;
`;

const TypedLine = styled.div`
	font-size: 1.1rem;
	margin: 6px 0;
	word-break: break-word;
	white-space: pre-wrap;
	color: #aaac9b;
`;

const Title = styled.h1`
	font-family: 'TAN Headline';
	margin: 24px 0 12px 0;
	color: #dbdad0;
	font-size: 7rem;
	opacity: 0;
	gap: 0.2em;
	letter-spacing: 10px;
	animation: fadeIn 1s ease-in-out forwards;

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
`;

const Cursor = styled.span`
	display: inline-block;
	width: 8px;
	height: 1.2em;
	background-color: #aaac9b;
	margin-left: 4px;
	animation: blink 1s steps(1) infinite;
	vertical-align: bottom;
	pointer-events: none;

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
`;

const LoadingScreen = ({ onFinish }) => {
	const [lines, setLines] = useState([]);
	const [currentText, setCurrentText] = useState('');
	const [step, setStep] = useState(0);
	const [showTitle, setShowTitle] = useState(false);
	const [subtext, setSubtext] = useState('');
	const [deleting, setDeleting] = useState(false);

	const typingRef = useRef(null);
	const deletingRef = useRef(null);

	const script = [
		'>> siany.dev',
		'> initialising system...',
		'', // triggers the title + subtext
	];

	const rawInitialSubtexts = [
		'was supposed to rest. made a website instead...',
		'probably overengineered this a little.',
		'adhd-coded. literally.',
		'attention to detail? unfortunately, yes.',
		"yes, everything is custom. no, I don't sleep.",
		"console.log('blorp blorp');",
		'i hope you like it. i spent way too long on this.',
		'if you see this, hi <3.',
		'you have entered: The Dev Zone.',
		'welcome to my little corner of the internet.',
	];

	const rawFinalSubtext = 'welcome to siany.dev...';

	const chosenInitialSubtext = useRef(
		rawInitialSubtexts[Math.floor(Math.random() * rawInitialSubtexts.length)]
	);

	useEffect(() => {
		if (step >= script.length) {
			setTimeout(() => {
				setShowTitle(true);
				setTimeout(() => {
					typeSubtext(chosenInitialSubtext.current, () => {
						setTimeout(() => setDeleting(true), 1000);
					});
				}, 800);
			}, 400);
			return;
		}

		const line = script[step];
		let i = 0;

		typingRef.current = setInterval(() => {
			if (i <= line.length) {
				setCurrentText(line.slice(0, i));
				i++;
			} else {
				clearInterval(typingRef.current);
				setLines((prev) => [...prev, line]);
				setCurrentText('');
				setStep((prev) => prev + 1);
			}
		}, 40);

		return () => clearInterval(typingRef.current);
	}, [step]);

	const typeSubtext = (text, callback) => {
		if (typingRef.current) clearInterval(typingRef.current);
		setSubtext('');
		let i = 0;

		typingRef.current = setInterval(() => {
			if (i <= text.length) {
				setSubtext(text.slice(0, i));
				i++;
			} else {
				clearInterval(typingRef.current);
				if (callback) callback();
			}
		}, 30);
	};

	useEffect(() => {
		if (!deleting) return;
		if (typingRef.current) clearInterval(typingRef.current);

		deletingRef.current = setInterval(() => {
			setSubtext((prev) => {
				if (prev.length === 0) {
					clearInterval(deletingRef.current);
					typeSubtext(rawFinalSubtext, () => {
						setTimeout(onFinish, 3000);
					});
					return '';
				} else {
					return prev.slice(0, -1);
				}
			});
		}, 20);

		return () => clearInterval(deletingRef.current);
	}, [deleting, onFinish]);

	useEffect(() => {
		return () => {
			if (typingRef.current) clearInterval(typingRef.current);
			if (deletingRef.current) clearInterval(deletingRef.current);
		};
	}, []);

	return (
		<LoadingScreenContainer>
			<TerminalLines>
				{lines.map((line, i) => (
					<TypedLine key={i}>{line}</TypedLine>
				))}

				{currentText && <TypedLine>{currentText}</TypedLine>}

				{showTitle && (
					<>
						<Title>SIANA</Title>
						<TypedLine>
							<span>&gt;&gt; </span>
							<span>{subtext}</span>
							<Cursor />
						</TypedLine>
					</>
				)}
			</TerminalLines>
		</LoadingScreenContainer>
	);
};

export default LoadingScreen;
