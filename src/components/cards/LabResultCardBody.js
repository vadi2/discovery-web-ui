import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { useRecoilValue } from 'recoil';
import CardBodyField from './CardBodyField';
import TimeSeries from '../TimeSeries/index';
import { computeTimeSeriesLabResultsData } from '../../fhirUtil';
import { labResultRecords } from '../../recoil';

const useStyles = makeStyles(() => ({
  timeSeries: {
    marginTop: '20px',
  },
}));

const LabResultCardBody = ({ fieldsData }) => {
  const labResults = useRecoilValue(labResultRecords);
  const classes = useStyles();
  const valueRatioDisplay = `${fieldsData.valueRatio?.numerator?.value} / ${fieldsData.valueRatio?.denominator?.value}`;

  let valueField;
  if (fieldsData.valueQuantity) {
    const valueDisplay = `${fieldsData.valueQuantity.value.toFixed(1)} ${fieldsData.valueQuantity.unit}`;
    valueField = (
      <CardBodyField
        dependency={valueDisplay}
        label="VALUE"
        value={valueDisplay}
      />
    );
  } else if (fieldsData.component) {
    valueField = fieldsData.component.map((resource) => {
      const valueDisplay = `${resource.valueQuantity.value.toFixed(1)} ${resource.valueQuantity.code}`;
      let label;
      if (resource.code.text === 'Diastolic Blood Pressure') {
        label = 'DIASTOLIC';
      } else if (resource.code.text === 'Systolic Blood Pressure') {
        label = 'SYSTOLIC';
      } else {
        label = resource.code.text;
      }
      return (
        <CardBodyField
          key={resource.code.text}
          dependency={resource.valueQuantity.value}
          label={label}
          value={valueDisplay}
        />
      );
    });
  }

  const refRangeLabel = fieldsData.referenceRange?.[0]?.meaning?.coding?.[0]?.display || 'REFERENCE RANGE';

  const lowValue = fieldsData.referenceRange?.[0]?.low?.value;
  const lowUnits = fieldsData.referenceRange?.[0]?.low?.unit;
  const highValue = fieldsData.referenceRange?.[0]?.high?.value;
  const highUnits = fieldsData.referenceRange?.[0]?.high?.unit;

  const refRange = lowValue && lowUnits && highValue && highUnits
    ? `${lowValue + (lowUnits && lowUnits !== highUnits ? ` ${lowUnits}` : '')} - ${highValue}${highUnits ? ` ${highUnits}` : ''}`
    : fieldsData.referenceRange?.text;

  const { data, highlights } = computeTimeSeriesLabResultsData(fieldsData, labResults);

  return (
    <>
      <CardBodyField
        dependency={fieldsData.display}
        label="MEASURE"
        value={fieldsData.display}
        highlight
      />
      {valueField}
      <CardBodyField
        dependency={fieldsData.valueRatio}
        label="VALUE RATIO"
        value={valueRatioDisplay}
      />
      {/* Need to parse Reference Range per fhirUtil, but can't find example */}
      <CardBodyField
        dependency={fieldsData.referenceRange}
        label={refRangeLabel}
        value={refRange}
      />
      <CardBodyField
        dependency={fieldsData.provider}
        label="PROVIDER"
        value={fieldsData.provider}
      />
      <CardBodyField
        dependency={fieldsData.status}
        label="STATUS"
        value={fieldsData.status}
      />
      <Typography variant="timeSeries" className={classes.timeSeries}>
        {data && (
        <TimeSeries
          measure={fieldsData.display}
          data={data}
          highlights={highlights}
        />
        )}
      </Typography>
    </>
  );
};

export default LabResultCardBody;
