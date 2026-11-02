import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Router link that accepts Framer Motion props (whileHover, whileTap…).
export const MotionLink = motion.create(Link)
