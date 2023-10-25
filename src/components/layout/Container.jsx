import NavbarAuthorized from './navbar/NavbarAuthorized';
import { Outlet } from 'react-router-dom';

const Containter = () => {
  return (
    <>
      <NavbarAuthorized />
      <Outlet />
    </>
  );
};
export default Containter;
