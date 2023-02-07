import { Container } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/Posts/PostDetails/PostDetails";
import { useTypedSelector } from "./redux/store/store";

const App = () => {
  const user = useTypedSelector((state) => state.token.user);

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/react-mern-memory/" element={<Navigate to={"/react-mern-memory/posts"} />} />
        <Route path="/react-mern-memory/posts" element={<Home />} />
        <Route path="/react-mern-memory/posts/:id" element={<PostDetails />} />
        <Route
          path="/react-mern-memory/auth"
          element={user ? <Navigate to={"/react-mern-memory/posts"} /> : <Auth />}
        />
      </Routes>
    </Container>
  );
};

export default App;
