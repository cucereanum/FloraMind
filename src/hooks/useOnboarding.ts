import { useCallback, useState } from 'react';

import { getOnboardingSeen, setOnboardingSeen } from '../storage/settings';

export function useOnboarding() {
  const [seen, setSeen] = useState(getOnboardingSeen());

  const complete = useCallback(() => {
    setOnboardingSeen(true);
    setSeen(true);
  }, []);

  return { seen, complete };
}
