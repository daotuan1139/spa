import Home from "../Components/Home";

const HomePage = () => {
    return (
        <div style={{ backgroundColor: 'purple' }}>
            <center>
                <h1 style={{ color: 'white' }}> Assignment ReactJS </h1>
            </center>
            <center>
                <Home 
                    name= 'Dao Tuan'
                    age = {22}
                    address = '1381 Giai Phong'
                />
            </center>
        </div>
    );
};
export default HomePage;