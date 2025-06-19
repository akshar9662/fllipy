
import { useEffect } from 'react';

const AdComponent = ({ slot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsense error:', e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-3463266713741263"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
};

export default AdComponent;
