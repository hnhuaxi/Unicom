import Home from "../pages/Home";
import Agree from "../pages/Home/Children/Agree";
import Declare from "../pages/Home/Children/Declare/Declare";

const routers = [
  {
    path: "/",
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