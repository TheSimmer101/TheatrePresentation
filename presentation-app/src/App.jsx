import {useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import coverImage from './assets/phantom-cover-image.jpg';
import HTMLFlipBook from 'react-pageflip';
import Chandelier from './assets/chandelier.jpeg'
import pentheus from "./assets/pentheus.jpg"
import './App.css'

const pages = [
  { type: "text", heading: "Phantom of the Opera", image: Chandelier, content: "", bulletPoints:["A 2004 film starring Emmy Rossum and Gerard Butler",'Directed by Joel Schumacher', "Based on the musical by Andrew Lloyd Webber, adapted from novel of the same name",'Set in Paris, France 1870',"Costumes designed by Alexandra Byrne"]},
  { type: "text", image: pentheus, heading: "Actor In Costume", content: "- Aiofe Monks", bulletPoints:["“[Pentheus’] plight suggests that costume does far more than decorate the surface of the body; rather, that it comes with risks and possibilities for the bodies and psyches of actor and audience alike.”"]},
  { type: "image", content: coverImage},
  // { type: "text", content: "Another insightful page with text!" },
  // { type: "image", content: "./assets/another-image.jpg" }
];
// function Page({type, content,heading, arrayIndex }){
//   const p = pages[arrayIndex]
//   if (p.type === "image") {
//     return (
//       <div className="bookPage">
//         <img src={content} alt="Page Image"  className="bookImage"/>
//       </div>
//     );
//   } else {
//     return (
//       <div className="bookPage">
//         <h2>{heading}</h2>
//         <p>{content}</p>
//       </div>
//     );
//   }
// };

function Page({ pagesArray, arrayIndex }) {
  const page = pagesArray[arrayIndex];

  if (!page) return <div className="bookPage">Page not found</div>;

  if (page.type === "image") {
    return (
      <div className="bookPage">
        <img src={page.content} alt="Page Image" className="bookImage"/>
      </div>
    );
  } else {
    return (
      <div className="bookPage">
        <h1>{page.heading}</h1> 
        {page.bulletPoints && (
        <ul>
        {page.bulletPoints.map((point, index) => (
          <li key={index}>• {point}</li>
        ))}
      </ul>
        )}
        <p>{page.content}</p>
        {page.image && (
      <img src={page.image} alt="Additional Page Image" className="bookImage"/>
    )}
      </div>
    );
  }
}



function App() {
  
  const [count, setCount] = useState(0)
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6; // Update this as needed

  const nextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const onPageChange = (e) => {
    setCurrentPage(e.data + 1);
    setActiveIndex(Math.max(0, e.data - 2)); // Adjust index
  };

  return (
    <>
    <div className = "container">
    <div className = "book-container">
     <HTMLFlipBook width={600} height={800} showCover={true} usePortrait={false} ref={bookRef}
          onFlip={onPageChange}>

            <div className = "bookCover">
              <h1>Power Dynamics & Costume</h1>
              <img src = {coverImage} className = "frontImage"/>
              <h2>Rachel Briskman</h2>
              
            </div>
            {/* <Page pagesArray={pages} arrayIndex={0} /> */}
           
            {/* <div className="bookPage"><Page pagesArray={pages} arrayIndex={currentPage-2} /></div> */}
            {pages.map((page, index) => (
    <div className = "bookPage"><Page key={index} pagesArray={pages} arrayIndex={index} /></div>
  ))}
            <div className = "bookCover"></div>
            {/* <div className= "bookCover"></div> */}
        </HTMLFlipBook>
      </div>
      <div className = "pageButtons">
        <button onClick={prevPage}>Previous</button>
        <span> Page {currentPage} / {totalPages} &nbsp;</span>
        <button onClick={nextPage}>Next</button>
      </div>
      </div>
    </>
  )
}

export default App
