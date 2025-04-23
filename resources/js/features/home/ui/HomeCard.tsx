import { motion } from 'motion/react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router';
import { IIconData } from '../model/types';

interface Props {
    className?: string;
    iconData: IIconData
    isLight?: boolean | undefined
}



const HomeCard: FunctionComponent<Props> = ({ className, iconData: icon, isLight }) => {

    // если есть прямая ссылка, которая ведет за пределы reactRouter
    if (icon.straightLink) {
        return (
            <a href={icon.straightLink} target="_blank" rel="noopener noreferrer">
                <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    style={{ backgroundColor: isLight ? icon.bg : "#292429" }} 
                    key={icon.order} 
                    className={`${className} ${!isLight && "!shadow-[10px_10px_17px_5px_rgba(149,22,19,0.85),-9px_-13px_43px_11px_rgba(0,0,0,0.75)]"} h-30 relative shadow-lg rounded-3xl px-7 pt-3 pb-6 aspect-square overflow-hidden flex items-center justify-center`}>
                    <img
                        className={`aspect-square first-letter:w-full h-full object-contain`}
                        // тема вытаскивается в родителе, чтобы при первичной загрузке не было скачков картинок, сделана пустая png, а после рендера уже подставляется нормальна
                        src={isLight === undefined ? "/main_logos/bg_transparent.png" : (isLight ? icon.iconPath : icon.iconPath.replace("light", "dark")) }
                        alt="" />
                    <span className={`${!isLight && "text-orange-600"} text-xs text-nowrap font-semibold absolute bottom-0 -translate-y-2/3 z-1`}>{icon.title}</span>
                    <motion.div initial={{ opacity: 0 }} transition={{ duration: 0.1 }} whileTap={{ opacity: 0.3 }} className="h-full bg-white w-full absolute top-0 rounded-3xl"></motion.div>
                </motion.div>
            </a>
        )
    } else {
        return (
            <Link to={icon.reactLink}>
                <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    style={{ backgroundColor: isLight ? icon.bg : "#292429" }} 
                    key={icon.order} 
                    className={`${className} ${!isLight && "!shadow-[10px_10px_17px_5px_rgba(149,22,19,0.85),-9px_-13px_43px_11px_rgba(0,0,0,0.75)]"} h-30 relative shadow-lg rounded-3xl px-7 pt-3 pb-6 aspect-square overflow-hidden flex items-center justify-center`}>
                    <img
                        className={`aspect-square first-letter:w-full h-full object-contain`}
                        src={isLight === undefined ? "/main_logos/bg_transparent.png" : (isLight ? icon.iconPath : icon.iconPath.replace("light", "dark")) }
                        alt="" />
                    <span className={`${!isLight && "text-orange-600"} text-xs text-nowrap font-semibold absolute bottom-0 -translate-y-2/3 z-1`}>{icon.title}</span>
                    <motion.div initial={{ opacity: 0 }} transition={{ duration: 0.1 }} whileTap={{ opacity: 0.3 }} className="h-full bg-white w-full absolute top-0 rounded-3xl"></motion.div>
                </motion.div>
            </Link>
        )
    }



};

export default HomeCard;