import {useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import coverImage from './assets/phantom-cover-image.jpg';
import HTMLFlipBook from 'react-pageflip';
import Chandelier from './assets/chandelier.jpeg'
import pentheus from "./assets/pentheus.jpg"
import think from "./assets/think-of-me.jpg"
import sisi from "./assets/sisi.jpg"
import muto from "./assets/il-muto.jpg"
import red from "./assets/red.jpg"
import masq from "./assets/masq.jpg"
import death from "./assets/red-death.jpg"
import noReturn from "./assets/no-return.png"
import './App.css'

const pages = [
  { type: "text", heading: "Phantom of the Opera", image: Chandelier, content: "", bulletPoints:["A 2004 film starring Emmy Rossum and Gerard Butler",'Directed by Joel Schumacher', "Based on the musical by Andrew Lloyd Webber, adapted from novel of the same name",'Set in Paris, France 1870',"Costumes designed by Alexandra Byrne"]},
  { type: "text", image: pentheus, heading: "Actor In Costume", content: "- Aiofe Monks\n\nCostumes blur the line between the actors,\n the characters they play, and the audience.\n\n", bulletPoints:["“[Pentheus’] plight suggests that costume does far more than decorate the surface of the body; rather, that it comes with risks and possibilities for the bodies and psyches of actor and audience alike.”"]},
  { type: "image", content: [think,sisi]},
  {type:"text", heading:"Think of Me",content:"\n\n\nFor the first time, Christine is the main star of the show.\nThe outfit is a visual cue for the audience. She is no longer just a side actress. \n\nMonks writes that costumes and the actor’s body become\nindistinguishable in the audience’s experience of a performance.", bulletPoints:["The outfit is a visual cue for the audience.","It transforms the audience's and Christine's perception of her character.","Fun fact: The dress is based off a painting of Empress Sisi of Austria"]},
  // { type: "text", content: "Another insightful page with text!" },
  { type: "text", heading: "Truth and Performance", image: muto, bulletPoints: ["Costumes reflect the story, as well as the actors.", "Costume designers create costumes with the actors in mind, and the directors choose who wears each costume."], content: "(Il Muto)\nChristine crossdresses, playing a man who is the secret lover of Carlotta's character.\nMuch like in the Bacchae, the audience likely has \"double vision\" from seeing an actor dressed up, acting like the opposite gender.\n\nOnce again, Christine transforms when on stage.\n\nCarlotta on the other hand, being the diva, is stil dramatic as always.\n" },
  {type: "text", heading: "Off Stage", image: red,content: "" },
  {type: "text", heading: "Masquerade", image: masq,content: "Dressing up is fun!", bulletPoints:["Entire song about how you can become someone else and hide from the world, just by wearing a mask", "Masking is celebrated here, but scorned when the Phantom does it.\nWhat costumes are seen acceptable in society?"] },
  {type: "text", heading: "", image: death, content: "Projects power and confidence.", bulletPoints:["An even bigger mask for the man that always wears a mask"] },
  { type: "text", heading: "Point of No Return", image: noReturn, content: "\n\n\nAn uncomfortable performance.\nDancing with a real criminal.\nRisky for both audience and actors alike.\n\n", bulletPoints:["Forced to perform as the lead, to act in this role, wearing this costume.", "Risky, as there's no telling what will happen.", "\nChristine is placed in a position similar to Pentheus."]}
];


function Page({ pagesArray, arrayIndex }) {
  const page = pagesArray[arrayIndex];

  if (!page) return <div className="bookPage">Page not found</div>;

  if (page.type === "image") {
    return (
      <div className="bookPage">
        {/* <img src={page.content} alt="Page Image" className="bookImage"/> */}
        {page.type === "image" && Array.isArray(page.content) ? (
        page.content.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Image ${index}`} className="bookImage"/>
        ))
      ) : (
        page.image && <img src={page.image} alt="Single Image" className="bookImage"/>
      )}
      </div>
    );
  } else {
    return (
      <div className="bookPage">
        <h1>{page.heading}</h1> 
        {page.bulletPoints && (
        <ul>
        {page.bulletPoints.map((point, index) => (
          <p key={index}>• {point}</p>
        ))}
      </ul>
        )}
        {/* <p>{page.content}</p> */}
        {page.content.split("\n").map((line, index) => (
      <span key={index}>{line}<br/></span>
  ))}
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
  const totalPages = 10; 

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
            <div className= "bookCover"></div>
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
