import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{minHeight:'100vh'}} className="flex center">
      <div className="text-center">
        <h1 style={{fontSize:48, margin:0}}>404</h1>
        <p className="hint" style={{fontSize:18}}>Oops! Page not found</p>
        <a href="/" className="btn btn-primary" style={{marginTop:16}}>Home</a>
      </div>
    </div>
  );
};

export default NotFound;
