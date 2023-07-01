// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import ArticlesLIst from "./pages/ArticlesList";
import Article from "./pages/Article";
import NotFound from "./pages/NotFound";

//components
import Navbar from "./components/navbar";


function App() {
  return (
    <Router>
      <Navbar />
    <div className="max-w-screen-md mx-auto pt-20">
      <Routes>
        <Route path = '/' element={<Home />}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/articles-list' element={<ArticlesLIst/>}/>
        <Route path='/article/:name' element={<Article/>}/>
        <Route path="*" element={<NotFound/>}/>
    
    </Routes>

    </div>
    </Router>
  );
}

export default App;
