export const fadeIn = (direction, delay, duration) => {
  return {
    hidden: {
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      opacity: 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: duration ? duration : 1.2,
        delay: delay,
      },
    },
    exit: {
      y: direction === 'up' ? -80 : direction === 'down' ? -320 : 0,
      opacity: 0,
      x: direction === 'left' ? 1000 : direction === 'right' ? -320 : 0,
    },
  };
};

export const slideIn = (direction) => {
  return {
    hidden: {
      x: direction === 'left' ? '-100vw' : direction === 'right' ? '200vw' : 0,
    },
    show: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    exit: {
      x: direction === 'left' ? '-100vw' : direction === 'right' ? '200vw' : 0,
    },
  };
};


export const dropdownAnimation = {
  closed: {
    scale: 0,
    opacity: 0,
  },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,

    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
}

export const modaleDropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      mass: 1,
      damping: 30,
      stiffness: 500,
    }
  },
  exit: {
    y: '-100vh',
    opacity: 0,
  }
}

export const pageTransition = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'tween',
    }
  },
  exit: {
    opacity: 0
  }
}