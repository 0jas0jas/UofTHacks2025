import React from 'react';
import GetAnalysis from '@/components/getAnal';
import { useSearchParams } from 'next/navigation';

const AnalysisPage: React.FC = () => {
  const searchParams = useSearchParams();
  const text = searchParams.get('text') || '';

  return (
    <div>
      <GetAnalysis code={text} />
    </div>
  );
};

export default AnalysisPage;