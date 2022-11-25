import MoonLoader from "react-spinners/MoonLoader";

const Spinner = props => {
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
     return (
       <div style={style}>
         <MoonLoader color={"#2074d4"}/>
         <p style={{color: "#2074d4"}}>Loading ...</p>
       </div>
     );
   };

export default Spinner