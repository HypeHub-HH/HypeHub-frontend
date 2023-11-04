import * as React from 'react';
import { OutfitApi } from '../../api/OutfitApi.js';
import CustomButton from '../../components/ui/CustomButton.jsx';
import { Box, Container } from '@mui/material';
import LikesPopUp from '../../components/layout/LikesPopUp.jsx';
import Post from './Post.jsx';

const LatestOutfits = () => {
  const [openLikesPopUp, setOpenLikesPopUp] = React.useState(false);
  const [likes, setLikes] = React.useState(null);
  const [currPage, setCurrPage] = React.useState(1);
  const [latestOutfits, setLatestOutfits] = React.useState([]);
  const [wasLastList, setWasLastList] = React.useState(false);

  const axiosLatestOutfits = async () => {
    try {
      const response = await OutfitApi.getLatestOutfitsAsync(currPage, 10);
      if (!response.data.hasNext) {
        setWasLastList(true);
      }
      setLatestOutfits((prevOutfits) => [...prevOutfits, ...response.data.entities]);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (!wasLastList) axiosLatestOutfits();
  }, [currPage]);

  return (
    <Box>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: '2%',
          paddingTop: '1%',
        }}
      >
        {likes && (
          <LikesPopUp openLikesPopUp={openLikesPopUp} setOpenLikesPopUp={setOpenLikesPopUp} likes={likes} setLikes={setLikes} />
        )}
        {latestOutfits !== [] &&
          latestOutfits.map((outfit) => (
            <Post key={outfit.id} outfit={outfit} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />
          ))}
        {!wasLastList && (
          <CustomButton
            backgroundColor="#CBD5E1"
            color="black"
            buttonText="Load more"
            onClick={() => setCurrPage(currPage + 1)}
          />
        )}
      </Container>
    </Box>
  );
};

export default LatestOutfits;

// const LatestOutfits = () => {
//   const [openLikesPopUp, setOpenLikesPopUp] = React.useState(false);
//   const [likes, setLikes] = React.useState(null);
//   const [currPage, setCurrPage] = React.useState(1);
//   const [latestOutfits, setLatestOutfits] = React.useState([]);
//   const [wasLastList, setWasLastList] = React.useState(false);

//   const axiosLatestOutfits = async () => {
//     try {
//       const response = await OutfitApi.getLatestOutfitsAsync(currPage, 10);
//       if (!response.data.hasNext) {
//         setWasLastList(true);
//       }
//       setLatestOutfits(latestOutfits, ...response.data.entities);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   React.useEffect(() => {
//     const axiosLatestOutfits2 = async () => {
//       try {
//         const response = await OutfitApi.getLatestOutfitsAsync(currPage, 10);
//         if (!response.data.hasNext) {
//           setWasLastList(true);
//         }
//         setLatestOutfits(response.data.entities);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     axiosLatestOutfits2();
//   }, []);

//   return (
//     <Box>
//       <Container
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           paddingBottom: '2%',
//           paddingTop: '1%',
//         }}
//       >
//         {likes && (
//           <LikesPopUp openLikesPopUp={openLikesPopUp} setOpenLikesPopUp={setOpenLikesPopUp} likes={likes} setLikes={setLikes} />
//         )}
//         {latestOutfits &&
//           latestOutfits.map((outfit) => (
//             <Post key={outfit.id} outfit={outfit} setOpenLikesPopUp={setOpenLikesPopUp} setLikes={setLikes} />
//           ))}
//         {!wasLastList && (
//           <CustomButton backgroundColor="#CBD5E1" color="black" buttonText="Load more" onClick={() => axiosLatestOutfits()} />
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default LatestOutfits;
