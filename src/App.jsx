import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ForgotPassword from "./pages/ForgotPassword";
import Articles from "./pages/Articles";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import WriteBlog from "./pages/WriteBlog";
import SingleArticle from "./pages/SingleArticle";
import Category from "./pages/Category";
import EditArticle from "./pages/EditArticle";
import Error from "./pages/Error";
import Search from "./pages/Search";
import Aiamsrbot from "./pages/Aiamsrbot";
import About from "./pages/About";
import Call from "./pages/Call";
import ContactForm from "./pages/ContactForm";

const App = () => {
  /* 
  TODO -  Add image input in write blog component, add the image to cloud storage in firebase
  
   */

  return (
    <div>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path='/myBlogs/:userId' element={<MyBlogs />} />
            <Route path='/write' element={<WriteBlog />} />
            <Route path='/Aiamsrbot' element={<Aiamsrbot />} />
            <Route path='/Call' element={<Call />} />
          </Route>
          <Route path='/articles' element={<Articles />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path={`/category/:categoryName`} element={<Category />} />
          <Route
            path={`/category/:categoryName/:articleId`}
            element={<SingleArticle />}
          />
          <Route path={`/edit/:articleId`} element={<EditArticle />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/sign-out' element={<Logout />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/ContactForm' element={<ContactForm />} />
          <Route path='/About' element={<About />} />
         
          <Route path='/*' element={<Error />} />
        </Routes>
      </Router>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#333",
            // 363636
            color: "#fff",
            marginTop: "50px",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            // Custom toast icon style
            iconTheme: {
              primary: "green",
              secondary: "#333",
            },
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
            enter: "fade",
            exit: "fade",
          },
        }}
      />
    </div>
  );
};

export default App;
