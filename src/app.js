import { Routes, Route } from 'react-router-dom'

import './static/css/main.css';

// //Routes
import Login from "./components/Login.js";
import DashBoardPage from './components/dashboard/DashBoardPage.js';
import InventoryPage from './components/inventory/InventoryPage.js';
import DetailedProductPage from './components/product/DetailedProductPage.js';
import PointOfSalesPage from './components/pointofsales/PointOfSalesPage.js';
import ReceiptPage from './components/pointofsales/ReceiptPage.js';
import PrintReceipt from './components/pointofsales/components/receipt/PrintReceipt.js';
import Shipping from './components/shipping/Shipping.js';
import PackageDetails from './components/shipping/PackageDetails.js';

import CreateProduct from './components/createProduct/CreateProduct.js';
import CreateVariantForm from './components/variant/CreateVariantForm.js';
import VariantInformation from './components/variant/VariantInformation.js';
import LocationSettings from './components/settings/components/LocationDetails.js';


import Menu from './components/settings/Menu.js';
import Layout from './components/Layout.js';

// This is for creating deliveries shipping
import CreateShipping from './components/shipping/CreateShipping.js';

import RequireAuth from "./features/auth/RequireAuth.js";
import PersistLogin from './features/auth/PersistLogin.js';


function App() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
  
          {/* protected routes */}
            <Route element={<PersistLogin />}>
                {/* Route Below dashboard */}
                <Route element={<RequireAuth allowedRoles={["owner"]}/>}> 
                    <Route path="dashboard" element={<DashBoardPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="inventory" element={<InventoryPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="product/:id" element={<DetailedProductPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="product/create" element={<CreateProduct />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["owner", "employee"]} />}> 
                    <Route path="product/:id/variant/:varid" element={<VariantInformation />} />
                </Route>
            
                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="product/:id/variant/create" element={<CreateVariantForm />} />
                </Route>
                
                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="shipping" element={<Shipping />} />
                </Route>
                
                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="package/details" element={<PackageDetails />} />
                </Route>


                {/* this is for creating shipping custom or parcel
                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="createShipping" element={<CreateShipping />} />
                </Route> */}
                
                
                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="shipping/create" element={<CreateShipping />} />
                </Route>

                {/* <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="shipping/parcel/create" element={<CreateParcel />} />
                </Route> */}

                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="point-of-sales" element={<PointOfSalesPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="receipt" element={<ReceiptPage />} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["owner", "employee"]}/>}> 
                    <Route path="print-receipt" element={<PrintReceipt />} />
                </Route>

                {/* Route Below Menu */}
                <Route element={<RequireAuth allowedRoles={["owner"]}/>}>
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