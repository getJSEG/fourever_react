import { Routes, Route } from 'react-router-dom'

import './static/css/components/common/UIStyle.css'
import './static/css/main.css';
import './static/css/components/common/button.css'

// //Routes
import Login from "./components/Login.js";
import DashBoardPage from './components/dashboard/DashBoardPage.js';
import InventoryPage from './components/inventory/InventoryPage.js';
import DetailedProductPage from './components/product/DetailedProductPage.js';
import CreateProduct from './components/createProduct/CreateProduct.js';
import VariantForm from './components/product/VariantForm.js';
import PointOfSalesPage from './components/pointofsales/PointOfSalesPage.js';
import ReceiptPage from './components/pointofsales/ReceiptPage.js';
import PrintReceipt from './components/pointofsales/components/receipt/PrintReceipt.js';

import LocationSettings from './components/settings/LocationSettings.js';


import Menu from './components/settings/Menu.js';
// import DashBoardPage from "./pages/DashBoardPage/DashBoardPage.js";
import Layout from './components/Layout.js';

// import PointOfSalesPage from "./pages/PointOfSalesPage/PointOfSalesPage.js";
// import Menu from "./pages/Menu";
// import LocationSettings from "./components/settings/LocationSettings";
// import InventoryPage from "./pages/InventoryPage/InventoryPage.js";
// import DetailedProductPage from "./pages/DetailedProductPage/DetailedProductPage.js";
// import ProductCreationPage from "./pages/ProductCreationPage/ProductCreationPage.js";
// import ReceiptPage from "./pages/ReceiptPage/ReceiptPage.js";
// import Layout from "./components/Layout.js";


import RequireAuth from "./features/auth/RequireAuth.js";
import PersistLogin from './features/auth/PersistLogin.js';

// import BarcodeGenerator from "./components/BarcodeGenerator"; 
// import { Authenticate } from "./actions/auth.js";
// import PrivateRoute from "./hocs/PrivateRoute";
// import RoutesIndex from "./RoutesIndex.js";
//redux
// import  { Provider } from 'react-redux';

function App() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
  
          {/* protected routes */}
          <Route element={<PersistLogin />}>
            {/* Route Below dashboard */}
            <Route element={<RequireAuth />}> 
                <Route path="dashboard" element={<DashBoardPage />} />
            </Route>

            <Route element={<RequireAuth />}> 
                <Route path="inventory" element={<InventoryPage />} />
            </Route>

            <Route element={<RequireAuth />}> 
                <Route path="product/:id" element={<DetailedProductPage />} />
            </Route>

            <Route element={<RequireAuth />}> 
                <Route path="create-product" element={<CreateProduct />} />
            </Route>
           
            <Route element={<RequireAuth />}> 
                <Route path="create-variant" element={<VariantForm />} />
            </Route>

            <Route element={<RequireAuth />}> 
                <Route path="point-of-sales" element={<PointOfSalesPage />} />
            </Route>

            <Route element={<RequireAuth />}> 
                <Route path="receipt" element={<ReceiptPage />} />
            </Route>

            <Route element={<RequireAuth />}> 
                <Route path="print-receipt" element={<PrintReceipt />} />
            </Route>

            {/* Route Below Menu */}
            <Route element={<RequireAuth />}>
                <Route path="menu" element={ <Menu /> } />
            </Route>

            {/* <Route element={<RequireAuth />}>
                <Route path="location" element={ <LocationSettings /> } />
            </Route> */}

          </Route>


  
        </Route>
      </Routes>
    )
  }
  
  export default App;

// function App() {

//     return(
//         <Routes>
//             <Route path='/' element={ Layout }>
//                 {/* Public Route */}
//                 <Route exact path="/login" element={ <Login /> } />

//                 {/* Protected Route */}
//                 <Route element={ <RequireAuth /> }>
//                     <Route exact path='/dashboard' element={ <DashBoardPage /> } /> 
//                 </Route>
//             </Route>
//             {/* <Route element={ <PrivateRoute /> } > 
//                 <Route exact path='/dashboard' element={ <DashBoardPage /> } /> 
//                 <Route exact path='/inventory' element={ <InventoryPage /> } /> 
//                 <Route exact path='/product/:id/' element={<DetailedProductPage /> } />
//                 <Route exact path='/pos' element={ <PointOfSalesPage /> } /> 
//                 <Route exact path='/receipt' element={ <ReceiptPage /> } />
//                 <Route exact path="/menu" element={<Menu /> } />
//                 <Route exact path="/location-settings" element={<LocationSettings /> } />
//                 <Route exact path="/createProduct" element={<ProductCreationPage /> } />
//                 <Route exact path="/" element={ <DashBoardPage /> } /> 
//             </Route> */}
//         </Routes>
//     )
    
// }

// export default App
