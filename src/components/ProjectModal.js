import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
`;

const ModalContent = styled(motion.div)`
	width: 80%;
	max-width: 900px;
	max-height: 90vh;
	background: ${(props) => props.theme.body};
	color: ${(props) => props.theme.text};
	padding: 2rem;
	border-radius: 10px;
	overflow-y: auto;
	position: relative;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: none;
	border: none;
	color: ${(props) => props.theme.text};
	font-size: 1.5rem;
	cursor: pointer;
`;

const ProjectTitle = styled.h2`
	font-size: 2rem;
	margin-bottom: 1rem;
`;

const ProjectSection = styled.div`
	margin: 2rem 0;
`;

const SectionTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

const ImageGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1rem;
	margin: 1rem 0;
`;

const ProjectImage = styled.img`
	width: 100%;
	height: auto;
	border-radius: 5px;
`;

const TechStack = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin: 1rem 0;
`;

const TechTag = styled.span`
	padding: 0.5rem 1rem;
	background: ${(props) => props.theme.text};
	color: ${(props) => props.theme.body};
	border-radius: 20px;
	font-size: 0.9rem;
`;

const ProjectModal = ({ project, onClose }) => {
	useEffect(() => {
		// Disable scrolling when modal is open
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = '15px'; // Prevent layout shift when scrollbar disappears

		// Re-enable scrolling when modal is closed
		return () => {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0';
		};
	}, []);

	if (!project) return null;

	return (
		<ModalWrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
		>
			<ModalContent
				onClick={(e) => e.stopPropagation()}
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 50, opacity: 0 }}
			>
				<CloseButton onClick={onClose}>×</CloseButton>

				<ProjectTitle>{project.name}</ProjectTitle>

				<ProjectSection>
					<SectionTitle>Overview</SectionTitle>
					<p>{project.description}</p>
				</ProjectSection>

				{project.techStack && (
					<ProjectSection>
						<SectionTitle>Tech Stack</SectionTitle>
						<TechStack>
							{project.techStack.map((tech, index) => (
								<TechTag key={index}>{tech}</TechTag>
							))}
						</TechStack>
					</ProjectSection>
				)}

				{project.process && (
					<ProjectSection>
						<SectionTitle>Development Process</SectionTitle>
						<p>{project.process}</p>
					</ProjectSection>
				)}

				{project.images && (
					<ProjectSection>
						<SectionTitle>Project Gallery</SectionTitle>
						<ImageGrid>
							{project.images.map((image, index) => (
								<ProjectImage
									key={index}
									src={image}
									alt={`Project image ${index + 1}`}
								/>
							))}
						</ImageGrid>
					</ProjectSection>
				)}

				{project.demo && (
					<ProjectSection>
						<SectionTitle>Live Demo</SectionTitle>
						<p>
							<a href={project.demo} target="_blank" rel="noopener noreferrer">
								Visit Project →
							</a>
						</p>
					</ProjectSection>
				)}
			</ModalContent>
		</ModalWrapper>
	);
};

export default ProjectModal;
