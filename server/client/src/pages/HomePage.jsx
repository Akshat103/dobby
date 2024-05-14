import FolderCards from '../components/FolderCards';
import Hero from '../components/Hero';
import CreateNewFolder from '../components/CreateNewFolder';

const HomePage = () => {
  return (
    <>
      <Hero />
      <CreateNewFolder/>
      <FolderCards />
    </>
  );
};
export default HomePage;
