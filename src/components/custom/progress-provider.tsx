'use client';

import { AppProgressProvider } from '@bprogress/next';

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgressProvider
      height="6px"
      color="hsl(173, 100%, 61%)"
      options={{ showSpinner: true }}
      shallowRouting
      spinnerPosition='bottom-right'
    >
      {children}
    </AppProgressProvider>
  );
};

export default ProgressProvider;
