import React from 'react';
import GetAnalysis from '@/components/getAnal';

const AnalysisPage: React.FC = () => {
  return (
    <div>
      <h1>Analysis Page</h1>
      <GetAnalysis code={'INT x = 5'} />
    </div>
  );
};

export default AnalysisPage;