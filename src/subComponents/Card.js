import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import ProjectModal from '../components/ProjectModal';

const Box = styled(motion.li)`
	width: 16rem;
	height: 40vh;
	background-color: ${(props) => props.theme.text};
	color: ${(props) => props.theme.body};
	padding: 1.5rem 2rem;
	margin-right: 8rem;
	border-radius: 0 50px 0 50px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border: 1px solid ${(props) => props.theme.body};
	transition: all 0.2s ease;

	&:hover {
		background-color: ${(props) => props.theme.body};
		color: ${(props) => props.theme.text};
		border: 1px solid ${(props) => props.theme.text};
	}
`;
const Title = styled.h2`
	font-size: calc(1em + 0.5vw);
`;

const Description = styled.h2`
	font-size: calc(0.8em + 0.3vw);
	font-family: 'Karla', sans-serif;
	font-weight: 500;
`;
const Tags = styled.div`
	border-top: 2px solid ${(props) => props.theme.body};
	padding-top: 0.5rem;
	display: flex;
	flex-wrap: wrap;
	${Box}:hover & {
		border-top: 2px solid ${(props) => props.theme.text};
	}
`;
const Tag = styled.span`
	margin-right: 1rem;
	font-size: calc(0.8em + 0.3vw);
`;

const Footer = styled.footer`
	display: flex;
	justify-content: space-between;
`;

const ReadMore = styled.button`
	background-color: ${(props) => props.theme.body};
	color: ${(props) => props.theme.text};
	text-decoration: none;
	padding: 0.5rem calc(2rem + 2vw);
	border-radius: 0 0 0 50px;
	font-size: calc(1em + 0.5vw);
	border: none;
	cursor: pointer;

	${Box}:hover & {
		background-color: ${(props) => props.theme.text};
		color: ${(props) => props.theme.body};
	}
`;

// Framer motion configuration
const Item = {
	hidden: {
		scale: 0,
	},
	show: {
		scale: 1,
		transition: {
			type: 'spring',
			duration: 0.5,
		},
	},
};

const Card = (props) => {
	const [showModal, setShowModal] = React.useState(false);
	const { id, name, description, tags, demo } = props.data;

	return (
		<>
			<Box key={id} variants={Item}>
				<Title>{name}</Title>
				<Description>{description}</Description>
				<Tags>
					{tags.map((t, id) => {
						return <Tag key={id}>#{t}</Tag>;
					})}
				</Tags>
				<Footer>
					<ReadMore onClick={() => setShowModal(true)}>Read More</ReadMore>
				</Footer>
			</Box>
			{showModal && (
				<ProjectModal
					project={props.data}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default Card;
