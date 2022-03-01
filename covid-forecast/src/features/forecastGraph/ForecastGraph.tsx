import React from 'react';
import { shallowEqual } from 'react-redux';
import { ComposedChart, Scatter } from 'recharts';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { selectCasesFilter, selectCasesForecastFilter, selectDeathsFilter, selectDeathsForecastFilter } from '../filter/filterSlice';
import { DailyPoint, selectForecastAsArray } from './forecastSlice';



export default function ForecastGraph() {  
    const data = useAppSelector(selectForecastAsArray);
    const showCases = useAppSelector(selectCasesFilter, shallowEqual);
    const showPredictedCases = useAppSelector(selectCasesForecastFilter, shallowEqual);
    const showDeaths = useAppSelector(selectDeathsFilter, shallowEqual);
    const showPredictedDeaths = useAppSelector(selectDeathsForecastFilter, shallowEqual);
    console.log(showCases)
      return (
        <ResponsiveContainer width="50%" aspect={1.5} >
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" type= "category" label={{value: "Date", offset: 0, position: 'bottom'}} />
            <YAxis label={{value:"Number of Cases or Deaths per day", angle:-90, position:'insideBottomLeft'}}/>
            <Tooltip  />
            <Legend  verticalAlign="top"/>
            
            {showCases &&
             <Line type= "linear" dataKey="cases" dot={false} activeDot={true} stroke="#7a5195" />
              
            }
            {showPredictedCases &&
              <Line type= "linear" dataKey="predictedCases" dot={false} activeDot={true} stroke="#003f5c" />
            }
            {showDeaths &&
              <Line type= "linear" dataKey="deaths" dot={false} activeDot={true} stroke="#ffa600"  />
              
            }
            {showPredictedDeaths &&
              <Line type= "linear" dataKey="predictedDeaths" dot={false} activeDot={true} stroke="#ef5675"  />
            }
            </ComposedChart>
        </ResponsiveContainer>
      );
    }