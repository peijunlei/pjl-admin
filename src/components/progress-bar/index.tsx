import { useEffect } from 'react';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });
export default function ProgressBar() {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    }
  }, []);
  return null;
}
