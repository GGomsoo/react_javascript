import { motion} from "framer-motion"

// badge의 값이 변경될 때마다 애니메이션 효과를 준다
export default function Badge({ caption }) {
  return (
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.3 }}
      className="badge"
    >
      {caption}
    </motion.span>
  );
}
