import {useEffect, useState, createRef, useContext} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import AccessibilityContextProvider, {
    AccessibilityContext,
} from './context/AccessibilityContext'

import AboutUs from './pages/AboutUs'
import Main from './pages/Main'
import RootLayout from './pages/RootLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Downloads from './pages/Downloads'
import Sections from './pages/Sections'
import ContactUs from './pages/ContactUs'
import NewsAndEvents from './pages/NewsAndEvents'
import RTI from './pages/RTI'
import FAQ from './pages/FAQ'
import DynamicNewsAndEvents from './pages/DynamicNewsAndEvents'
import LedgerWing from './components/common/Wing/LedgerWing.jsx'
import CentralWing from './components/common/Wing/CentralWing.jsx'
import TransportationWing from './components/common/Wing/TransportationWing.jsx'

/* Admin */
import AdminNewsAndNotificationTableList from './pages/Admin/NewsAndNotification/AdminNewsAndNotificationTableList.jsx'
import CreateNewsAndNotificationForm from './pages/Admin/NewsAndNotification/CreateNewsAndNotificationForm.jsx'
import AdminTestiomonialForm from './pages/Admin/Testimonial/AdminTestiomonialForm.jsx'
import UpdateAdminNewsAndNotificationForm
    from './pages/Admin/NewsAndNotification/UpdateAdminNewsAndNotificationForm.jsx'
import UpdateAdminTestimonialForm from './pages/Admin/Testimonial/UpdateAdminTestimonialForm.jsx'
import AdminTestimonialTableList from './pages/Admin/Testimonial/AdminTestimonialTableList.jsx'
import AdminFAQTableList from './pages/Admin/FAQ/AdminFAQTableList.jsx'
import AdminGalleryTableList from './pages/Admin/Gallery/AdminGalleryTableList.jsx'
import AdminFAQForm from './pages/Admin/FAQ/AdminFAQForm.jsx'
import AdminGalleryForm from './pages/Admin/Gallery/AdminGalleryForm.jsx'
import EditAdminGalleryForm from './pages/Admin/Gallery/EditAdminGalleryForm.jsx'
import AdminFAQSectionForm from './pages/Admin/FAQ/AdminFAQSectionForm.jsx'
import EditAdminFaqSectionForm from './pages/Admin/FAQ/EditAdminFAQSectionForm.jsx'
import AdminRootLayout from './pages/Admin/AdminRootLayout.jsx'
import AdminProtectPrivateRoute from './auth/AdminProtectPrivateRoute'
import AdminEditFaqForm from './pages/Admin/FAQ/AdminEditFAQForm.jsx'
import AdminLoginComponent from "./pages/AdminLoginComponent.jsx";

/* User */
import UserLoginComponent from "./pages/UserPanel/UserLoginComponent.jsx";
import UserForgetPassword from "./pages/UserPanel/UserForgetPassword.jsx";
import UserPanelLayout from "./pages/UserPanel/Layout/UserPanelLayout.jsx";
import UserProtectPrivateRoute from "./auth/UserProtectPrivateRoute.jsx";
import UserDashboard from "./pages/UserPanel/Dashboard/UserDashboard.jsx";

const websiteTitle = 'Welcome to PCDA(O) Pune '

/* Router setup */
const routes = [
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {index: true, element: <Main/>},
            {path: '/about-us', element: <AboutUs/>},
            {
                path: '/wings', children: [
                    {path: 'ledger', element: <LedgerWing/>},
                    {path: 'transportation', element: <TransportationWing/>},
                    {path: 'central', element: <CentralWing/>},
                ],
            },
            {path: '/download', element: <Downloads/>},
            {path: '/contact-us', element: <ContactUs/>},
            {path: '/news-and-events', element: <NewsAndEvents/>},
            {path: '/news-and-events/:id', element: <DynamicNewsAndEvents/>},
            {path: '/rti', element: <RTI/>},
            {path: '/faq', element: <FAQ/>},
        ],
    },
    {path: '/pcdao-login', element: <AdminLoginComponent/>},
    {
        path: '/pcdao',
        element: <AdminProtectPrivateRoute><AdminRootLayout/></AdminProtectPrivateRoute>,
        children: [
            {index: true, element: <AdminDashboard/>},
            {
                path: 'news-and-notification',
                children: [
                    {index: true, element: <AdminNewsAndNotificationTableList/>},
                    {path: 'new', element: <CreateNewsAndNotificationForm/>},
                    {path: 'edit/:id', element: <UpdateAdminNewsAndNotificationForm/>},
                ],
            },
            {
                path: 'testimonial',
                children: [
                    {index: true, element: <AdminTestimonialTableList/>},
                    {path: 'new', element: <AdminTestiomonialForm/>},
                    {path: 'edit/:id', element: <UpdateAdminTestimonialForm/>},
                ],
            },
            {
                path: 'faq',
                children: [
                    {index: true, element: <AdminFAQTableList/>},
                    {path: 'new', element: <AdminFAQForm/>},
                    {path: 'edit/:id', element: <AdminEditFaqForm/>},
                    {path: 'add-section', element: <AdminFAQSectionForm/>},
                    {path: 'edit-section/:id', element: <EditAdminFaqSectionForm/>},
                ],
            },
            {
                path: 'gallery',
                children: [
                    {index: true, element: <AdminGalleryTableList/>},
                    {path: 'new', element: <AdminGalleryForm/>},
                    {path: 'edit/:id', element: <EditAdminGalleryForm/>},
                ],
            },
        ],
    },
    {
        path: '/login',
        element: <UserLoginComponent/>,
    },
    {
        path: '/forgotpassword',
        element: <UserForgetPassword/>
    },
    {
        path: '/user',
        //element: <UserProtectPrivateRoute><UserPanelLayout/></UserProtectPrivateRoute>,
        element: <UserPanelLayout />,
        children: [
            {index: true, element: <UserDashboard/>},
        ],
    }
]

const router = createBrowserRouter(routes)

function App() {
    const accessiblityCtx = useContext(AccessibilityContext)
    const [title, setTitle] = useState(websiteTitle)

    useEffect(() => {
        const getFontSizeConfig = JSON.parse(localStorage.getItem('fs'))
        console.log('font size', getFontSizeConfig)
        if (getFontSizeConfig) {
            accessiblityCtx.setScale(getFontSizeConfig)
        }
    }, [accessiblityCtx.scale])

    useEffect(() => {
        console.log('Updated value', accessiblityCtx.scale)
        if (accessiblityCtx.scale) {
            localStorage.setItem('fs', JSON.stringify(accessiblityCtx.scale))
        }
    }, [accessiblityCtx.scale])

    useEffect(() => {
        let index = 0

        const marquee = () => {
            // Update the title with the marquee effect by slicing the text
            setTitle(websiteTitle.slice(index) + websiteTitle.slice(0, index))
            index = (index + 1) % websiteTitle.length
        }

        const intervalId = setInterval(marquee, 500)

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId)
    }, [websiteTitle])

    // Update the document title with the marquee text
    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <>
            <ToastContainer/>
            <RouterProvider router={router}></RouterProvider>
        </>
    )
}

export default App
