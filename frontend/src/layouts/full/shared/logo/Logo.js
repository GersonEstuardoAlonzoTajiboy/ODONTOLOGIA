import { Link } from 'react-router-dom';
import LogoDark from '../../../../assets/images/logos/IMG-20240709-WA0006.jpg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '50px',
  width: '220px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled>
      <img src={LogoDark} alt="Logo" height={50} width={220} />
    </LinkStyled>
  );
};

export default Logo;