import { motion } from "framer-motion"
import { SectionWrapper } from "../../hoc/SectionWrapper"

interface WorkExperience {
    id: number,
    place: string,
    position: string,
    start: string,
    end: string,
    techStacks: string[],
    details: string[]
}

const Works: WorkExperience[] = [
    {
        id: 1,
        place: "CIMB Niaga",
        start: "Oct 2024",
        end: "Present",
        position: "IT Developer",
        details: [
            "Developing A personal loan, credit card, and mortgage platform using Go, Java, and React",
            "Designed and implemented CI/CD pipelines with Jenkins and Groovy, automating deployment processes",
            "Developed scalable backend services, optimized database performance, and responsive user interfaces",
            "Ensured system security, performance optimization, and seamless integration between legacy systems and modern systems"
        ],
        techStacks: []
    },
    {
        id: 2,
        place: "KMPlus Consulting",
        start: "July 2024",
        end: "Oct 2024",
        position: "Software Engineer",
        details: [
            "Migrating a codebase to typescript for increasing development, maintaining backward compatibility, and implementing best practices",
            "Developing a learning management system tailored for our client needs, responsible for frontend and backend of the application"
        ],
        techStacks: []
    },
    {
        id: 1,
        place: "Home Credit Indonesia",
        start: "Jan 2024",
        end: "June 2024",
        position: "Software Engineer Intern",
        details: [
            "Improved business process latency by over 300% using multithreading and optimized query",
            "Found critical bug during system design and proposed preventative plan that is used in production",
            "Worked extensively with Hibernate, Spring AOP, Spring Security, task scheduling, transaction management, and proficiently utilizing Kafka and RabbitMQ",
            "Worked on system to automate fiduciary guarantee process to increase cash flow and ensuring compliance"
        ],
        techStacks: []
    },
]

const WorkExperienceCard: React.FC<WorkExperience> = ({ id, place, position, start, end, details }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1
            }
        }
    };
    return <div className={`grid grid-cols-8 md:grid-cols-11 text-deep-coffe `}>
        <div id={`work-experience-${place}-details`} className={`col-span-7 md:col-span-5 py-4 md:py-10 order-2 ${id % 2 === 1 ? 'md:order-1' : 'md:order-3'}`}>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true
                }}
                className="rounded-3xl bg-light-rose py-4 px-8 text-left"
            >
                <h5 className="text-xl md:text-2xl font-extrabold">{position}</h5>
                <div className="md:text-lg font-bold text-current/90 mb-2 flex justify-between">
                    <h6>{place}</h6>
                    <p className="hidden md:block italic">{`${start} - ${end}`}</p>
                </div>
                <ul className="font-semibold">
                    {details.map((detail, idx) => (<li className="list-disc mb-2" key={`${place}-details-${idx}`}>{detail}</li>))}
                </ul>
                <p className="md:hidden text-right italic">{`${start} - ${end}`}</p>
            </motion.div>
        </div>
        <div className="col-span-1 flex justify-center order-1 md:order-2">
            <div className="w-1.5 bg-boysenberry h-full" />
        </div>
        <div id={`work-experience-${place}-images`} className={`col-span-5 relative hidden md:flex justify-center items-center ${id % 2 === 0 ? ' order-1' : 'order-3'}`}>
        <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true
                    }}
                    className="work-photo"
                >
                    <img src={`./work/${place}-photo.jpg`} className="w-72 lg:w-[400px]" />
                </motion.div>
        </div>
    </div>
}

const WorkExperiences = () => {
    return <SectionWrapper idName="work-experiences" title="Work Experiences">
        <div className="">
            {Works.map((work) => <WorkExperienceCard {...work} key={work.place + work.id} />)}
        </div>
    </SectionWrapper>
}
export default WorkExperiences