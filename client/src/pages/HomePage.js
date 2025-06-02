import React  from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
const HomePage = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout title={"Best Services in your area"} description={"We provide the best laundry service in your area"} >
            <h1>Home Page</h1>


            <pre>{JSON.stringify(auth, null, 4)}</pre>
          
        </Layout>
    );
}
export default HomePage;