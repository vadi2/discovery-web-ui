import React from 'react';

import { useRecoilValue } from 'recoil';
import {
  allRecordIds, groupedRecordIdsState, resourcesState, patientRecord,
} from '../../recoil';
import PersistentDrawerRight from '../ContentPanel/Drawer';
import RecordCard from '../cards/RecordCard';

const CardList = ({
  recordIds, records, patient,
}) => recordIds.map((uuid) => (
  <RecordCard
    key={`record-card-${uuid}`}
    recordId={uuid}
    records={records}
    patient={patient}
  />
));

const Collections = () => {
  const recordIds = useRecoilValue(allRecordIds);
  const groupedRecordIds = useRecoilValue(groupedRecordIdsState);
  const resources = useRecoilValue(resourcesState);
  const patient = useRecoilValue(patientRecord);

  const {
    loading, records,
  } = resources;

  return (
    <div>
      <h3>COLLECTIONS</h3>
      <div>
        loading:
        { String(loading) }
      </div>
      <div className="collections-content">
        <hr />
        <div>
          <h4>groupedRecordIds:</h4>
          <pre>
            { JSON.stringify(groupedRecordIds, null, '  ') }
          </pre>
        </div>
        <hr />
        <div style={{ backgroundColor: '#ff9' }}>
          <h4>patient:</h4>
          <pre>
            { JSON.stringify(patient, null, '  ') }
          </pre>
        </div>
        <hr />
        <div>
          <h4>records:</h4>
          <pre>
            { JSON.stringify(records, null, '  ') }
          </pre>
        </div>
      </div>
      <PersistentDrawerRight>
        <div className="card-list">
          <CardList
            recordIds={recordIds}
            records={records}
            patient={patient}
          />
        </div>
      </PersistentDrawerRight>
    </div>
  );
};

export default React.memo(Collections);
