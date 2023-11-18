"use client"
import {motion} from 'framer-motion'
export default function Button(props) {
    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.05, fontWeight: "bold" }}
                whileTap={{ scale: 0.95 }}
                onClick={props.onClick}
                className={`transition duration-300 ease-in-out ${props.customClass}`}>
                {props.text}
            </motion.button>
        </div>
    );
}
motion.button

