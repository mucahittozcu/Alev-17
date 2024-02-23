import { useState, useRef} from "react";
import Fire from "./components/Fire";
import Torch from "./components/Torch";
import runBackgroundEffects from "./utilities/runBackgroundEffects";
import "./styles.css";

export default function App() {
  const [torchEquipped, setTorchEquipped] = useState(false);
  const [woodKindling, setWoodKindling] = useState(false);
  const [woodOnFire, setWoodOnFire] = useState(false);

  /*----- ❌ ⬇️ Aşağıdaki kodlar hakkında endişelenmenize gerek yok! ❌ ⬇️️ ️----------- */

  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
  const kindleClass = woodKindling && !woodOnFire && "kindle";

  runBackgroundEffects(
    torchEquipped,
    woodOnFire,
    setWoodKindling,
    setWoodOnFire,
    setCursorPosition
  );

  let torchStyle = {
    position: "absolute",
    left: cursorPosition.x - 10,
    top: cursorPosition.y - 60
  };
  /*----------------------------------------------------------------- */

  /* Challenge:

	Kullanıcının meşaleyi alıp odunları yakmak için kullanabilmesi gerekiyor. Göreviniz aşağıdakileri yapmalarına sağlamaktır:  
  
      1. TorchEquipped state'i, kullanıcının mouse tuşuna bastığı anda ve "torch-container" div'inin içinde herhangi bir yerdeyken true olarak ayarlanmalıdır (satır 53). 
      
      2. Kullanıcının mouse tuşu yukarıdayken torchEquipped state false olarak ayarlanmalı ve imleçleri "wrapper" div'inin içinde herhangi bir yerdedir (satır 51).
      
      3. Aşağıdaki koşulların *hepsi* gerçekleştiğinde woodKindling state'i true olarak belirlenmelidir : 
          - torchEquipped true  ise
          - Kullanıcının imleci "wood-container" div'ine girdi (satır 60)
        
      4. Aşağıdaki koşulların *hepsi* karşılandığında woodOnFire state true olarak ayarlanmalıdır:
          - torchEquipped true ise
          - woodKindling true ise
          - Kullanıcının imleci "wood-container" div'inden ayrıldı (satır 60) 
  */
   const handleMouseDown = () => {
     setTorchEquipped(true);
    }
    
 const handleMouseUp = () => {
  if(torchEquipped){
    setTorchEquipped(false)
  }
 }

 const handleMouseEnter = () => {
  if (torchEquipped) {
    setWoodKindling(true);
  }
}

const handleMouseLeave = () => {
  if (torchEquipped && woodKindling) {
    setWoodOnFire(true);
  }
}
const handleDrop = (e) => {
  e.preventDefault()
  setTorchEquipped(false)
}

  return (
    <div 
    onMouseUp={handleMouseUp} 
    className={`wrapper ${torchEquipped && "relative no-cursor"}`}>

      <div className={`game-area ${!torchEquipped && "relative"}`}>

        <div
        onMouseDown={handleMouseDown}
        onDrop={handleDrop}
         onClick={() => setTorchEquipped((pre) => !pre)}
          className={`torch-container ${torchEquipped && "torch-equipped"}`}
          style={torchEquipped ? torchStyle : null}
        >
          <Torch />
        </div>

        <div 
        onMouseEnter={handleMouseEnter}
         onMouseMove={handleMouseLeave}
          className={`wood-container ${kindleClass}`}>
          🪵
          <Fire woodOnFire={woodOnFire}  />
        </div>
      </div>
    </div>
  );
}



// import { useState, useRef} from "react";
// import Fire from "./components/Fire";
// import Torch from "./components/Torch";
// import runBackgroundEffects from "./utilities/runBackgroundEffects";
// import "./styles.css";

// export default function App() {
//   const [torchEquipped, setTorchEquipped] = useState(false);
//   const [woodKindling, setWoodKindling] = useState(false);
//   const [woodOnFire, setWoodOnFire] = useState(false);

//   /*----- ❌ ⬇️ Aşağıdaki kodlar hakkında endişelenmenize gerek yok! ❌ ⬇️️ ️----------- */
// const woodRef = useRef(null)
//   const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });
//   const kindleClass = woodKindling && !woodOnFire && "kindle";

//   runBackgroundEffects(
//     torchEquipped,
//     woodOnFire,
//     setWoodKindling,
//     setWoodOnFire,
//     setCursorPosition
//   );

//   let torchStyle = {
//     position: "absolute",
//     left: cursorPosition.x - 10,
//     top: cursorPosition.y - 60
//   };
//   /*----------------------------------------------------------------- */

//   /* Challenge:

// 	Kullanıcının meşaleyi alıp odunları yakmak için kullanabilmesi gerekiyor. Göreviniz aşağıdakileri yapmalarına sağlamaktır:  
  
//       1. TorchEquipped state'i, kullanıcının mouse tuşuna bastığı anda ve "torch-container" div'inin içinde herhangi bir yerdeyken true olarak ayarlanmalıdır (satır 53). 
      
//       2. Kullanıcının mouse tuşu yukarıdayken torchEquipped state false olarak ayarlanmalı ve imleçleri "wrapper" div'inin içinde herhangi bir yerdedir (satır 51).
      
//       3. Aşağıdaki koşulların *hepsi* gerçekleştiğinde woodKindling state'i true olarak belirlenmelidir : 
//           - torchEquipped true  ise
//           - Kullanıcının imleci "wood-container" div'ine girdi (satır 60)
        
//       4. Aşağıdaki koşulların *hepsi* karşılandığında woodOnFire state true olarak ayarlanmalıdır:
//           - torchEquipped true ise
//           - woodKindling true ise
//           - Kullanıcının imleci "wood-container" div'inden ayrıldı (satır 60) 
//   */
//    const handleMouseDown = () => {
//      setTorchEquipped(true);
//     };
//  const handleMouseUp = () => {
//   if(torchEquipped){
//     setTorchEquipped(false)
//   }
//  }

//  const handleMouseEnter = () => {
//   if (torchEquipped) {
//     setWoodKindling(true);
//   }
// }

// const handleMouseLeave = () => {
//   if (torchEquipped && woodKindling) {
//     setWoodOnFire(true);
//   }
// }
//   return (
//     <div onMouseUp={handleMouseUp} className={`wrapper ${torchEquipped && "relative no-cursor"}`}>
//       <div className={`game-area ${!torchEquipped && "relative"}`}>
//         <div
//         onDragStart={handleMouseDown}
//         draggable={!woodOnFire}
//          onClick={() => setTorchEquipped((pre) => !pre)}
//           className={`torch-container ${torchEquipped && "torch-equipped"}`}
//           style={torchEquipped ? torchStyle : null}
//         >
//           <Torch />
//         </div>

//         <div ref={woodRef} onDragEnter={handleMouseEnter} onDragLeave={handleMouseLeave} className={`wood-container ${kindleClass}`}>
//           🪵
//           <Fire woodOnFire={woodOnFire}  />
//         </div>
//       </div>
//     </div>
//   );
// }
