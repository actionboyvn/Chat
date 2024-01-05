import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useNavigate, useLocation } from "react-router-dom";

const SwipeableRoutes = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const routes = ["/chat", "/image"];
  const currentIndex = routes.findIndex((path) => path === location.pathname);

  const swipeDirection = (deltaX) => {
    return deltaX > 0 ? 1 : -1;
  };

  const onSwiped = (deltaX) => {
    const direction = swipeDirection(deltaX);
    if (deltaX > 0 && currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    } else if (deltaX < 0 && currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
    return direction;
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => onSwiped(-1),
    onSwipedRight: () => onSwiped(1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const swipeVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
    }),
  };

  return (
    <div {...handlers}>
      <AnimatePresence custom={swipeDirection}>
        <motion.div
          key={location.pathname}
          custom={swipeDirection}
          variants={swipeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 50 },
            opacity: { duration: 0.2 },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SwipeableRoutes;
