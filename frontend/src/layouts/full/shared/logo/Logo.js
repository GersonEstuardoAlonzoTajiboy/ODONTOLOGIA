import { Link } from 'react-router-dom';
import LogoDark from '../../../../assets/images/logos/IMG-20240709-WA0006.jpg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '40px',
  width: '150px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  return (
    <LinkStyled>
      <img src={LogoDark} alt="Logo" height={40} width={150} />
    </LinkStyled>
  );
};

export default Logo;