import React from 'react';
import s from './styles.css';

const Success = () => (
  <div className={s.body}>
    <div className={s.title}>Your account is being verified…</div>
    <div className={s.text}>
      Your documents have been successfully uploaded and are being processed now.
      This may take up to 30 minutes, please be patient and do not try to
      relaunch the verification process.
    </div>
  </div>
);

export default Success;
