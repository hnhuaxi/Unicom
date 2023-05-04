import Home from "../pages/Home";
import Agree from "../pages/Home/Children/Agree";
import Declare from "../pages/Home/Children/Declare/Declare";

const routers = [
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
  {
    path: "/index.html",
    exact: true,
    element: <Home />,
  }, {
    path: "/agree",
    element: <Agree />
  }, {
    path: "/declare",
    element: <Declare />
  }
]

export default routers