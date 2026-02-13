import { useEffect } from 'react';
import './App.css';
import { HashRouter, NavLink, Routes, Route, useNavigate, Outlet, useParams, useOutletContext } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/login")}>登出</button>
    </>
  )
}

const Home = () => {
  return <p>這是首頁</p>
}

const Todo = () => {
  return (
    <>
      <p>這是 Todo 頁面</p>
      <Logout />
    </>
    );
};
const Login = () => {
  return <p>這是登入頁面</p>;
};
const Register = () => {
  return <p>這是註冊頁面</p>;
};

const Post = () => {

  const data = [
    {
      id: 1,
      title: "Post1",
      content: "這是post1",
    },
    {
      id: 2,
      title: "Post2",
      content: "這是post2",
    },
    {
      id: 3,
      title: "Post3",
      content: "這是post3",
    },
  ];

  return (
    <>
      <p>這是 Post 頁面</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <NavLink to={`/post/${item.id}`}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
      <Outlet context={data}/>
    </>
  )
}
const SinglePost = () => {
  const navigate = useNavigate()
  let params = useParams();
  const { postId } = params;
  const data = useOutletContext();
  const singleData = data.find((e) => e.id === Number(postId));
  useEffect(() => {
    if (!singleData) {
      navigate("*");
    }
  }, [singleData, navigate]);

  if (!singleData) {
    return null;
  }
  return (
    <>
      <p>這是 post 細節頁面</p>
      <p>Post id: {postId}</p>
      {singleData.content}
    </>
  )
}
const NotFound = () => {
  return <p>這是 404 頁面</p>
}

function App() {
  return (
    <div className="container">
      <HashRouter>
        <div className="nav-link">
          <NavLink to="/">
            <p>回到首頁</p>
          </NavLink>
          <NavLink to="/register">
            <p>註冊頁面</p>
          </NavLink>
          <NavLink to="/login">
            <p>登入頁面</p>
          </NavLink>
          <NavLink to="/todo">
            <p>Todo 頁面</p>
          </NavLink>
          <NavLink to="/post">
            <p>Post 頁面</p>
          </NavLink>
        </div>
        {/* Routes, Route 練習區 */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='todo' element={<Todo />} />
          <Route path='post' element={<Post />}>
            <Route path=':postId' element={<SinglePost />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        {/* 練習區 */}
      </HashRouter>
    </div>
  );
}

export default App;
