import React, { FunctionComponent } from 'react';

interface Props {
  className?: string;
  
}

const RalSettings: FunctionComponent<Props> = ({ className }) => {
  return (
    <div className={`{className} `}>
    </div>
  );
};

export default RalSettings;