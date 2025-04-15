import { motion } from 'motion/react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router';

interface IIconData {
    iconPath: string
    order: number
    linkTo: string
    bg?: string
    title: string
}

interface Props {
    className?: string;
    iconData: IIconData
}

const HomeCard: FunctionComponent<Props> = ({ className, iconData: icon }) => {
    return (
        <Link to={icon.linkTo}>
            <motion.div whileHover={{ scale: 1.02 }} style={{ backgroundColor: icon.bg }} key={icon.order} className={`${className} h-30 relative shadow-lg rounded-3xl px-7 pt-3 pb-6 aspect-square overflow-hidden flex items-center justify-center`}>
                <img
                    className={`aspect-square first-letter:w-full h-full object-contain`}
                    src={icon.iconPath}
                    alt="" />
                <span className="text-xs text-nowrap font-semibold absolute bottom-0 -translate-y-2/3 z-1">{icon.title}</span>
                <motion.div initial={{ opacity: 0 }} transition={{ duration: 0.1 }} whileTap={{ opacity: 0.3 }} className="h-full bg-white w-full absolute top-0 rounded-3xl"></motion.div>
            </motion.div>
        </Link>
    );
};

export default HomeCard;