import { MouseEventHandler } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { casesFilterToggle, casesForecastFilterToggle, deathsFilterToggle, deathsForecastFilterToggle } from './filterSlice';
export default function Filter() {
    const dispatch = useAppDispatch();
    return (
        <div className="filter">
            <div className='child'>
                <label>
                    case filter
                    <input type="checkbox" className='tick' onChange={(e) => dispatch(casesFilterToggle())} />
                </label>
            </div>
            <div className="child">
                <label>
                    predicted cases filter
                    <input type="checkbox" className='child' onChange={(e) => dispatch(casesForecastFilterToggle())} />
                </label>

            </div>
            <div className="child">
                <label>
                deaths filter
                <input type="checkbox" className='tick' onClick={(e) => dispatch(deathsFilterToggle())} />
                </label>
            </div>
            <div className="child">
                <label>
                predicted deaths filter
                <input type='checkbox' className='child' onClick={(e) => dispatch(deathsForecastFilterToggle())} />
                </label>
            </div>
        </div>

    );
}