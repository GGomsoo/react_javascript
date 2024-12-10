import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice.js';
import { useDispatch } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const handleToggle = () => {
    dispatch(uiActions.toggle())
  };
  
  return (
    <button className={classes.button} onClick={handleToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
