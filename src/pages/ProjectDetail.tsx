import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';

// Sample project data - in a real app, this would come from an API or data store
const projectsData: Project[] = [
    {
        id: 'eews',
        title: 'Earthquake Early Warning System ',
        description: 'An Event-Driven System to Detect Earthquake from Real-Time Seismograph Stations',
        image: '/assets/images/project1.jpg',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
        demoUrl: 'https://example.com/demo',
        codeUrl: 'https://github.com/yourusername/project',
        details: {
            clientName: 'E-Shop Inc.',
            duration: '3 months',
            role: 'Frontend Developer',
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Redux', 'Firebase'],
            challenge: 'The client needed a modern dashboard to visualize sales data in real-time, with intuitive navigation and dark mode support. The challenge was to create a responsive interface that could handle large datasets without sacrificing performance.',
            solution: 'I built a React-based dashboard using TypeScript for type safety and error prevention. Implemented real-time data visualization with Chart.js, optimized for performance. Used Redux for state management and Firebase for real-time updates. The UI was designed with Tailwind CSS for responsive layout and dark mode toggle.',
            results: 'The dashboard improved the client\'s data analysis efficiency by 40%. User engagement increased by 25% due to the intuitive interface and dark mode option. The responsive design allowed staff to monitor sales data on any device.',
            images: [
                '/assets/images/project1-detail1.jpg',
                '/assets/images/project1-detail2.jpg',
                '/assets/images/project1-detail3.jpg'
            ]
        }
    },
    {
        id: 'project2',
        title: 'Social Media App',
        description: 'Full-stack social platform with real-time chat and notifications.',
        image: '/assets/images/project2.jpg',
        tags: ['Next.js', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
        demoUrl: 'https://example.com/demo',
        codeUrl: 'https://github.com/yourusername/project',
        details: {
            clientName: 'ConnectMe Startup',
            duration: '6 months',
            role: 'Full Stack Developer',
            technologies: ['Next.js', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'Socket.io', 'TypeScript'],
            challenge: 'The startup needed a modern social media platform with real-time messaging, notifications, and a smooth user experience. The platform needed to be scalable and support multiple devices.',
            solution: 'I developed a responsive full-stack application using Next.js for server-side rendering and improved SEO. Implemented real-time features with Firebase and Socket.io. Created fluid animations with Framer Motion for a polished user experience.',
            results: 'The application successfully launched with 10,000+ users in the first month. User retention rate of 65%, significantly higher than industry average. Real-time messaging and notification system performed efficiently even during peak usage times.',
            images: [
                '/assets/images/project2-detail1.jpg',
                '/assets/images/project2-detail2.jpg',
                '/assets/images/project2-detail3.jpg'
            ]
        }
    },
    // Add more projects as needed
];

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    useEffect(() => {
        // Simulate fetching project data
        setLoading(true);

        setTimeout(() => {
            const foundProject = projectsData.find((p) => p.id === id);

            if (foundProject) {
                setProject(foundProject);
                document.title = `${foundProject.title} | Portfolio`;
            } else {
                // If project not found, navigate to 404 page
                navigate('/not-found');
            }

            setLoading(false);
        }, 500);

        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!project) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="pt-20 pb-16 bg-light min-h-screen">
            <div className="container-custom">
                {/* Back button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-primary mb-8"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Projects
                </motion.button>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Project Header */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-lg text-gray-700">
                            {project.description}
                        </p>
                        <li>
                        </li>
                    </motion.div>

                    {/* Project Image Slider */}
                    {project.details?.images && project.details.images.length > 0 && (
                        <motion.div variants={itemVariants} className="mb-12">
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl mb-4">
                                {project.details.images.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{
                                            opacity: activeImageIndex === index ? 1 : 0,
                                            scale: activeImageIndex === index ? 1 : 1.1
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={image}
                                            alt={`${project.title} screenshot ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ))}

                                {/* Navigation arrows */}
                                {project.details.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setActiveImageIndex((prev) =>
                                                prev === 0 ? project.details!.images!.length - 1 : prev - 1
                                            )}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                                            aria-label="Previous image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setActiveImageIndex((prev) =>
                                                prev === project.details!.images!.length - 1 ? 0 : prev + 1
                                            )}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                                            aria-label="Next image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Image indicator dots */}
                            {project.details.images.length > 1 && (
                                <div className="flex justify-center space-x-2">
                                    {project.details.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImageIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-colors ${activeImageIndex === index
                                                    ? 'bg-primary'
                                                    : 'bg-gray-300 hover:bg-gray-400'
                                                }`}
                                            aria-label={`View image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                                <p className="text-gray-700">
                                    {project.details?.challenge}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                                <p className="text-gray-700">
                                    {project.details?.solution}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4">Results</h2>
                                <p className="text-gray-700">
                                    {project.details?.results}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <div className="p-6 rounded-xl bg-light-dark shadow-md">
                                <h2 className="text-xl font-bold mb-4">Project Info</h2>

                                <div className="space-y-4">
                                    {project.details?.clientName && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Client</h3>
                                            <p className="text-gray-800">{project.details.clientName}</p>
                                        </div>
                                    )}

                                    {project.details?.duration && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                                            <p className="text-gray-800">{project.details.duration}</p>
                                        </div>
                                    )}

                                    {project.details?.role && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">My Role</h3>
                                            <p className="text-gray-800">{project.details.role}</p>
                                        </div>
                                    )}

                                    {project.details?.technologies && (
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Technologies</h3>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.details.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col space-y-3">
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary text-center"
                                    >
                                        View Live Demo
                                    </a>
                                )}

                                {project.codeUrl && (
                                    <a
                                        href={project.codeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline text-center"
                                    >
                                        View Source Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Next projects section */}
                    <motion.div variants={itemVariants} className="border-t border-gray-200 pt-12">
                        <h2 className="text-2xl font-bold mb-6 text-center">Other Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {projectsData
                                .filter((p) => p.id !== project.id)
                                .slice(0, 3)
                                .map((p) => (
                                    <motion.div
                                        key={p.id}
                                        className="group relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer"
                                        onClick={() => navigate(`/project/${p.id}`)}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${p.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                                        <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {p.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs px-2 py-1 rounded-full bg-primary/20 text-white backdrop-blur-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-primary-light transition-colors">
                                                {p.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;