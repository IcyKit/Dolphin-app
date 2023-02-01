import { useDispatch, useSelector } from 'react-redux';
import ActualItem from '../ActualItem';
import './Actual.css';
import { useEffect } from 'react';
import { fetchActual } from '../../store/slices/recommends';

const Actual = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchActual());
  }, []);

  const { actual, isActualLoading } = useSelector((state) => state.recommends);

  if (isActualLoading) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <div className="actual aside__card card-shadow">
      <h3>Актуальные темы</h3>
      <div className="actual__themes">
        {actual.map((theme) => (
          <ActualItem title={theme.name} messages={theme.count} />
        ))}
      </div>
    </div>
  );
};

export default Actual;
