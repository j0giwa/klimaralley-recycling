import ProgressBar from 'react-bootstrap/ProgressBar';

function Footer() {
  return (
    <ProgressBar className='mt-5' >
      <ProgressBar animated striped variant="success" now={35} key={1} />
      <ProgressBar animated striped variant="danger" now={10} key={3} />
    </ProgressBar>
  );
}

export default Footer;